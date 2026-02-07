import React from 'react';
import { ShieldCheck, HardHat, UserCheck } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: HardHat,
      title: "Quality Construction",
      description: "Crafting durable structures with precision and attention to detail, ensuring lasting quality."
    },
    {
      icon: ShieldCheck,
      title: "Professional Liability",
      description: "Safeguarding projects and reputations through meticulous expertise and accountability."
    },
    {
      icon: UserCheck,
      title: "Client Dedication",
      description: "We strive to exceed expectations by delivering personalized service and exceptional quality."
    }
  ];

  return (
    <div className="bg-brand-dark pb-24 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="group bg-brand-primary p-10 text-center text-white border-b-4 border-transparent hover:border-brand-dark hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 ease-out hover:-translate-y-2 shadow-lg hover:shadow-2xl rounded-sm">
                      <div className="inline-flex items-center justify-center p-4 bg-gray-800 rounded-sm mb-6 group-hover:bg-brand-dark transition-colors duration-300">
                          <feature.icon className="h-8 w-8 text-brand-accent group-hover:text-brand-accent" />
                      </div>
                      <h3 className="text-xl font-black mb-3 uppercase tracking-wide group-hover:text-brand-dark transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-brand-dark/80 font-medium transition-colors">
                          {feature.description}
                      </p>
                  </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Features;