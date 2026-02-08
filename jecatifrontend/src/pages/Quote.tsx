
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';
import { Trash2, Download, Mail, Copy, FileText, ArrowLeft, Plus, Minus, MapPin, AlertCircle, Search } from 'lucide-react';
// @ts-ignore
import html2canvas from 'html2canvas';
// @ts-ignore
import { jsPDF } from 'jspdf';
// @ts-ignore
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
// @ts-ignore
import L from 'leaflet';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// HQ: Lot 25 Block 12 Green Valley Subdivision, San Nicholas III 4102 Bacoor, Cavite
const HQ_POSITION: [number, number] = [14.4286, 120.9677]; 
const PER_KM_RATE = 1000; // Pesos per KM

interface CartItem {
  id: string;
  name: string;
  category: 'equipment' | 'service';
  priceNumeric: number | null;
  displayPrice: string;
  quantity: number;
  hours: number;
  image: string;
}

// --- Helper Functions (Moved outside component for initialization logic) ---

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; 
  return d;
};

const calculateMobilizationFee = (dist: number) => {
  let fee = Math.ceil(dist) * PER_KM_RATE;
  // Ensure a minimum base fee if distance is negligible but they need mobilization
  if (fee < 3000) fee = 3000;
  // Round to nearest 100
  return Math.ceil(fee / 100) * 100;
};

// --------------------------------------------------------------------------

// Component to handle map clicks and render marker based on parent state
const LocationMarker = ({ position, setPosition }: { position: {lat: number, lng: number} | null, setPosition: (latlng: { lat: number, lng: number }) => void }) => {
  useMapEvents({
    click(e: any) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Project Location</Popup>
    </Marker>
  );
};

// Component to programmatically move the map
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13);
  }, [center, map]);
  return null;
};

const Quote: React.FC = () => {
  // --- Initialization Logic ---
  // Load saved marker from localStorage to initialize state
  const savedMarkerJson = localStorage.getItem('jecati_quote_location');
  const initialMarker = savedMarkerJson ? JSON.parse(savedMarkerJson) : null;
  
  // Calculate initial metrics based on saved marker
  const initialDist = initialMarker ? calculateDistance(HQ_POSITION[0], HQ_POSITION[1], initialMarker.lat, initialMarker.lng) : 0;
  const initialFee = initialMarker ? calculateMobilizationFee(initialDist) : 5000;

  // --- State ---
  const [markerPosition, setMarkerPosition] = useState<{lat: number, lng: number} | null>(initialMarker);
  const [mapCenter, setMapCenter] = useState<[number, number]>(
      initialMarker ? [initialMarker.lat, initialMarker.lng] : HQ_POSITION
  );
  
  const [mobilizationFee, setMobilizationFee] = useState<number>(initialFee); 
  const [distanceKm, setDistanceKm] = useState<number>(initialDist);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [showMap, setShowMap] = useState(!!initialMarker); // Show map by default if we have a saved location
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Customer Info State - Initialized from LocalStorage
  const [customerInfo, setCustomerInfo] = useState(() => {
    const saved = localStorage.getItem('jecati_customer_info');
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      company: '',
      phone: '',
      address: ''
    };
  });

  // Save Customer Info to LocalStorage
  useEffect(() => {
    localStorage.setItem('jecati_customer_info', JSON.stringify(customerInfo));
  }, [customerInfo]);

  // Save Marker Position to LocalStorage
  useEffect(() => {
    if (markerPosition) {
        localStorage.setItem('jecati_quote_location', JSON.stringify(markerPosition));
    } else {
        localStorage.removeItem('jecati_quote_location');
    }
  }, [markerPosition]);
  
  // Initialize cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('jecati_quote_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jecati_quote_cart', JSON.stringify(cart));
  }, [cart]);


  const handleLocationSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      // Use Nominatim OpenStreetMap API for geocoding
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1&countrycodes=ph`);
      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        const newCenter: [number, number] = [lat, lon];
        
        setMapCenter(newCenter);
        // Automatically select the point found
        handleLocationSelect({ lat, lng: lon }, data[0].display_name);
      } else {
        alert("Location not found. Please try a different search term.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Error searching for location.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationSelect = (latlng: { lat: number, lng: number }, displayName?: string) => {
    setMarkerPosition(latlng);
    
    const dist = calculateDistance(HQ_POSITION[0], HQ_POSITION[1], latlng.lat, latlng.lng);
    setDistanceKm(dist);
    
    const fee = calculateMobilizationFee(dist);
    setMobilizationFee(fee);
    
    setCustomerInfo(prev => ({
        ...prev, 
        address: displayName || `Pinned Location (${dist.toFixed(1)} km from HQ)`
    }));
  };

  const removeFromQuote = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartItem = (id: string, field: 'quantity' | 'hours', value: number) => {
    if (value < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => {
      if (item.priceNumeric) {
        return acc + (item.priceNumeric * item.quantity * item.hours);
      }
      return acc;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + (cart.length > 0 ? mobilizationFee : 0);
  };

  const calculateDownpayment = () => {
    return cart.reduce((acc, item) => {
      if (item.priceNumeric) {
        return acc + (item.priceNumeric * item.quantity * 40);
      }
      return acc;
    }, 0);
  };

  const generateFormattedQuoteBody = () => {
    // Helper to align text nicely like a table in plain text (ASCII art style)
    const align = (label: string, value: string) => {
        return `${label.padEnd(16, ' ')} ${value}`;
    };

    let body = `Dear Jecati Construction Services,\n\nI would like to request a formal quotation and availability for the following project:\n\n`;
    
    body += `--------------------------------------------------\n`;
    body += `CUSTOMER INFORMATION\n`;
    body += `--------------------------------------------------\n`;
    body += `${align('Name:', customerInfo.name || 'N/A')}\n`;
    body += `${align('Company:', customerInfo.company || 'N/A')}\n`;
    body += `${align('Phone:', customerInfo.phone || 'N/A')}\n`;
    body += `${align('Email:', customerInfo.email || 'N/A')}\n`;
    body += `${align('Location:', customerInfo.address || 'N/A')}\n\n`;
    
    body += `--------------------------------------------------\n`;
    body += `REQUESTED ITEMS\n`;
    body += `--------------------------------------------------\n`;
    
    cart.forEach((item, index) => {
      body += `${index + 1}. ${item.name} (${item.category.toUpperCase()})\n`;
      body += `   ${align('Quantity:', item.quantity.toString())}\n`;
      body += `   ${align('Duration:', item.hours + ' Hours')}\n`;
      if (item.priceNumeric) {
        body += `   ${align('Rate:', 'P' + item.priceNumeric.toLocaleString() + '/hr')}\n`;
        body += `   ${align('Subtotal:', 'P' + (item.priceNumeric * item.quantity * item.hours).toLocaleString())}\n`;
      } else {
        body += `   ${align('Price:', 'Ask for Quote')}\n`;
      }
      body += `\n`;
    });

    body += `--------------------------------------------------\n`;
    body += `ESTIMATED TOTALS\n`;
    body += `--------------------------------------------------\n`;
    body += `${align('Mobilization:', 'P' + mobilizationFee.toLocaleString() + ' (Approx. ' + distanceKm.toFixed(1) + ' km)')}\n`;
    body += `${align('Items Subtotal:', 'P' + calculateSubtotal().toLocaleString())}\n`;
    body += `${align('TOTAL ESTIMATE:', 'P' + calculateTotal().toLocaleString())}\n\n`;
    
    body += `REQUIRED DOWNPAYMENT: P${calculateDownpayment().toLocaleString()}\n`;
    body += `(Covers first 40 hours of operation)\n`;
    body += `--------------------------------------------------\n\n`;
    
    body += `Please confirm the availability and final pricing for these items.\n\n`;
    body += `Regards,\n${customerInfo.name || 'Customer'}`;
    
    return body;
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(generateFormattedQuoteBody());
    alert('Quote text copied to clipboard!');
  };

  const generatePDFBlob = async (): Promise<Blob | null> => {
    const input = document.getElementById('printable-quote');
    if (!input) return null;
    
    setIsGenerating(true);

    const clone = input.cloneNode(true) as HTMLElement;
    clone.className = "p-12 bg-white text-black"; 
    clone.style.display = 'block';
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = '210mm'; 
    
    document.body.appendChild(clone);

    try {
        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            logging: false
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfImgHeight);
        return pdf.output('blob');
    } catch (err) {
        console.error("PDF generation failed", err);
        return null;
    } finally {
        document.body.removeChild(clone);
        setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    const blob = await generatePDFBlob();
    if (!blob) {
        alert("Failed to generate PDF. Please try again.");
        return;
    }
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Jecati_Quote_${customerInfo.name ? customerInfo.name.replace(/\s+/g, '_') : 'Draft'}_${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEmail = async () => {
    // We render a special hidden HTML version of the quote (same design as user request)
    // and copy it to the clipboard as Rich Text (text/html). 
    // This allows the user to paste a fully designed table into Gmail.
    
    const emailElement = document.getElementById('email-clipboard-source');
    
    if (emailElement) {
        try {
            // Get HTML content
            const htmlContent = emailElement.innerHTML;
            // Get Plain Text fallback (aligned)
            const textContent = generateFormattedQuoteBody();
            
            const blobHtml = new Blob([htmlContent], { type: 'text/html' });
            const blobText = new Blob([textContent], { type: 'text/plain' });
            
            // Write both formats to clipboard
            // @ts-ignore - ClipboardItem might need polyfill in some envs but works in modern browsers
            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': blobHtml,
                    'text/plain': blobText
                })
            ]);
            
            alert("Quotation design copied to clipboard!\n\nRedirecting to Gmail...\nPlease PASTE (Ctrl+V) the content into the email body.");
            
        } catch (err) {
            console.error("Clipboard write failed", err);
            // Fallback: Copy plain text if HTML copy fails
            navigator.clipboard.writeText(generateFormattedQuoteBody());
            alert("Quotation text copied to clipboard!\n\nRedirecting to Gmail...\nPlease PASTE (Ctrl+V) the content into the email body.");
        }
    }

    // Direct link to Gmail compose (without body param, relying on paste)
    const subject = `Quotation Request - ${customerInfo.name || 'New Customer'}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_INFO.email}&su=${encodeURIComponent(subject)}`;
    
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen relative pb-20">
       
       {/* Hidden Rich HTML Email Template for Clipboard Copying */}
       <div id="email-clipboard-source" className="absolute -left-[9999px] top-0 bg-[#f4f4f4] w-[800px] p-5 font-sans text-slate-800">
            <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#f4f4f4', padding: '20px 0' }}>
            <tr>
                <td align="center">
                <table width="600" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#ffffff', borderCollapse: 'collapse', borderRadius: '6px', overflow: 'hidden' }}>
                    {/* Header */}
                    <tr>
                    <td style={{ backgroundColor: '#1f2933', padding: '20px', textAlign: 'center' }}>
                        <h1 style={{ margin: 0, fontSize: '22px', color: '#fbbf24' }}>Jecati Construction Services</h1>
                        <p style={{ margin: '5px 0 0', fontSize: '13px', color: '#d1d5db' }}>Professional Construction & Equipment Services</p>
                    </td>
                    </tr>
                    {/* Intro */}
                    <tr>
                    <td style={{ padding: '20px' }}>
                        <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#111827' }}>Dear <strong>Jecati Construction Services</strong>,</p>
                        <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>I would like to request a formal quotation and availability for the following project details outlined below.</p>
                    </td>
                    </tr>
                    {/* Customer Info Header */}
                    <tr>
                    <td style={{ padding: '10px 20px', backgroundColor: '#f9fafb' }}>
                        <h2 style={{ margin: 0, fontSize: '15px', color: '#1f2933', borderLeft: '4px solid #fbbf24', paddingLeft: '10px' }}>Customer Information</h2>
                    </td>
                    </tr>
                    {/* Customer Info Body */}
                    <tr>
                    <td style={{ padding: '15px 20px' }}>
                        <table width="100%" cellPadding="6" cellSpacing="0" style={{ fontSize: '13px', color: '#374151' }}>
                        <tr><td width="30%"><strong>Name</strong></td><td>: {customerInfo.name || 'N/A'}</td></tr>
                        <tr><td><strong>Company</strong></td><td>: {customerInfo.company || 'N/A'}</td></tr>
                        <tr><td><strong>Phone</strong></td><td>: {customerInfo.phone || 'N/A'}</td></tr>
                        <tr><td><strong>Email</strong></td><td>: {customerInfo.email || 'N/A'}</td></tr>
                        <tr><td style={{ verticalAlign: 'top' }}><strong>Location</strong></td><td>: {customerInfo.address || 'N/A'}</td></tr>
                        </table>
                    </td>
                    </tr>
                    {/* Items Header */}
                    <tr>
                    <td style={{ padding: '10px 20px', backgroundColor: '#f9fafb' }}>
                        <h2 style={{ margin: 0, fontSize: '15px', color: '#1f2933', borderLeft: '4px solid #fbbf24', paddingLeft: '10px' }}>Requested Items</h2>
                    </td>
                    </tr>
                    {/* Items Body */}
                    <tr>
                    <td style={{ padding: '15px 20px' }}>
                        <table width="100%" cellPadding="8" cellSpacing="0" style={{ borderCollapse: 'collapse', fontSize: '13px' }}>
                        <tr style={{ backgroundColor: '#e5e7eb', color: '#111827' }}>
                            <th align="left">Item</th>
                            <th align="center">Qty</th>
                            <th align="center">Duration</th>
                            <th align="right">Rate</th>
                            <th align="right">Subtotal</th>
                        </tr>
                        {cart.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <td>{item.name} ({item.category})</td>
                                <td align="center">{item.quantity}</td>
                                <td align="center">{item.hours} Hours</td>
                                <td align="right">{item.priceNumeric ? `₱${item.priceNumeric.toLocaleString()} / hr` : 'Ask for Quote'}</td>
                                <td align="right">{item.priceNumeric ? `₱${(item.priceNumeric * item.quantity * item.hours).toLocaleString()}` : '-'}</td>
                            </tr>
                        ))}
                        </table>
                    </td>
                    </tr>
                    {/* Totals Header */}
                    <tr>
                    <td style={{ padding: '10px 20px', backgroundColor: '#f9fafb' }}>
                        <h2 style={{ margin: 0, fontSize: '15px', color: '#1f2933', borderLeft: '4px solid #fbbf24', paddingLeft: '10px' }}>Estimated Totals</h2>
                    </td>
                    </tr>
                    {/* Totals Body */}
                    <tr>
                    <td style={{ padding: '15px 20px' }}>
                        <table width="100%" cellPadding="6" cellSpacing="0" style={{ fontSize: '13px', color: '#374151' }}>
                        <tr>
                            <td>Mobilization (Approx. {distanceKm.toFixed(1)} km)</td>
                            <td align="right">₱{mobilizationFee.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Items Subtotal</td>
                            <td align="right">₱{calculateSubtotal().toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td style={{ borderTop: '1px solid #d1d5db' }}><strong>Total Estimate</strong></td>
                            <td align="right" style={{ borderTop: '1px solid #d1d5db' }}><strong>₱{calculateTotal().toLocaleString()}</strong></td>
                        </tr>
                        </table>
                        <p style={{ margin: '12px 0 0', fontSize: '13px', color: '#b45309' }}>
                        <strong>Required Downpayment:</strong> ₱{calculateDownpayment().toLocaleString()} <br />
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>(Covers first 40 hours of operation)</span>
                        </p>
                    </td>
                    </tr>
                    {/* Closing */}
                    <tr>
                    <td style={{ padding: '20px' }}>
                        <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#374151' }}>Please confirm the availability and final pricing for the items listed above.</p>
                        <p style={{ margin: 0, fontSize: '14px', color: '#111827' }}>Regards,<br /><strong>{customerInfo.name || 'Customer'}</strong></p>
                    </td>
                    </tr>
                    {/* Footer */}
                    <tr>
                    <td style={{ backgroundColor: '#1f2933', padding: '12px', textAlign: 'center' }}>
                        <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>This email was generated as a formal quotation request.</p>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>
        </div>

       {/* Printable Quote Section (Hidden used for PDF generation) */}
       <div id="printable-quote" className="hidden p-8 bg-white text-black">
          <div className="flex justify-between items-start border-b-2 border-brand-dark pb-6 mb-8">
              <div>
                  <h1 className="text-3xl font-black uppercase tracking-tight">Jecati Construction</h1>
                  <p className="text-sm text-gray-600 mt-2 max-w-xs">{CONTACT_INFO.address}</p>
                  <p className="text-sm text-gray-600 font-bold mt-1">{CONTACT_INFO.phone} | {CONTACT_INFO.email}</p>
              </div>
              <div className="text-right">
                  <h2 className="text-xl font-bold uppercase text-brand-accent">Quotation Estimate</h2>
                  <p className="text-sm mt-1">Date: {new Date().toLocaleDateString()}</p>
                  <p className="text-xs text-gray-400 mt-1">Ref: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
          </div>

          {(customerInfo.name || customerInfo.email) && (
              <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-sm">
                  <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">Quotation Prepared For:</h3>
                  <div className="grid grid-cols-2 gap-8">
                      <div>
                          <p className="font-bold text-lg text-brand-dark">{customerInfo.name || 'Valued Customer'}</p>
                          <p className="text-sm text-gray-600">{customerInfo.company}</p>
                          <p className="text-sm text-gray-600 mt-1">{customerInfo.address}</p>
                      </div>
                      <div className="text-right">
                          <p className="text-sm text-gray-600 font-medium">{customerInfo.email}</p>
                          <p className="text-sm text-gray-600">{customerInfo.phone}</p>
                          {distanceKm > 0 && <p className="text-xs text-gray-400 mt-1">Dist: {distanceKm.toFixed(1)}km from HQ</p>}
                      </div>
                  </div>
              </div>
          )}

          <table className="w-full text-left mb-6 border-collapse">
              <thead>
                  <tr className="bg-brand-dark text-white">
                      <th className="p-3 font-bold uppercase text-xs tracking-wider">Item Description</th>
                      <th className="p-3 font-bold uppercase text-xs tracking-wider">Type</th>
                      <th className="p-3 font-bold uppercase text-xs tracking-wider text-right">Rate (Hr)</th>
                      <th className="p-3 font-bold uppercase text-xs tracking-wider text-center">Qty</th>
                      <th className="p-3 font-bold uppercase text-xs tracking-wider text-center">Hours</th>
                      <th className="p-3 font-bold uppercase text-xs tracking-wider text-right">Subtotal</th>
                  </tr>
              </thead>
              <tbody>
                  {cart.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                          <td className="p-3 font-medium">{item.name}</td>
                          <td className="p-3 capitalize text-sm text-gray-600">{item.category}</td>
                          <td className="p-3 text-right text-sm">
                              {item.priceNumeric ? `₱${item.priceNumeric.toLocaleString()}` : 'TBD'}
                          </td>
                          <td className="p-3 text-center text-sm">{item.quantity}</td>
                          <td className="p-3 text-center text-sm">{item.hours}</td>
                          <td className="p-3 text-right font-bold text-sm">
                              {item.priceNumeric 
                                ? `₱${(item.priceNumeric * item.quantity * item.hours).toLocaleString()}` 
                                : 'Ask for Quote'}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>

          <div className="flex justify-end">
              <div className="w-1/2 pt-4">
                  <div className="flex justify-between items-center mb-2 text-sm">
                      <span className="font-bold uppercase text-gray-600">Subtotal:</span>
                      <span className="font-bold">₱{calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 text-sm border-b border-gray-300 pb-2">
                      <span className="font-bold uppercase text-gray-600">Mobilization Fee:</span>
                      <span className="font-bold">₱{mobilizationFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-100 p-2 rounded-sm mb-6">
                      <span className="font-bold text-xl uppercase text-brand-dark">Total Estimate:</span>
                      <span className="font-black text-2xl text-brand-dark">₱{calculateTotal().toLocaleString()}</span>
                  </div>
                  
                  <div className="bg-brand-accent/10 p-4 border border-brand-accent/30 rounded-sm">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-sm uppercase text-brand-dark">Required Downpayment:</span>
                            <span className="font-black text-lg text-brand-dark">₱{calculateDownpayment().toLocaleString()}</span>
                        </div>
                        <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-wide">
                            (Covers first 40 hours of operation)
                        </p>
                  </div>

                  <p className="text-[10px] text-gray-500 mt-8 leading-relaxed text-justify">
                      * TERMS: This is an automated preliminary estimate. Final pricing is subject to site inspection, specific requirements, and equipment availability. 
                      Mobilization fee calculated based on estimated distance ({distanceKm.toFixed(1)}km). 
                  </p>
                  
                  <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase text-gray-400">Prepared By</p>
                            <p className="font-bold text-brand-dark mt-2">Jecati Construction Services</p>
                        </div>
                        <div className="text-right">
                             <p className="text-xs font-bold uppercase text-gray-400">Approved By</p>
                             <div className="h-8 border-b border-gray-300 w-48 mt-2"></div>
                        </div>
                  </div>
              </div>
          </div>
       </div>

       {/* Screen Content */}
       <div className="bg-brand-dark py-12 relative overflow-hidden mb-8">
            <div className="absolute inset-0 bg-brand-accent/5 pattern-grid-lg opacity-10"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between">
                <div>
                     <NavLink to="/pricing" className="inline-flex items-center text-gray-400 hover:text-white mb-4 text-sm font-bold uppercase tracking-wider transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
                     </NavLink>
                     <h1 className="text-4xl font-black text-white uppercase tracking-tight">Your Quote</h1>
                </div>
                <div className="mt-4 md:mt-0">
                    <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-sm border border-white/10">
                         <span className="block text-xs font-bold uppercase text-brand-accent mb-1">Total Estimated Value</span>
                         <span className="block text-3xl font-black text-white">₱{calculateTotal().toLocaleString()}</span>
                    </div>
                </div>
            </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Form & Settings */}
                <div className="lg:col-span-1 space-y-6">
                     
                     {/* Customer Info */}
                     <div className="bg-white p-6 rounded-sm shadow-md border-t-4 border-brand-accent">
                         <h3 className="text-brand-dark font-bold uppercase tracking-widest text-sm mb-4 border-b border-gray-100 pb-2">Customer Information</h3>
                         <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact Name *</label>
                                <input 
                                    type="text" 
                                    value={customerInfo.name}
                                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm font-medium rounded-sm focus:outline-none focus:border-brand-accent"
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address *</label>
                                <input 
                                    type="email" 
                                    value={customerInfo.email}
                                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm font-medium rounded-sm focus:outline-none focus:border-brand-accent"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company (Optional)</label>
                                <input 
                                    type="text" 
                                    value={customerInfo.company}
                                    onChange={(e) => setCustomerInfo({...customerInfo, company: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm font-medium rounded-sm focus:outline-none focus:border-brand-accent"
                                    placeholder="Company Name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                                <input 
                                    type="tel" 
                                    value={customerInfo.phone}
                                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm font-medium rounded-sm focus:outline-none focus:border-brand-accent"
                                    placeholder="Mobile or Landline"
                                />
                            </div>

                            {/* Map Integration */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Project Location</label>
                                
                                {!showMap ? (
                                    <button 
                                        onClick={() => setShowMap(true)}
                                        className="w-full bg-brand-light border-2 border-dashed border-gray-300 p-4 rounded-sm text-gray-500 hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center justify-center gap-2"
                                    >
                                        <MapPin className="w-5 h-5" />
                                        <span>Pin Location on Map</span>
                                    </button>
                                ) : (
                                    <div className="space-y-2">
                                        <form onSubmit={handleLocationSearch} className="flex gap-2">
                                          <input 
                                            type="text" 
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search city or barangay..." 
                                            className="flex-1 bg-white border border-gray-300 px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-brand-accent"
                                          />
                                          <button 
                                            type="submit" 
                                            disabled={isSearching}
                                            className="bg-brand-dark text-white px-3 py-2 rounded-sm text-xs font-bold hover:bg-brand-accent hover:text-brand-dark transition-colors"
                                          >
                                            {isSearching ? '...' : <Search className="w-4 h-4" />}
                                          </button>
                                        </form>

                                        <div className="h-64 rounded-sm overflow-hidden border border-gray-300 relative z-0">
                                            <MapContainer center={mapCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
                                                <TileLayer
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <MapController center={mapCenter} />
                                                {/* HQ Marker */}
                                                <Marker position={HQ_POSITION}>
                                                    <Popup>Jecati HQ<br/>Bacoor, Cavite</Popup>
                                                </Marker>
                                                {/* Customer Marker */}
                                                <LocationMarker position={markerPosition} setPosition={(pos) => handleLocationSelect(pos)} />
                                            </MapContainer>
                                            <div className="absolute top-2 left-2 right-2 bg-white/90 p-2 text-xs text-center rounded shadow z-[999] pointer-events-none font-bold text-brand-dark">
                                                Tap the map to pin your project site
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {distanceKm > 0 && (
                                    <div className="mt-2 text-xs flex items-center justify-between text-brand-dark bg-brand-accent/10 p-2 rounded-sm border border-brand-accent/20">
                                        <span className="font-bold">Distance from HQ:</span>
                                        <span className="font-mono">{distanceKm.toFixed(2)} km</span>
                                    </div>
                                )}
                            </div>

                         </div>
                     </div>

                     {/* Fees */}
                     <div className="bg-white p-6 rounded-sm shadow-md">
                         <h3 className="text-brand-dark font-bold uppercase tracking-widest text-sm mb-4 border-b border-gray-100 pb-2">Additional Fees</h3>
                         <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mobilization Fee (Calculated)</label>
                            <div className="flex items-center">
                                <span className="bg-gray-100 border border-r-0 border-gray-200 p-3 text-gray-500 font-bold text-sm">₱</span>
                                <input 
                                    type="text" 
                                    value={mobilizationFee.toLocaleString()}
                                    readOnly
                                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm font-bold text-gray-500 rounded-r-sm focus:outline-none cursor-not-allowed"
                                />
                            </div>
                            <div className="flex gap-2 mt-2">
                                <AlertCircle className="w-3 h-3 text-brand-accent flex-shrink-0 mt-0.5" />
                                <p className="text-[10px] text-gray-400 italic">
                                    Fee calculated based on distance from Jecati HQ in Bacoor (₱1,000/km).
                                </p>
                            </div>
                         </div>
                     </div>
                </div>

                {/* Right Column: Items & Summary */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {cart.length === 0 ? (
                        <div className="bg-white p-12 text-center rounded-sm shadow-md">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                                <FileText className="w-10 h-10 text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-black text-brand-dark mb-2">Your Quote is Empty</h2>
                            <p className="text-gray-500 mb-8">Head back to our pricing catalog to add equipment and services.</p>
                            <NavLink to="/pricing" className="inline-block bg-brand-accent text-brand-dark font-bold py-3 px-8 rounded-sm hover:bg-brand-dark hover:text-white transition-colors uppercase tracking-wide">
                                Browse Catalog
                            </NavLink>
                        </div>
                    ) : (
                        <>
                            <div className="bg-white shadow-md rounded-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Item</th>
                                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Rate</th>
                                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Qty</th>
                                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Hours</th>
                                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Total</th>
                                                <th className="p-4 w-10"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {cart.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50/50">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div>
                                                                <span className="text-[10px] font-bold text-brand-accent uppercase block">{item.category}</span>
                                                                <span className="font-bold text-brand-dark text-sm">{item.name}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-center text-sm font-medium text-gray-600">
                                                        {item.priceNumeric ? `₱${item.priceNumeric.toLocaleString()}` : 'TBD'}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center justify-center bg-white border border-gray-200 rounded-sm w-24 mx-auto">
                                                            <button 
                                                                onClick={() => updateCartItem(item.id, 'quantity', item.quantity - 1)}
                                                                className="p-1 hover:bg-gray-100 text-gray-500"
                                                            ><Minus className="w-3 h-3" /></button>
                                                            <input type="text" readOnly value={item.quantity} className="w-8 text-center text-xs font-bold focus:outline-none" />
                                                            <button 
                                                                onClick={() => updateCartItem(item.id, 'quantity', item.quantity + 1)}
                                                                className="p-1 hover:bg-gray-100 text-gray-500"
                                                            ><Plus className="w-3 h-3" /></button>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center justify-center bg-white border border-gray-200 rounded-sm w-24 mx-auto">
                                                            <button 
                                                                onClick={() => updateCartItem(item.id, 'hours', item.hours - 1)}
                                                                className="p-1 hover:bg-gray-100 text-gray-500"
                                                            ><Minus className="w-3 h-3" /></button>
                                                            <input type="text" readOnly value={item.hours} className="w-8 text-center text-xs font-bold focus:outline-none" />
                                                            <button 
                                                                onClick={() => updateCartItem(item.id, 'hours', item.hours + 1)}
                                                                className="p-1 hover:bg-gray-100 text-gray-500"
                                                            ><Plus className="w-3 h-3" /></button>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-right font-bold text-brand-dark">
                                                        {item.priceNumeric ? `₱${(item.priceNumeric * item.quantity * item.hours).toLocaleString()}` : '-'}
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <button onClick={() => removeFromQuote(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Summary Card */}
                            <div className="bg-white p-8 rounded-sm shadow-md">
                                <div className="flex flex-col md:flex-row justify-between gap-8">
                                    <div className="flex-1">
                                        <h4 className="font-black text-brand-dark uppercase text-lg mb-4">Required Downpayment</h4>
                                        <div className="bg-brand-accent/10 border border-brand-accent/20 p-6 rounded-sm">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-sm font-bold text-gray-600 uppercase">First 40 Hours</span>
                                                <span className="text-2xl font-black text-brand-dark">₱{calculateDownpayment().toLocaleString()}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 leading-relaxed">
                                                To proceed with mobilization, a downpayment covering the first 40 hours of operation for rented equipment is required.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-px bg-gray-100 hidden md:block"></div>
                                    <div className="flex-1 space-y-4">
                                         <div className="flex justify-between text-sm text-gray-600">
                                             <span>Subtotal</span>
                                             <span className="font-bold">₱{calculateSubtotal().toLocaleString()}</span>
                                         </div>
                                         <div className="flex justify-between text-sm text-gray-600">
                                             <span>Mobilization Fee {distanceKm > 0 && <span className="text-xs text-brand-accent">({distanceKm.toFixed(1)}km)</span>}</span>
                                             <span className="font-bold">₱{mobilizationFee.toLocaleString()}</span>
                                         </div>
                                         <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                                             <span className="font-black text-lg text-brand-dark uppercase">Total Estimate</span>
                                             <span className="font-black text-3xl text-brand-accent">₱{calculateTotal().toLocaleString()}</span>
                                         </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button 
                                        onClick={handleCopyQuote}
                                        disabled={isGenerating}
                                        className="flex items-center justify-center gap-2 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold uppercase tracking-wide text-sm rounded-sm transition-colors"
                                    >
                                        <Copy className="w-4 h-4" /> Copy Text
                                    </button>
                                    <button 
                                        onClick={handleDownloadPDF}
                                        disabled={isGenerating}
                                        className={`flex items-center justify-center gap-2 py-4 bg-brand-dark hover:bg-gray-800 text-white font-bold uppercase tracking-wide text-sm rounded-sm transition-colors ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <Download className="w-4 h-4" /> {isGenerating ? 'Generating...' : 'Download PDF'}
                                    </button>
                                    <button 
                                        onClick={handleEmail}
                                        className={`flex items-center justify-center gap-2 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wide text-sm rounded-sm transition-colors`}
                                    >
                                        <Mail className="w-4 h-4" /> Send via Gmail
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
       </div>
    </div>
  );
};

export default Quote;
