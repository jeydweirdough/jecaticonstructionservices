
import React, { useState, useEffect } from 'react';
import { EQUIPMENT, LABOR_RATES, CONTACT_INFO } from '../constants';
import { Truck, HardHat, ChevronDown, Plus, Minus, Trash2, Download, Share2, Copy, FileText, X } from 'lucide-react';
// @ts-ignore
import html2canvas from 'html2canvas';
// @ts-ignore
import { jsPDF } from 'jspdf';

interface CartItem {
  id: string;
  name: string;
  category: 'equipment' | 'service';
  priceNumeric: number | null;
  displayPrice: string;
  quantity: number;
  days: number;
  image: string;
}

const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'equipment' | 'services'>('equipment');
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Initialize cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('jecati_quote_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jecati_quote_cart', JSON.stringify(cart));
  }, [cart]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, EQUIPMENT.length));
  };

  const addToQuote = (item: any, type: 'equipment' | 'service') => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        setIsQuoteOpen(true);
        return prev;
      }
      
      const newItem: CartItem = {
        id: item.id,
        name: type === 'equipment' ? item.model : item.role,
        category: type,
        priceNumeric: type === 'equipment' ? item.pricePerDay : item.priceNumeric || null,
        displayPrice: type === 'equipment' ? item.pricePerDay.toLocaleString() : item.rate,
        quantity: 1,
        days: 1,
        image: item.image
      };
      
      setIsQuoteOpen(true);
      return [...prev, newItem];
    });
  };

  const removeFromQuote = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartItem = (id: string, field: 'quantity' | 'days', value: number) => {
    if (value < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      if (item.priceNumeric) {
        return acc + (item.priceNumeric * item.quantity * item.days);
      }
      return acc;
    }, 0);
  };

  const generateQuoteText = () => {
    let text = `*Jecati Construction Services - Quotation Inquiry*\n\n`;
    text += `*Date:* ${new Date().toLocaleDateString()}\n\n`;
    text += `*Items:*\n`;
    
    cart.forEach(item => {
      text += `• ${item.name} (${item.category})\n`;
      text += `  Qty: ${item.quantity} | Days: ${item.days}\n`;
      if (item.priceNumeric) {
        text += `  Subtotal: ₱${(item.priceNumeric * item.quantity * item.days).toLocaleString()}\n`;
      } else {
        text += `  Price: Ask for Quote\n`;
      }
      text += `\n`;
    });

    const total = calculateTotal();
    text += `*Total Estimated:* ₱${total.toLocaleString()}\n`;
    text += `(Note: Final price subject to confirmation)\n\n`;
    text += `Please let me know the availability.`;
    
    return text;
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(generateQuoteText());
    alert('Quote copied to clipboard!');
  };

  const handleWhatsApp = () => {
    const phone = CONTACT_INFO.phone.replace(/\s/g, '').replace(/^0/, '63');
    const text = encodeURIComponent(generateQuoteText());
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleDownloadPDF = async () => {
    const input = document.getElementById('printable-quote');
    if (!input) return;
    
    // Create a clone to render
    const clone = input.cloneNode(true) as HTMLElement;
    
    // Reset styles to ensure visibility for capture
    clone.className = "p-12 bg-white text-black"; // Reset classes
    clone.style.display = 'block';
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = '210mm'; // A4 width
    
    document.body.appendChild(clone);

    try {
        const canvas = await html2canvas(clone, {
            scale: 2, // Better resolution
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
        pdf.save(`Jecati_Quote_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
        console.error("PDF generation failed", err);
        alert("Failed to generate PDF. Please try again.");
    } finally {
        document.body.removeChild(clone);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen relative">
       
       {/* Printable Quote Section (Hidden used for PDF generation) */}
       <div id="printable-quote" className="hidden p-8 bg-white text-black">
          <div className="flex justify-between items-center border-b-2 border-brand-dark pb-6 mb-8">
              <div>
                  <h1 className="text-3xl font-black uppercase">Jecati Construction</h1>
                  <p className="text-sm text-gray-600 mt-2">{CONTACT_INFO.address}</p>
                  <p className="text-sm text-gray-600">{CONTACT_INFO.phone} | {CONTACT_INFO.email}</p>
              </div>
              <div className="text-right">
                  <h2 className="text-xl font-bold uppercase text-brand-accent">Quotation Estimate</h2>
                  <p className="text-sm mt-1">Date: {new Date().toLocaleDateString()}</p>
              </div>
          </div>

          <table className="w-full text-left mb-8 border-collapse">
              <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="p-3 font-bold uppercase text-sm">Item</th>
                      <th className="p-3 font-bold uppercase text-sm">Type</th>
                      <th className="p-3 font-bold uppercase text-sm text-right">Rate</th>
                      <th className="p-3 font-bold uppercase text-sm text-center">Qty</th>
                      <th className="p-3 font-bold uppercase text-sm text-center">Days</th>
                      <th className="p-3 font-bold uppercase text-sm text-right">Subtotal</th>
                  </tr>
              </thead>
              <tbody>
                  {cart.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                          <td className="p-3">{item.name}</td>
                          <td className="p-3 capitalize">{item.category}</td>
                          <td className="p-3 text-right">
                              {item.priceNumeric ? `₱${item.priceNumeric.toLocaleString()}` : 'TBD'}
                          </td>
                          <td className="p-3 text-center">{item.quantity}</td>
                          <td className="p-3 text-center">{item.days}</td>
                          <td className="p-3 text-right font-bold">
                              {item.priceNumeric 
                                ? `₱${(item.priceNumeric * item.quantity * item.days).toLocaleString()}` 
                                : 'Ask for Quote'}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>

          <div className="flex justify-end">
              <div className="w-1/2 border-t-2 border-brand-dark pt-4">
                  <div className="flex justify-between items-center">
                      <span className="font-bold text-xl uppercase">Total Estimate:</span>
                      <span className="font-black text-2xl">₱{calculateTotal().toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-4 italic">
                      * This is an automated estimate. Final pricing may vary based on site location, specific requirements, and availability. 
                  </p>
              </div>
          </div>
       </div>

       {/* Screen Only Content */}
       <div className="">
            {/* Pricing Hero */}
            <div className="bg-brand-dark py-20 lg:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/id/192/1920/1080')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fade-up">
                    <div className="inline-block px-4 py-1.5 border border-brand-accent/30 bg-brand-accent/10 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6 rounded-full">
                        Transparent Rates
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase mb-6 leading-tight">
                        Pricing & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-200">Rentals</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Select equipment and services to build an instant quotation. Download or send it directly to our team.
                    </p>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="sticky top-20 z-30 bg-white shadow-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 flex justify-center">
                    <div className="flex w-full md:w-auto">
                        <button 
                            onClick={() => setActiveTab('equipment')}
                            className={`flex-1 md:flex-none flex items-center justify-center gap-2 py-6 px-8 text-sm md:text-base font-bold uppercase tracking-wide transition-all border-b-4 ${activeTab === 'equipment' ? 'border-brand-accent text-brand-dark bg-gray-50' : 'border-transparent text-gray-500 hover:text-brand-dark'}`}
                        >
                            <Truck className={`w-5 h-5 ${activeTab === 'equipment' ? 'text-brand-accent' : 'text-gray-400'}`} />
                            Equipment Rentals
                        </button>
                        <div className="w-px bg-gray-200 my-4"></div>
                        <button 
                            onClick={() => setActiveTab('services')}
                            className={`flex-1 md:flex-none flex items-center justify-center gap-2 py-6 px-8 text-sm md:text-base font-bold uppercase tracking-wide transition-all border-b-4 ${activeTab === 'services' ? 'border-brand-accent text-brand-dark bg-gray-50' : 'border-transparent text-gray-500 hover:text-brand-dark'}`}
                        >
                            <HardHat className={`w-5 h-5 ${activeTab === 'services' ? 'text-brand-accent' : 'text-gray-400'}`} />
                            Labor & Services
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-32">
                
                {/* Equipment Tab Content */}
                {activeTab === 'equipment' && (
                    <div className="animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {EQUIPMENT.slice(0, visibleCount).map((item) => (
                                <div key={item.id} className="bg-white rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-2 flex flex-col">
                                    <div className="h-64 bg-gray-100 relative p-6 flex items-center justify-center overflow-hidden">
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className="bg-brand-dark text-white text-xs font-bold px-3 py-1 uppercase rounded-sm tracking-wider shadow-sm">{item.category}</span>
                                        </div>
                                        <img 
                                            src={item.image} 
                                            alt={item.model} 
                                            className="max-w-full max-h-full object-contain drop-shadow-xl transform group-hover:scale-110 transition-transform duration-500 relative z-10" 
                                        />
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">{item.name}</h3>
                                                <h2 className="text-xl font-black text-brand-dark uppercase">{item.model}</h2>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2 mb-6 flex-1">
                                            {item.specs?.map((spec, sIdx) => (
                                                <div key={sIdx} className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                                    <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
                                                    {spec}
                                                </div>
                                            ))}
                                                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
                                                Operator Included
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-100 pt-6">
                                            <div className="flex items-end justify-between mb-4">
                                                    <div>
                                                        <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Daily Rate</span>
                                                        <div className="flex items-baseline text-brand-dark">
                                                            <span className="text-lg font-bold">₱</span>
                                                            <span className="text-3xl font-black tracking-tight">{item.pricePerDay.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                            </div>
                                            <button 
                                                onClick={() => addToQuote(item, 'equipment')}
                                                className="block w-full text-center bg-brand-dark text-white font-bold uppercase text-sm py-3 rounded-sm hover:bg-brand-accent hover:text-brand-dark transition-all tracking-wider"
                                            >
                                                Add to Quote
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {visibleCount < EQUIPMENT.length && (
                            <div className="text-center mt-16">
                                <button 
                                    onClick={handleLoadMore}
                                    className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-600 px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:border-brand-accent hover:text-brand-accent transition-all shadow-sm hover:shadow-md"
                                >
                                    View More Rentals <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Services Tab Content */}
                {activeTab === 'services' && (
                    <div className="animate-fade-in">
                        <div className="bg-white rounded-sm shadow-xl overflow-hidden border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                                {LABOR_RATES.map((service) => (
                                    <div key={service.id} className="p-8 md:p-12 hover:bg-gray-50 transition-colors group">
                                        <div className="flex items-start gap-6">
                                            <div className="hidden sm:block w-20 h-20 bg-gray-200 rounded-sm overflow-hidden flex-shrink-0">
                                                    <img src={service.image} alt={service.role} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                                    <h3 className="text-xl font-black text-brand-dark uppercase">{service.role}</h3>
                                                    <div className="bg-brand-accent/10 text-brand-dark px-4 py-1 rounded-full font-bold text-sm whitespace-nowrap">
                                                            ₱ {service.rate} <span className="text-xs font-normal text-gray-600">/ {service.unit}</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                                    {service.description} Includes standard safety gear and tools where applicable.
                                                </p>
                                                <button 
                                                    onClick={() => addToQuote(service, 'service')}
                                                    className="inline-block text-brand-accent text-xs font-black uppercase tracking-widest hover:text-brand-dark transition-colors border-b-2 border-brand-accent pb-0.5"
                                                >
                                                    Add to Quote
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Floating Quote Button */}
            <div className="fixed bottom-8 right-8 z-40">
                <button 
                    onClick={() => setIsQuoteOpen(true)}
                    className="relative bg-brand-accent text-brand-dark p-4 rounded-sm shadow-2xl hover:scale-105 transition-transform flex items-center gap-3 pr-6 font-bold uppercase tracking-wide border-2 border-white"
                >
                    <div className="relative">
                        <FileText className="w-6 h-6" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </div>
                    <span>My Quote</span>
                </button>
            </div>

            {/* Quote Drawer / Modal */}
            {isQuoteOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsQuoteOpen(false)}
                    ></div>

                    {/* Drawer Content */}
                    <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-fade-in">
                        <div className="p-6 bg-brand-dark text-white flex justify-between items-center shadow-md">
                            <div>
                                <h2 className="text-xl font-black uppercase flex items-center gap-2">
                                    <FileText className="text-brand-accent" /> Quote Builder
                                </h2>
                                <p className="text-xs text-gray-400 mt-1">{cart.length} Items Selected</p>
                            </div>
                            <button onClick={() => setIsQuoteOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-12 text-gray-400">
                                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FileText className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <p>Your quote list is empty.</p>
                                    <p className="text-sm mt-2">Add equipment or services to start building your quote.</p>
                                    <button 
                                        onClick={() => setIsQuoteOpen(false)}
                                        className="mt-6 text-brand-accent font-bold uppercase text-xs tracking-widest hover:underline"
                                    >
                                        Browse Items
                                    </button>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="bg-gray-50 rounded-sm p-4 border border-gray-200 relative group">
                                        <button 
                                            onClick={() => removeFromQuote(item.id)}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        
                                        <div className="flex gap-4 mb-4">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-sm bg-white" />
                                            <div>
                                                <span className="text-[10px] font-bold uppercase text-brand-accent tracking-widest">{item.category}</span>
                                                <h3 className="font-bold text-brand-dark leading-tight">{item.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Rate: {item.priceNumeric ? `₱${item.priceNumeric.toLocaleString()}` : item.displayPrice}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Quantity</label>
                                                <div className="flex items-center bg-white border border-gray-300 rounded-sm">
                                                    <button 
                                                        onClick={() => updateCartItem(item.id, 'quantity', item.quantity - 1)}
                                                        className="p-1.5 hover:bg-gray-100 text-gray-600"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <input 
                                                        type="number" 
                                                        value={item.quantity} 
                                                        readOnly 
                                                        className="w-full text-center text-sm font-bold text-brand-dark focus:outline-none" 
                                                    />
                                                    <button 
                                                        onClick={() => updateCartItem(item.id, 'quantity', item.quantity + 1)}
                                                        className="p-1.5 hover:bg-gray-100 text-gray-600"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Duration (Days)</label>
                                                <div className="flex items-center bg-white border border-gray-300 rounded-sm">
                                                    <button 
                                                        onClick={() => updateCartItem(item.id, 'days', item.days - 1)}
                                                        className="p-1.5 hover:bg-gray-100 text-gray-600"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <input 
                                                        type="number" 
                                                        value={item.days} 
                                                        readOnly 
                                                        className="w-full text-center text-sm font-bold text-brand-dark focus:outline-none" 
                                                    />
                                                    <button 
                                                        onClick={() => updateCartItem(item.id, 'days', item.days + 1)}
                                                        className="p-1.5 hover:bg-gray-100 text-gray-600"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer Totals & Actions */}
                        {cart.length > 0 && (
                            <div className="p-6 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-sm font-bold text-gray-500 uppercase">Estimated Total</span>
                                    <div className="text-right">
                                        <span className="block text-3xl font-black text-brand-dark">₱{calculateTotal().toLocaleString()}</span>
                                        <span className="text-xs text-gray-400">*Excluding specific delivery charges</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <button 
                                        onClick={handleCopyQuote}
                                        className="col-span-1 flex flex-col items-center justify-center p-3 rounded-sm bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                        title="Copy to Clipboard"
                                    >
                                        <Copy className="w-5 h-5 mb-1" />
                                        <span className="text-[10px] font-bold uppercase">Copy</span>
                                    </button>
                                    <button 
                                        onClick={handleDownloadPDF}
                                        className="col-span-1 flex flex-col items-center justify-center p-3 rounded-sm bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                        title="Download PDF Copy"
                                    >
                                        <Download className="w-5 h-5 mb-1" />
                                        <span className="text-[10px] font-bold uppercase">PDF Copy</span>
                                    </button>
                                    <button 
                                        onClick={handleWhatsApp}
                                        className="col-span-1 flex flex-col items-center justify-center p-3 rounded-sm bg-green-500 hover:bg-green-600 text-white transition-colors"
                                        title="Send via WhatsApp"
                                    >
                                        <Share2 className="w-5 h-5 mb-1" />
                                        <span className="text-[10px] font-bold uppercase">WhatsApp</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
       </div>
    </div>
  );
};

export default Pricing;
