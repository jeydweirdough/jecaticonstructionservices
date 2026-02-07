import React from 'react';
import { PROJECTS } from '../constants';
import { MapPin, ArrowUpRight } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
        
       {/* Hero */}
       <div className="relative h-[450px] w-full overflow-hidden bg-brand-dark">
          <div className="absolute inset-0 bg-brand-dark/60 z-10"></div>
          <img src="https://picsum.photos/id/142/1920/800" alt="Projects" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4 max-w-7xl mx-auto text-center animate-fade-up">
             <h1 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tight">Our Projects</h1>
             <p className="text-brand-accent text-lg font-bold uppercase tracking-widest">Excellence in every build</p>
          </div>
       </div>

       {/* Content */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <div className="max-w-2xl">
                 <h4 className="text-brand-accent font-bold uppercase tracking-widest mb-2">Our Portfolio</h4>
                 <h2 className="text-4xl font-black text-brand-dark mb-4">Nationwide Work Industries</h2>
                 <p className="text-gray-600">Explore our diverse portfolio of completed projects, showcasing our expertise in excavation, demolition, and heavy equipment operations.</p>
             </div>
             <div className="hidden md:block">
                 {/* Filter buttons could go here */}
                 <button className="bg-brand-dark text-white px-6 py-2 rounded-sm text-sm font-bold uppercase mr-2">All</button>
                 <button className="bg-white text-gray-600 border border-gray-200 px-6 py-2 rounded-sm text-sm font-bold uppercase hover:bg-gray-100">Excavation</button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {PROJECTS.map((project, idx) => (
                <div key={project.id} className="group relative bg-white shadow-lg overflow-hidden cursor-pointer animate-fade-up" style={{animationDelay: `${idx * 100}ms`}}>
                   <div className="relative h-80 overflow-hidden">
                      <div className="absolute inset-0 bg-brand-accent/90 opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10 flex items-center justify-center">
                          <ArrowUpRight className="text-brand-dark w-12 h-12 transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                      </div>
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter group-hover:grayscale" />
                      <div className="absolute top-4 left-4 z-20">
                         <span className="bg-white/90 backdrop-blur text-brand-dark text-xs font-black uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm">{project.category}</span>
                      </div>
                   </div>
                   <div className="p-6 border-b-4 border-transparent group-hover:border-brand-dark transition-colors bg-white relative z-20">
                      <h3 className="text-xl font-black text-brand-dark uppercase mb-2 group-hover:text-brand-accent transition-colors">{project.title}</h3>
                      <div className="flex items-start gap-2 text-sm text-gray-500">
                         <MapPin className="text-brand-accent w-4 h-4 flex-shrink-0 mt-0.5" />
                         <span className="font-medium uppercase text-xs tracking-wide">{project.location}</span>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default Projects;