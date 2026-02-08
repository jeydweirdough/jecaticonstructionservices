
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { EQUIPMENT, LABOR_RATES } from '../constants';
import { Truck, HardHat, ChevronDown, FileText, Check } from 'lucide-react';

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

const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'equipment' | 'services'>('equipment');
  const [visibleCount, setVisibleCount] = useState(6);
  const [showAddedToast, setShowAddedToast] = useState(false);
  
  // Initialize cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('jecati_quote_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
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
        setShowAddedToast(true);
        setTimeout(() => setShowAddedToast(false), 2000);
        return prev;
      }
      
      const newItem: CartItem = {
        id: item.id,
        name: type === 'equipment' ? item.model : item.role,
        category: type,
        priceNumeric: type === 'equipment' ? item.pricePerHour : item.priceNumeric || null,
        displayPrice: type === 'equipment' ? item.pricePerHour.toLocaleString() : item.rate,
        quantity: 1,
        hours: 8, // Default to 8 hours (1 day shift)
        image: item.image
      };
      
      setShowAddedToast(true);
      setTimeout(() => setShowAddedToast(false), 2000);
      return [...prev, newItem];
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen relative">
       
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
                        Select equipment and services to build an instant quotation.
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
                                                        <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Hourly Rate</span>
                                                        <div className="flex items-baseline text-brand-dark">
                                                            <span className="text-lg font-bold">₱</span>
                                                            <span className="text-3xl font-black tracking-tight">{item.pricePerHour.toLocaleString()}</span>
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
                <NavLink 
                    to="/quote"
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
                    <span>View Quote</span>
                </NavLink>
            </div>
            
            {/* Added Toast */}
            {showAddedToast && (
                <div className="fixed bottom-24 right-8 z-50 bg-brand-dark text-white px-4 py-3 rounded-sm shadow-lg flex items-center gap-2 animate-fade-in">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-bold">Item added to quote</span>
                </div>
            )}
       </div>
    </div>
  );
};

export default Pricing;
