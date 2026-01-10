
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="max-w-[1200px] w-full px-6 md:px-12 pt-10 pb-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex flex-col gap-8 flex-1 text-center lg:text-left items-center lg:items-start">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-[#214a49] w-fit mx-auto lg:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-medium text-primary tracking-wide uppercase">Available for work</span>
              </div>
              <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Developer</span> & Designer
              </h1>
              <h2 className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                Building digital experiences that matter. Focusing on motion, interaction, and visual storytelling for brands that dare to be different.
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start w-full">
              <Link to="/projects" className="flex min-w-[140px] items-center justify-center rounded-full h-12 px-8 bg-primary text-background-dark text-base font-bold shadow-[0_0_20px_rgba(6,249,241,0.25)] hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all">
                View Projects
                <span className="material-symbols-outlined ml-2 text-lg">arrow_downward</span>
              </Link>
              <Link to="/contact" className="flex min-w-[140px] items-center justify-center rounded-full h-12 px-8 bg-surface border border-[#214a49] text-white text-base font-bold hover:bg-[#214a49] transition-all">
                Contact Me
              </Link>
            </div>

            <div className="flex gap-8 pt-4 opacity-70">
              <div className="flex flex-col"><span className="text-2xl font-bold">5+</span><span className="text-xs text-slate-400 uppercase tracking-wider">Years Exp</span></div>
              <div className="flex flex-col"><span className="text-2xl font-bold">40+</span><span className="text-xs text-slate-400 uppercase tracking-wider">Projects</span></div>
              <div className="flex flex-col"><span className="text-2xl font-bold">12</span><span className="text-xs text-slate-400 uppercase tracking-wider">Awards</span></div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full aspect-square max-w-[500px] rounded-full overflow-hidden border-4 border-surface shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
              <div className="w-full h-full bg-center bg-no-repeat bg-cover transform hover:scale-105 transition-transform duration-700 ease-out" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2win95UZ-enFMyApAANSb_9GYNPoUdWDxsEeS3B6odXoGwqeGohuyFgkZD8346D7ImHnWsXtD7gWZBxZ27mr2mkcgR9J1T1DbEVWPAQUtLuFDmZwtoZmtsz2aCIoH8sU053jdSacZiyAvwLi2u89aSlMFa5w7f-inF_4Wwi3auuM4LI-8pA06WZDd-wux0JFCL7RdNftePXFBosYxAeJxw2HH7EdoyeIxxk-H3sqQuBxNNoRq7cjdo2_Pzmyu9Ds3fNK3F0xRYY8S")'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="w-full bg-surface border-y border-[#214a49] overflow-hidden py-4">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flex justify-center flex-wrap gap-4 md:gap-8 opacity-80">
            {['UI Design', 'Frontend', 'Motion', 'Branding'].map((item, idx) => (
              <React.Fragment key={item}>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">{idx === 0 ? 'palette' : idx === 1 ? 'code' : idx === 2 ? 'animation' : 'diamond'}</span>
                  <span className="text-white font-medium uppercase tracking-widest text-sm">{item}</span>
                </div>
                {idx < 3 && <span className="text-[#214a49] hidden md:block">•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Snippet Selected Works */}
      <section className="max-w-[1200px] w-full px-6 md:px-12 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="text-white text-4xl md:text-5xl font-bold">Selected Works</h2>
            <p className="text-slate-400 mt-2 max-w-md">A curated selection of projects that showcase my passion for clean design.</p>
          </div>
          <Link to="/projects" className="group flex items-center gap-2 text-primary font-bold hover:text-white transition-colors pb-1 border-b border-transparent hover:border-primary">
            See All Projects <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard 
            title="E-Commerce Redesign" 
            category="UX Research & UI Design" 
            img="https://lh3.googleusercontent.com/aida-public/AB6AXuDv0LftO-cDkVzt0nbCGbYNg58Zu70T7TurogdK1o8Wv0mYdlbs-wp2_oflZL8ke5N4ADwOfccsxYB-m4zYxoH8xIN9DZj3qi8tTu2nrZzQphnPmneDlFbwg2jTbT76OoJLsgmkaV2CSECpYD_AGfv1LMrOdGZnqRlf1tiSl9FprAxcIPYyf2n6gXavqSp08LeEICv-7Uk91kPXzPHD7FVcxCYLVgwodpHYv5pJD765ZKoNK0VRdp0wXlRkfbYKHoK8nHes1lkGa7X7"
          />
          <ProjectCard 
            title="Fintech Dashboard" 
            category="Product Design System" 
            img="https://lh3.googleusercontent.com/aida-public/AB6AXuBCDat6zu7Cwbz2CDB6CHDLSzjyaIJMdKGhPsZ0zgFmPfSR9UNugxzVdpF-gJSFkuHIxtXazr-h3P6eaBTLLH6jLjAdoGiEzpEx1s1qWH7ZFw8hMWHoT85D9Tz0RQ0hLnM7Th_dTpuH7izwVde7iAG4WkMRDqtxg7M81Pn-uvv486ZPvZaGnoPSB0Dj4uGnAYYp2ZW9fT-to_sFon75UMdCm61iTmrKTNmZuzipZQbHOXFBlcHWo2_aY9pKBqjMEC5I_aIlJqJUfpyO"
            className="md:translate-y-12"
          />
        </div>
      </section>
    </div>
  );
};

const ProjectCard: React.FC<{title: string, category: string, img: string, className?: string}> = ({title, category, img, className}) => (
  <div className={`group relative flex flex-col gap-4 rounded-xl p-4 bg-surface border border-[#214a49] hover:border-primary/50 transition-colors duration-300 ${className || ''}`}>
    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
      <div className="w-full h-full bg-center bg-no-repeat bg-cover transform group-hover:scale-105 transition-transform duration-500" style={{backgroundImage: `url("${img}")`}}></div>
      <div className="absolute top-4 right-4 z-20 bg-background-dark/80 backdrop-blur px-3 py-1 rounded-full border border-[#214a49]">
        <span className="text-xs text-white font-bold uppercase">2023</span>
      </div>
    </div>
    <div className="flex justify-between items-start px-2">
      <div>
        <h3 className="text-white text-2xl font-bold leading-tight mb-1 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm">{category}</p>
      </div>
      <div className="size-10 rounded-full border border-[#214a49] flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark group-hover:border-primary transition-all">
        <span className="material-symbols-outlined">arrow_outward</span>
      </div>
    </div>
  </div>
);

export default Home;
