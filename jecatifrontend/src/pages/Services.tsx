
import React from 'react';
import { NavLink } from 'react-router-dom';
import { SERVICES } from '../constants';
import { ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Services Header */}
      <div className="relative bg-brand-dark py-32 px-4 text-center overflow-hidden">
         <div className="absolute inset-0 z-0">
            <img src="https://picsum.photos/id/134/1920/600" alt="Services Header" className="w-full h-full object-cover opacity-20"/>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark/90"></div>
         </div>
         <div className="relative z-10 animate-fade-up">
             <div className="inline-block px-3 py-1 border border-brand-accent/50 text-brand-accent text-xs font-bold uppercase tracking-widest mb-4">What We Offer</div>
             <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase">Our Services</h1>
             <p className="max-w-2xl mx-auto text-gray-300 text-lg font-light">
                Professional Construction Labor and Heavy Equipment Rental Services tailored to your project needs.
             </p>
         </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
                <div key={service.id} className="bg-white rounded-sm shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group animate-fade-up" style={{animationDelay: `${idx * 100}ms`}}>
                    <div className="h-64 overflow-hidden relative">
                         <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors z-10"></div>
                         <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"></div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col bg-white border-x border-b border-gray-100">
                        <h3 className="text-2xl font-black text-brand-dark mb-4 uppercase group-hover:text-brand-accent transition-colors">{service.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                            {service.description}
                        </p>
                        <button className="flex items-center gap-2 text-brand-dark text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                            Read Details <ArrowRight className="w-4 h-4 text-brand-accent" />
                        </button>
                    </div>
                </div>
            ))}
         </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 text-center mt-32 mb-12">
          <div className="bg-brand-primary p-12 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase">Ready to start your project?</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">Contact us today for a free consultation and quote. We are ready to serve you with excellence.</p>
              
              <NavLink to="/pricing" className="inline-block bg-brand-accent hover:bg-white hover:text-brand-dark text-brand-dark font-extrabold py-4 px-10 rounded-sm shadow-lg transition-all duration-300 uppercase tracking-wide">
                  Get a Quote Now
              </NavLink>
          </div>
      </div>
    </div>
  );
};

export default Services;
