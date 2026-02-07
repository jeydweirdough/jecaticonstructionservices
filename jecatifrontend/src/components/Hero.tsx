
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-brand-dark min-h-[650px] flex items-center overflow-hidden">
        {/* Background Overlay Image */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://picsum.photos/id/103/1920/1080" 
                alt="Construction Background" 
                className="w-full h-full object-cover opacity-20 filter grayscale hover:grayscale-0 transition-all duration-[3s] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent"></div>
        </div>
        
        {/* Abstract Shapes (Industrial/Squared) */}
        <div className="absolute top-20 right-20 w-32 h-32 border-4 border-brand-accent/20 rounded-sm z-10 hidden lg:block rotate-12"></div>
        <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-brand-accent/10 rounded-sm z-10 hidden lg:block -rotate-6"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                
                {/* Text Content */}
                <div className="lg:w-1/2 pt-10 lg:pt-0 animate-fade-up">
                    <div className="inline-block px-3 py-1 bg-brand-accent/20 border border-brand-accent/50 rounded-sm text-brand-accent text-xs font-bold uppercase tracking-widest mb-6">
                        Professional Construction Services
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 uppercase tracking-tight">
                        Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-200">Stronger</span> <br />
                        Last <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-200">Longer</span>
                    </h1>
                    <p className="text-gray-400 text-lg mb-8 max-w-lg font-light leading-relaxed border-l-4 border-brand-accent pl-4">
                        We provide top-tier materials, heavy equipment, and skilled labor to execute your construction projects with precision.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <NavLink 
                            to="/pricing" 
                            className="group bg-brand-accent text-brand-dark font-extrabold py-4 px-8 rounded-sm transition-all duration-300 hover:bg-white flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                        >
                            GET A QUOTE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </NavLink>
                        <NavLink 
                            to="/services" 
                            className="bg-transparent border-2 border-gray-600 text-white hover:border-brand-accent hover:text-brand-accent font-bold py-4 px-8 rounded-sm transition-all duration-300 uppercase tracking-wide"
                        >
                            Our Services
                        </NavLink>
                    </div>
                </div>

                {/* Hero Image / Card */}
                <div className="lg:w-1/2 relative animate-fade-up delay-200 hidden md:block">
                    <div className="relative z-10">
                         <div className="relative rounded-sm overflow-hidden shadow-2xl border-b-8 border-r-8 border-brand-accent">
                            <img 
                                src="https://picsum.photos/id/1063/800/600" 
                                alt="Excavator" 
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                         </div>
                         
                         {/* Badge */}
                         <div className="absolute -bottom-8 -left-8 bg-brand-primary p-6 shadow-xl border-l-4 border-brand-accent animate-fade-up delay-300">
                            <div className="flex items-center gap-4">
                                <div className="text-brand-accent font-black text-4xl">10+</div>
                                <div className="text-gray-300 text-xs font-bold uppercase leading-tight">
                                    Years of <br/> Excellence
                                </div>
                            </div>
                         </div>
                    </div>
                    
                    {/* Decorative back square */}
                    <div className="absolute -top-6 -right-6 w-full h-full border-2 border-gray-700 rounded-sm -z-10"></div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Hero;
