import React from 'react';
import { CONTACT_INFO } from '../constants';
import { MapPin, Mail, Phone, Facebook, Star, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-dark pb-20">
        
       {/* Hero */}
       <div className="relative h-[400px] w-full overflow-hidden mb-16">
          <div className="absolute inset-0 bg-brand-dark/70 z-10"></div>
          <img src="https://picsum.photos/id/160/1920/800" alt="Contact" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4 max-w-7xl mx-auto text-center animate-fade-up">
             <h1 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase">Contact Us</h1>
             <p className="text-brand-accent text-lg font-bold uppercase tracking-widest">We'd Love to Hear From You</p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-30">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               
               {/* Contact Form Card */}
               <div className="bg-white p-8 md:p-12 rounded-sm shadow-2xl animate-fade-up delay-100">
                   <div className="mb-8">
                       <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">Send Message</p>
                       <h2 className="text-brand-dark text-4xl font-black uppercase">Get A Quote</h2>
                   </div>

                   <form className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <input type="text" placeholder="Your Name *" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-4 text-gray-800 font-medium focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all" />
                           <input type="email" placeholder="Your Email *" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-4 text-gray-800 font-medium focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all" />
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <input type="tel" placeholder="Phone Number *" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-4 text-gray-800 font-medium focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all" />
                           <input type="text" placeholder="Subject" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-4 text-gray-800 font-medium focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all" />
                       </div>
                       <div>
                           <textarea placeholder="Message / Project Details *" rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-sm p-4 text-gray-800 font-medium focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"></textarea>
                       </div>
                       
                       <button type="button" className="w-full bg-brand-dark text-white font-extrabold py-5 px-8 rounded-sm hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 uppercase tracking-widest flex justify-center items-center gap-2 group">
                           Send Request <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                       </button>
                   </form>
               </div>

               {/* Contact Info Card */}
               <div className="flex flex-col gap-8 animate-fade-up delay-200">
                   <div className="bg-brand-primary p-10 rounded-sm shadow-xl border-l-8 border-brand-accent relative overflow-hidden flex-1">
                       <h2 className="text-white text-3xl font-black mb-8 uppercase">Contact Info</h2>

                       <div className="space-y-8 relative z-10">
                           <div className="flex items-start gap-6 group">
                               <div className="bg-brand-accent/10 p-4 rounded-sm flex-shrink-0 group-hover:bg-brand-accent transition-colors duration-300">
                                   <MapPin className="text-brand-accent w-6 h-6 group-hover:text-brand-dark" />
                               </div>
                               <div>
                                   <h3 className="text-white font-bold text-lg mb-1">Visit Office</h3>
                                   <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{CONTACT_INFO.address}</p>
                               </div>
                           </div>

                           <div className="flex items-start gap-6 group">
                               <div className="bg-brand-accent/10 p-4 rounded-sm flex-shrink-0 group-hover:bg-brand-accent transition-colors duration-300">
                                   <Mail className="text-brand-accent w-6 h-6 group-hover:text-brand-dark" />
                               </div>
                               <div>
                                   <h3 className="text-white font-bold text-lg mb-1">Email Us</h3>
                                   <p className="text-gray-400 text-sm">{CONTACT_INFO.email}</p>
                               </div>
                           </div>

                           <div className="flex items-start gap-6 group">
                               <div className="bg-brand-accent/10 p-4 rounded-sm flex-shrink-0 group-hover:bg-brand-accent transition-colors duration-300">
                                   <Phone className="text-brand-accent w-6 h-6 group-hover:text-brand-dark" />
                               </div>
                               <div>
                                   <h3 className="text-white font-bold text-lg mb-1">Call Us</h3>
                                   <p className="text-gray-400 text-sm">{CONTACT_INFO.phone}</p>
                                   <p className="text-gray-400 text-sm">{CONTACT_INFO.phoneAlt}</p>
                               </div>
                           </div>
                       </div>
                   </div>

                   <div className="bg-brand-accent p-10 rounded-sm shadow-xl">
                       <h4 className="text-brand-dark text-xl font-black uppercase mb-4">Follow Us On Facebook</h4>
                       <div className="flex items-center gap-4 mb-2">
                           <Facebook className="text-brand-dark w-8 h-8 fill-current" />
                           <span className="font-bold text-brand-dark">Jecati Construction Services</span>
                       </div>
                       <div className="flex gap-1 text-brand-dark/80">
                           {[1,2,3,4,5].map(i => (
                               <Star key={i} className="fill-current w-5 h-5" />
                           ))}
                       </div>
                       <p className="text-brand-dark mt-2 text-sm font-medium">Rated 5.0 by our customers</p>
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
};

export default Contact;