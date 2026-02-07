import React from 'react';
import { Target, Eye, Heart, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brand-dark text-white py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-brand-accent/5 pattern-grid-lg opacity-10"></div>
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10 animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tight">About Us</h1>
            <div className="w-24 h-1 bg-brand-accent mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-xl mx-auto text-lg font-light">Building foundations for the future with integrity and excellence.</p>
         </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
             <div className="relative">
                <div className="absolute top-4 left-4 w-full h-full border-4 border-brand-accent rounded-sm z-0"></div>
                <img src="https://picsum.photos/id/103/800/800" alt="About Us" className="w-full relative z-10 shadow-xl rounded-sm grayscale hover:grayscale-0 transition-all duration-500" />
             </div>
             
             <div className="animate-fade-up delay-100">
                <h4 className="text-brand-accent font-bold uppercase tracking-widest mb-2">Our Story</h4>
                <h2 className="text-4xl font-black text-brand-dark mb-8">Who We Are?</h2>
                
                <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                    <p>
                        Established on March 30, 2017, Jecati began its journey in the construction services and rental equipment industry over seven years ago. Led by <span className="font-bold text-brand-dark">Rygs Tiu</span>, a young visionary with a broad range of construction experience.
                    </p>
                    <p>
                        Jecati has built a foundation of first-hand expertise, having personally managed hundreds of projects. His understanding covers everything from meticulous cleanup to comprehensive product knowledge, forming the simple yet effective business model of <span className="bg-brand-accent/20 px-2 font-bold text-brand-dark">"GOOD SERVICE, GOOD PRODUCT, and GOOD PRICE."</span>
                    </p>
                    <p>
                        As part of its expansion efforts, Jecati transitioned into a corporation on November 9, 2019, becoming Jecati Construction Services Inc.
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    {['Licensed Experts', 'On-Time Delivery', 'Quality Materials', 'Affordable Pricing'].map((item) => (
                        <div key={item} className="flex items-center gap-2 font-bold text-brand-dark">
                            <CheckCircle className="text-brand-accent w-5 h-5" />
                            {item}
                        </div>
                    ))}
                </div>
             </div>
          </div>

          {/* Mission/Vision/Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mission */}
              <div className="group bg-white border border-gray-100 p-8 rounded-sm shadow-lg hover:shadow-2xl hover:bg-brand-dark hover:border-brand-dark transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Target className="w-32 h-32 text-brand-dark group-hover:text-white" />
                 </div>
                 <div className="w-14 h-14 bg-brand-dark text-white flex items-center justify-center rounded-sm mb-6 group-hover:bg-brand-accent group-hover:text-brand-dark transition-colors">
                    <Target className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-black text-brand-dark group-hover:text-white mb-4 uppercase transition-colors">Mission</h3>
                 <ul className="space-y-3 text-sm text-gray-600 group-hover:text-gray-300 relative z-10 transition-colors">
                    <li className="flex items-start gap-2"><span className="text-brand-accent mt-1">▪</span> To offer value to our customers through innovative and quality projects.</li>
                    <li className="flex items-start gap-2"><span className="text-brand-accent mt-1">▪</span> To complete and deliver the projects on time each time.</li>
                    <li className="flex items-start gap-2"><span className="text-brand-accent mt-1">▪</span> To ensure sense of belongingness & stability to our employees.</li>
                 </ul>
              </div>

              {/* Vision */}
              <div className="group bg-white border border-gray-100 p-8 rounded-sm shadow-lg hover:shadow-2xl hover:bg-brand-dark hover:border-brand-dark transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Eye className="w-32 h-32 text-brand-dark group-hover:text-white" />
                 </div>
                 <div className="w-14 h-14 bg-brand-dark text-white flex items-center justify-center rounded-sm mb-6 group-hover:bg-brand-accent group-hover:text-brand-dark transition-colors">
                    <Eye className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-black text-brand-dark group-hover:text-white mb-4 uppercase transition-colors">Vision</h3>
                 <p className="text-gray-600 text-sm leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors">
                    At Jecati Construction, we aim to be the top company transforming dreams into reality with quality, innovation, and sustainability. We envision a future where every structure we build stands as a testament to our commitment.
                 </p>
              </div>

              {/* Values */}
              <div className="group bg-white border border-gray-100 p-8 rounded-sm shadow-lg hover:shadow-2xl hover:bg-brand-dark hover:border-brand-dark transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Heart className="w-32 h-32 text-brand-dark group-hover:text-white" />
                 </div>
                 <div className="w-14 h-14 bg-brand-dark text-white flex items-center justify-center rounded-sm mb-6 group-hover:bg-brand-accent group-hover:text-brand-dark transition-colors">
                    <Heart className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-black text-brand-dark group-hover:text-white mb-4 uppercase transition-colors">Values</h3>
                 <ul className="space-y-3 text-sm text-gray-600 group-hover:text-gray-300 relative z-10 transition-colors">
                    <li className="flex items-start gap-2"><span className="text-brand-accent mt-1">▪</span> Operate business with high level of integrity.</li>
                    <li className="flex items-start gap-2"><span className="text-brand-accent mt-1">▪</span> Inculcate quality in all levels.</li>
                    <li className="flex items-start gap-2"><span className="text-brand-accent mt-1">▪</span> Value time commitments given to customers.</li>
                 </ul>
              </div>
          </div>
      </div>
      
      {/* Stats Strip */}
      <div className="bg-brand-primary py-20 text-white border-b-8 border-brand-accent">
         <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-16 md:gap-32 text-center">
             <div>
                 <h3 className="text-6xl font-black text-white mb-2">756<span className="text-brand-accent text-4xl">+</span></h3>
                 <p className="text-gray-400 uppercase tracking-widest text-sm">Happy Customers</p>
             </div>
             <div className="w-px h-24 bg-gray-700 hidden md:block"></div>
             <div>
                 <h3 className="text-6xl font-black text-white mb-2">07<span className="text-brand-accent text-4xl">+</span></h3>
                 <p className="text-gray-400 uppercase tracking-widest text-sm">Years Experience</p>
             </div>
         </div>
      </div>

      {/* Manager Profile */}
      <div className="max-w-5xl mx-auto px-4 py-24">
         <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 relative">
                <div className="absolute top-4 -left-4 w-full h-full border-4 border-brand-dark rounded-sm"></div>
                <img src="https://picsum.photos/id/1005/600/700" alt="Rygs Tiu" className="w-full h-auto rounded-sm shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="md:w-1/2">
                <h4 className="text-brand-accent font-bold uppercase tracking-widest mb-2">Meet Our Manager</h4>
                <h2 className="text-4xl font-black text-brand-dark mb-6">Sir. Rygs Tiu</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                    With a hands-on approach and years of field experience, Sir Rygs leads Jecati with a philosophy of transparency and quality. His leadership style emphasizes direct communication and practical solutions.
                </p>
                <div className="bg-gray-100 p-6 rounded-sm border-l-4 border-brand-accent">
                    <p className="italic text-gray-700 font-medium">"Construction is not just about building structures, it's about building trust."</p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default About;