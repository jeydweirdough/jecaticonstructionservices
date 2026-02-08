import React from 'react';
import { NavLink } from 'react-router-dom';
import { CONTACT_INFO, NAV_ITEMS } from '../constants';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Hammer } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
                <div className="bg-white rounded-full p-1">
                    <Hammer className="h-6 w-6 text-brand-dark" />
                </div>
                <span className="font-bold text-lg">
                Jecati<span className="text-brand-accent">ConstructionServices</span>
                </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Established on March 30, 2017, Jecati began its journey in the construction services and rental equipment industry. Led by Rygs Tiu, we build on a foundation of first-hand expertise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-accent hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-brand-accent hover:text-white transition-colors"><Mail size={20} /></a>
              <a href="#" className="text-brand-accent hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Contact CTA */}
          <div>
            <h3 className="text-brand-accent text-lg font-bold mb-4">Need construction services?</h3>
            <p className="mb-4 text-sm text-gray-300">Contact us for more inquiries!</p>
            <div className="flex items-center gap-3">
              <Phone className="text-brand-accent h-8 w-8" />
              <div>
                <p className="font-bold text-lg">{CONTACT_INFO.phone}</p>
                <p className="font-bold text-lg">{CONTACT_INFO.phoneAlt}</p>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="text-brand-accent mr-2">&gt;</span>Concrete Demolition</li>
              <li><span className="text-brand-accent mr-2">&gt;</span>Stump Removal</li>
              <li><span className="text-brand-accent mr-2">&gt;</span>Construction Services</li>
              <li><span className="text-brand-accent mr-2">&gt;</span>Transport Equipment</li>
              <li><span className="text-brand-accent mr-2">&gt;</span>Backhoe on Hire</li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Working Hours</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li className="flex justify-between"><span>Monday:</span> <span>8:00 AM - 5:00 PM</span></li>
              <li className="flex justify-between"><span>Tuesday:</span> <span>8:00 AM - 5:00 PM</span></li>
              <li className="flex justify-between"><span>Wednesday:</span> <span>8:00 AM - 5:00 PM</span></li>
              <li className="flex justify-between"><span>Thursday:</span> <span>8:00 AM - 5:00 PM</span></li>
              <li className="flex justify-between"><span>Friday:</span> <span>8:00 AM - 5:00 PM</span></li>
              <li className="flex justify-between"><span>Saturday:</span> <span>8:00 AM - 12:00 PM</span></li>
              <li className="flex justify-between text-brand-accent"><span>Sunday:</span> <span>Closed</span></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>Copyright © 2024 Jecati Construction Services. Powered by TAKDA.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;