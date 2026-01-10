
import React, { useState } from 'react';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'UI/UX', 'Branding', 'Motion', 'Web3'];
  
  const projects = [
    { title: "Fintech Dashboard", category: "UI/UX", desc: "Reimagining financial data visualization for enterprise clients.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkBB358_6ao6UU36nYLRmBXUTSCfvIw4teLZIx7By73vNbWBa-lYGHJ3zRS5UvX68faCbodZ56-9nK6dCvsaVOAA5wPBlcVwJfs0uEkeUk1j1rasxqeiXSs3hmhSue3Hr38o2Wrolf2LHa24YX3S9eJPogNY4lfnzyOL57AQVXkb673Djgo15Itm8caaeHyVSF_q_eIFYhr84Ujusy1yiluJxh_fcTEwgZZLdOVBp3DSm2YTWawzCP3wGXK5mc-f3vvVxKSz6YrSAh" },
    { title: "EcoTravel App", category: "UI/UX", desc: "A sustainable travel companion helping users reduce their carbon footprint.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTNUk03sIWWXQnO45HGUFLZXgY5VN9WPEPM0T3PIZDy1zZV5Cyh0NnprSIs2RL4O37aytFDVmP0NvSUU1_sdaOm0K4HHBHvSBoOo5Igwro4KX4SMYxJibsSGcqv6o-HfhmJGWNLqZ55ygVbJkzntwx1w0ET3_NXZhr-oTijkn9kXpkqxd0Q5UWa-t9se1EZHzfd5HCATHRnOBDY-J-4NWXECZDWayR82YXGk15BkvaHy72AIQltR1cv09c3qlk-OHA975BSM6lNH_7" },
    { title: "Neon Identity", category: "Branding", desc: "Comprehensive visual identity system for a next-gen lighting technology startup.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-F57Pw9iB-sHrgBgzXDqWyMdcAFtjZpIDT5ATpUh3bX_JJRmQF_mNVyr1SRCGfuFbhqO5J3K1wLzJdx-AbBC61wn3NbhvnySMF4cHZ-DnIEbHmY5UcNgv2K4I5zBaBdBuR6jSO6X2z5QgrcJInJG0djTqA8T4aCDWDPaxAd3bdeqYbhQrHmFXmY6sWLOqXIX-aMeiKuwWy-9SEy8KKaYIDjbaSedq9o4TwVXeqgJYiKVdUonVjyKZl1Aj5xA9wX3zTCE3-xzFLnYX" },
    { title: "Crypto Wallet", category: "Web3", desc: "Secure and intuitive digital wallet design facilitating seamless crypto transactions.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXgLI6pTaMxErxRVD_wtK9j909zJN9h3jPGDzbEK1s0hvfv3HRBDEL13B449sg7oWY8WZYxe_0EFyEURQSJv7BAsyiHKjLnI0ITIIP0i24YtkT6F39tC-1YaeWpug2VhgSTs7llLIRVFFhQ9_aFck6Gs91NWGWLjObrEf5Cx0blPo-1gYzUm8dlGr-aVsvoqEi6nvkMz8TjL20qH96-xGFajhXLwnJRVx04xKMe1c2-LWFxE9f7p9DA4wxES0oNXdplhZJXJ08kpJR" }
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-12">
      <section className="mb-12 flex flex-col lg:flex-row justify-between items-end gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 w-fit mb-4">
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Showcase</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight">
            SELECTED <br/><span className="text-white/50">WORKS 2024</span>
          </h1>
        </div>
        <p className="text-accent-text text-lg max-w-sm text-right leading-relaxed">A curated collection of digital experiences focused on clarity and impact.</p>
      </section>

      <div className="flex gap-3 overflow-x-auto pb-8 no-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)}
            className={`h-10 px-6 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-primary text-background-dark' : 'bg-surface border border-white/5 text-white/70 hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((proj, i) => (
          <article key={i} className="group relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-surface transition-transform duration-700 group-hover:scale-105">
              <div className="w-full h-full bg-cover bg-center opacity-80 group-hover:opacity-60 transition-opacity" style={{backgroundImage: `url('${proj.img}')`}}></div>
            </div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary font-bold tracking-widest text-xs uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{proj.category}</span>
                  <div className="size-10 rounded-full bg-white text-background-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                    <span className="material-symbols-outlined">arrow_outward</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{proj.title}</h3>
                <p className="text-white/70 line-clamp-2 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">{proj.desc}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Projects;
