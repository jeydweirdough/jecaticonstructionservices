import React from 'react';
import { STATS } from '../constants';

const Stats: React.FC = () => {
  return (
    <div className="bg-white py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {STATS.map((stat, index) => (
            <div key={index} className="text-center group relative">
              {/* Divider for lg screens */}
              {index !== 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gray-200"></div>
              )}
              
              <h3 className="text-5xl md:text-6xl font-black text-gray-200 mb-2 group-hover:text-brand-dark transition-colors duration-500 relative inline-block">
                {stat.value}
                <span className="absolute -top-2 -right-4 text-brand-accent text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">+</span>
              </h3>
              <p className="text-brand-dark font-bold uppercase tracking-widest text-xs mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;