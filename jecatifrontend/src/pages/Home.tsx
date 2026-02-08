
import React from 'react';
import { NavLink } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Stats from '../components/Stats';
import { SERVICES, PROJECTS, TEAM_MEMBERS } from '../constants';
import { MapPin, ArrowRight, Construction, Truck, Home as HomeIcon } from 'lucide-react';

const Home: React.FC = () => {
  const featuredProjects = PROJECTS.slice(0, 3);
  const featuredServices = SERVICES.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Features />

      {/* Intro Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/2 relative group">
                    <div className="absolute inset-0 bg-brand-accent transform translate-x-4 translate-y-4 rounded-sm transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
                    <img src="https://picsum.photos/id/163/600/700" alt="Construction Site" className="relative z-10 rounded-sm shadow-xl w-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                    
                    <div className="absolute -bottom-8 -right-8 z-20 bg-brand-dark p-8 shadow-2xl rounded-sm hidden md:block border-b-4 border-brand-accent">
                         <Construction className="h-10 w-10 text-brand-accent mb-2" />
                         <p className="font-bold text-white text-lg uppercase tracking-wide">Est. 2017</p>
                    </div>
                </div>
                <div className="lg:w-1/2 animate-fade-up">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-1 w-12 bg-brand-accent"></div>
                        <h4 className="text-brand-accent font-bold uppercase tracking-widest text-sm">Welcome to Jecati</h4>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-8 leading-tight">
                        We Build Your <br/><span className="text-brand-accent">Future Projects</span>
                    </h2>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg font-light">
                        Jecati Construction Services is committed to excellence, leveraging expertise and teamwork to construct and collaborate on diverse projects. With a focus on innovation and efficiency, we tackle each endeavor with dedication and precision.
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-10">
                         <img src="https://picsum.photos/id/180/200/200" alt="Thumb 1" className="rounded-sm object-cover h-24 w-full border-2 border-transparent hover:border-brand-accent transition-all cursor-pointer" />
                         <img src="https://picsum.photos/id/184/200/200" alt="Thumb 2" className="rounded-sm object-cover h-24 w-full border-2 border-transparent hover:border-brand-accent transition-all cursor-pointer" />
                         <img src="https://picsum.photos/id/188/200/200" alt="Thumb 3" className="rounded-sm object-cover h-24 w-full border-2 border-transparent hover:border-brand-accent transition-all cursor-pointer" />
                    </div>
                    
                    <NavLink to="/about" className="inline-block bg-brand-dark text-white px-10 py-4 rounded-sm font-bold uppercase tracking-wide hover:bg-brand-accent hover:text-brand-dark transition-colors duration-300">
                        About Company
                    </NavLink>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-brand-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/id/195/1920/600')] bg-cover bg-fixed bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-transparent to-brand-primary"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Top Quality Construction Services</h2>
            <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">We manage your dream building and excel in ground excavation with our professional fleet and crew.</p>
            <NavLink to="/pricing" className="inline-flex items-center gap-2 bg-brand-accent text-brand-dark font-extrabold py-4 px-10 rounded-sm hover:bg-white transition-all duration-300 shadow-lg transform hover:-translate-y-1">
                REQUEST A QUOTE <ArrowRight className="w-5 h-5" />
            </NavLink>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
                <h4 className="text-brand-accent font-bold uppercase tracking-widest mb-2">What We Do</h4>
                <h2 className="text-4xl md:text-5xl font-black text-brand-dark">Our Best Services</h2>
            </div>
            <NavLink to="/services" className="text-brand-dark font-bold hover:text-brand-accent flex items-center gap-2 group transition-colors">
                VIEW ALL SERVICES <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NavLink>
         </div>
         
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, idx) => (
                <div key={service.id} className="bg-white rounded-sm shadow-md overflow-hidden group hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent hover:border-brand-accent hover:-translate-y-2">
                    <div className="h-56 overflow-hidden relative">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                        <div className="absolute top-4 right-4 bg-white p-3 rounded-sm shadow-lg z-10">
                            {idx === 0 && <HomeIcon className="text-brand-accent h-6 w-6" />}
                            {idx === 1 && <Construction className="text-brand-accent h-6 w-6" />}
                            {idx === 2 && <Truck className="text-brand-accent h-6 w-6" />}
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-xl font-bold text-brand-dark mb-4 uppercase">{service.title}</h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed border-l-2 border-gray-200 pl-4 group-hover:border-brand-accent transition-colors">
                            {service.description.substring(0, 80)}...
                        </p>
                        <NavLink to="/services" className="text-brand-accent text-xs font-black uppercase tracking-widest hover:text-brand-dark transition-colors">
                            Read More &rarr;
                        </NavLink>
                    </div>
                </div>
            ))}
         </div>
      </section>

      {/* Stats and Manager */}
      <section className="relative bg-brand-dark text-white">
         <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 bg-brand-primary p-12 lg:p-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 bg-brand-accent/5 rounded-full blur-3xl"></div>
                
                <h4 className="text-brand-accent text-sm font-bold uppercase mb-2 tracking-widest">Why Choose Us</h4>
                <h2 className="text-3xl lg:text-4xl font-black mb-8 leading-tight">Best Provider for <br/>Construction Services</h2>
                
                <div className="space-y-6 relative z-10">
                    <p className="text-gray-400 leading-relaxed border-l-4 border-gray-700 pl-6">
                        We simplify your experience with straightforward transactions and transparent contracts. From residential to commercial projects, we deliver innovative solutions tailored to your needs.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 mt-8">
                        <div className="bg-gray-800/50 p-6 border-l-4 border-brand-accent">
                             <h3 className="text-3xl font-black text-white">756<span className="text-brand-accent">+</span></h3>
                             <p className="text-xs text-gray-400 uppercase font-bold mt-1">Project Completed</p>
                        </div>
                        <div className="bg-gray-800/50 p-6 border-l-4 border-brand-accent">
                             <h3 className="text-3xl font-black text-white">1.6k<span className="text-brand-accent">+</span></h3>
                             <p className="text-xs text-gray-400 uppercase font-bold mt-1">Happy Customers</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 min-h-[500px] relative">
                <div className="absolute inset-0 bg-brand-accent/20 z-10 mix-blend-multiply"></div>
                <img src="https://picsum.photos/id/1070/800/800" alt="Worker" className="w-full h-full object-cover grayscale" />
            </div>
         </div>
      </section>

      {/* Latest Projects */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
            <div className="inline-block px-3 py-1 bg-brand-accent/10 rounded-sm text-brand-accent text-xs font-bold uppercase tracking-widest mb-4">Portfolio</div>
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-4">Latest Projects</h2>
            <div className="w-24 h-1.5 bg-brand-accent mx-auto"></div>
         </div>
         
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
                <div key={project.id} className="group relative bg-white shadow-lg overflow-hidden border-b-4 border-brand-dark hover:border-brand-accent transition-all duration-300 hover:-translate-y-2">
                    <div className="h-72 overflow-hidden relative">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-brand-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <NavLink to="/projects" className="bg-brand-accent text-brand-dark font-bold py-2 px-6 rounded-sm hover:bg-white transition-colors">
                                VIEW PROJECT
                            </NavLink>
                        </div>
                    </div>
                    <div className="p-6 text-left bg-white relative z-10">
                        <span className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                        <h3 className="font-bold text-brand-dark text-lg uppercase mb-3 group-hover:text-brand-accent transition-colors">{project.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 border-t border-gray-100 pt-3">
                            <MapPin className="w-4 h-4 flex-shrink-0 text-brand-accent" />
                            <span>{project.location}</span>
                        </div>
                    </div>
                </div>
            ))}
         </div>
         <div className="text-center mt-16">
            <NavLink to="/projects" className="inline-block border-2 border-brand-dark text-brand-dark font-bold py-3 px-8 hover:bg-brand-dark hover:text-white transition-all uppercase tracking-wide rounded-sm">
                View All Projects
            </NavLink>
         </div>
      </section>
      
      {/* Testimonial / Manager Quote */}
      <section className="bg-brand-accent py-24 relative overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-16 relative z-10">
            <div className="lg:w-1/2">
                <h4 className="text-brand-dark/60 font-black text-sm uppercase mb-4 tracking-widest">Manager's Voice</h4>
                <h2 className="text-4xl lg:text-6xl font-black text-white leading-none mb-8 drop-shadow-sm">
                    "WE BUILD WITH <br/><span className="text-brand-dark">PASSION & PRIDE</span>"
                </h2>
                <div className="w-20 h-2 bg-brand-dark mb-8"></div>
            </div>
            <div className="lg:w-1/2 bg-white p-10 shadow-2xl rounded-sm relative transform lg:translate-y-12">
                 <div className="text-6xl text-brand-accent font-serif absolute top-4 left-6 opacity-30">"</div>
                 <p className="text-gray-600 italic mb-8 relative z-10 text-lg leading-relaxed">
                    {TEAM_MEMBERS[0].quote}
                 </p>
                 <div className="flex items-center gap-5 border-t border-gray-100 pt-6">
                    <img src={TEAM_MEMBERS[0].image} alt="Manager" className="w-16 h-16 rounded-sm object-cover shadow-md" />
                    <div>
                        <h5 className="font-black text-xl text-brand-dark uppercase">{TEAM_MEMBERS[0].name}</h5>
                        <p className="text-brand-accent text-sm font-bold uppercase tracking-wide">{TEAM_MEMBERS[0].role}</p>
                    </div>
                 </div>
            </div>
        </div>
      </section>
      
      {/* Spacer for the overlapping card above */}
      <div className="h-12 bg-white lg:block hidden"></div>

      <Stats />

    </div>
  );
};

export default Home;
