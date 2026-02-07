
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { Menu, X, Hammer } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-brand-dark text-white sticky top-0 z-50 shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
            <div className="bg-brand-accent rounded-sm p-1.5 transition-transform group-hover:rotate-12">
                <Hammer className="h-6 w-6 text-brand-dark" /> 
            </div>
            <span className="font-extrabold text-xl tracking-tighter uppercase">
              Jecati<span className="text-brand-accent">Construction</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-300 relative group ${
                      isActive
                        ? 'text-brand-accent'
                        : 'text-gray-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                    </>
                  )}
                </NavLink>
              ))}
              <div className="pl-4">
                  <NavLink 
                    to="/pricing"
                    className="bg-brand-accent hover:bg-white hover:text-brand-dark text-brand-dark px-6 py-2.5 rounded-sm font-extrabold uppercase tracking-wide transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                  >
                    Get a Quote
                  </NavLink>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-sm text-brand-accent hover:text-white hover:bg-gray-800 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-primary border-t border-gray-700 animate-fade-in">
          <div className="px-4 pt-4 pb-6 space-y-2 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-sm text-base font-bold uppercase border-l-4 transition-all ${
                    isActive
                      ? 'border-brand-accent bg-gray-900 text-brand-accent'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-500'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-6">
                 <NavLink 
                    to="/pricing"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-brand-accent text-brand-dark px-5 py-3 rounded-sm font-black uppercase tracking-widest hover:bg-white transition-colors"
                  >
                    Get a Quote
                  </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
