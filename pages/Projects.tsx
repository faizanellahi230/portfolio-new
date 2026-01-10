
import React, { useState } from 'react';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'UI/UX', 'Branding', 'Motion', 'Web3', 'Mobile', 'Design Systems'];

  const projects = [
    { title: "Cloud City Metaverse", category: "Web3", desc: "A decentralized gaming platform allowing players to create, own, and build their presence in a borderless community.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkBB358_6ao6UU36nYLRmBXUTSCfvIw4teLZIx7By73vNbWBa-lYGHJ3zRS5UvX68faCbodZ56-9nK6dCvsaVOAA5wPBlcVwJfs0uEkeUk1j1rasxqeiXSs3hmhSue3Hr38o2Wrolf2LHa24YX3S9eJPogNY4lfnzyOL57AQVXkb673Djgo15Itm8caaeHyVSF_q_eIFYhr84Ujusy1yiluJxh_fcTEwgZZLdOVBp3DSm2YTWawzCP3wGXK5mc-f3vvVxKSz6YrSAh" },
    { title: "Tourism Metaverse", category: "Web3", desc: "Immersive experiences showcasing real-world destinations for virtual exploration.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTNUk03sIWWXQnO45HGUFLZXgY5VN9WPEPM0T3PIZDy1zZV5Cyh0NnprSIs2RL4O37aytFDVmP0NvSUU1_sdaOm0K4HHBHvSBoOo5Igwro4KX4SMYxJibsSGcqv6o-HfhmJGWNLqZ55ygVbJkzntwx1w0ET3_NXZhr-oTijkn9kXpkqxd0Q5UWa-t9se1EZHzfd5HCATHRnOBDY-J-4NWXECZDWayR82YXGk15BkvaHy72AIQltR1cv09c3qlk-OHA975BSM6lNH_7" },
    { title: "Neon Identity", category: "Branding", desc: "Comprehensive visual identity system for a next-gen lighting technology startup.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-F57Pw9iB-sHrgBgzXDqWyMdcAFtjZpIDT5ATpUh3bX_JJRmQF_mNVyr1SRCGfuFbhqO5J3K1wLzJdx-AbBC61wn3NbhvnySMF4cHZ-DnIEbHmY5UcNgv2K4I5zBaBdBuR6jSO6X2z5QgrcJInJG0djTqA8T4aCDWDPaxAd3bdeqYbhQrHmFXmY6sWLOqXIX-aMeiKuwWy-9SEy8KKaYIDjbaSedq9o4TwVXeqgJYiKVdUonVjyKZl1Aj5xA9wX3zTCE3-xzFLnYX" },
    { title: "Crypto Wallet", category: "Web3", desc: "Secure and intuitive digital wallet design facilitating seamless crypto transactions.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXgLI6pTaMxErxRVD_wtK9j909zJN9h3jPGDzbEK1s0hvfv3HRBDEL13B449sg7oWY8WZYxe_0EFyEURQSJv7BAsyiHKjLnI0ITIIP0i24YtkT6F39tC-1YaeWpug2VhgSTs7llLIRVFFhQ9_aFck6Gs91NWGWLjObrEf5Cx0blPo-1gYzUm8dlGr-aVsvoqEi6nvkMz8TjL20qH96-xGFajhXLwnJRVx04xKMe1c-LWFxE9f7p9DA4wxES0oNXdplhZJXJ08kpJR" },
    { title: "HealthTrack Pro", category: "Mobile", desc: "A comprehensive health monitoring application for professional athletes.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCDat6zu7Cwbz2CDB6CHDLSzjyaIJMdKGhPsZ0zgFmPfSR9UNugxzVdpF-gJSFkuHIxtXazr-h3P6eaBTLLH6jLjAdoGiEzpEx1s1qWH7ZFw8hMWHoT85D9Tz0RQ0hLnM7Th_dTpuH7izwVde7iAG4WkMRDqtxg7M81Pn-uvv486ZPvZaGnoPSB0Dj4uGnAYYp2ZW9fT-to_sFon75UMdCm61iTmrKTNmZuzipZQbHOXFBlcHWo2_aY9pKBqjMEC5I_aIlJqJUfpyO" },
    { title: "Lumina Design", category: "Design Systems", desc: "A unified design language for Lumina's suite of enterprise products.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDv0LftO-cDkVzt0nbCGbYNg58Zu70T7TurogdK1o8Wv0mYdlbs-wp2_oflZL8ke5N4ADwOfccsxYB-m4zYxoH8xIN9DZj3qi8tTu2nrZzQphnPmneDlFbwg2jTbT76OoJLsgmkaV2CSECpYD_AGfv1LMrOdGZnqRlf1tiSl9FprAxcIPYyf2n6gXavqSp08LeEICv-7Uk91kPXzPHD7FVcxCYLVgwodpHYv5pJD765ZKoNK0VRdp0wXlRkfbYKHoK8nHes1lkGa7X7" },
    { title: "Zenith Banking", category: "UI/UX", desc: "Next-generation banking experience with AI-powered financial insights.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTNUk03sIWWXQnO45HGUFLZXgY5VN9WPEPM0T3PIZDy1zZV5Cyh0NnprSIs2RL4O37aytFDVmP0NvSUU1_sdaOm0K4HHBHvSBoOo5Igwro4KX4SMYxJibsSGcqv6o-HfhmJGWNLqZ55ygVbJkzntwx1w0ET3_NXZhr-oTijkn9kXpkqxd0Q5UWa-t9se1EZHzfd5HCATHRnOBDY-J-4NWXECZDWayR82YXGk15BkvaHy72AIQltR1cv09c3qlk-OHA975BSM6lNH_7" },
    { title: "Apex Motion", category: "Motion", desc: "Showreel for a leading motion design agency featuring bold typography.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2win95UZ-enFMyApAANSb_9GYNPoUdWDxsEeS3B6odXoGwqeGohuyFgkZD8346D7ImHnWsXtD7gWZBxZ27mr2mkcgR9J1T1DbEVWPAQUtLuFDmZwtoZmtsz2aCIoH8sU053jdSacZiyAvwLi2u89aSlMFa5w7f-inF_4Wwi3auuM4LI-8pA06WZDd-wux0JFCL7RdNftePXFBosYxAeJxw2HH7EdoyeIxxk-H3sqQuBxNNoRq7cjdo2_Pzmyu9Ds3fNK3F0xRYY8S" },
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="w-full px-6 lg:px-20 py-12 pt-32 h-full overflow-y-auto no-scrollbar">
      <section className="mb-20 flex flex-col lg:flex-row justify-between items-end gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 w-fit mb-4">
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Showcase</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black leading-[0.9] tracking-tight text-white">
            SELECTED <br /><span className="text-white/50">WORKS 2024</span>
          </h1>
        </div>
        <p className="text-accent-text text-xl max-w-md text-right leading-relaxed mb-2">A curated collection of digital experiences focused on clarity and impact.</p>
      </section>

      <div className="flex gap-4 overflow-x-auto pb-12 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`h-12 px-8 rounded-full text-base font-bold transition-all whitespace-nowrap ${filter === cat ? 'bg-primary text-background-dark' : 'bg-surface border border-white/5 text-white/70 hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
        {filteredProjects.map((proj, i) => (
          <article key={i} className="group relative w-full aspect-[4/3] bg-white/[0.03] backdrop-blur-md rounded-[2rem] border border-white/10 p-[20px] overflow-hidden transition-all hover:border-primary/50">
            {/* Year Stamp - Visible in the cut corner */}
            <div className="absolute top-8 right-8 z-0">
              <span className="text-white/40 font-mono text-sm tracking-widest">2024</span>
            </div>

            {/* Clipped Image Container */}
            <div
              className="relative h-full w-full overflow-hidden bg-white/5"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 130px) 0, calc(100% - 124px) 2px, calc(100% - 110px) 10px, 100% 120px, 100% 100%, 0 100%)',
                borderRadius: '1rem 0 1rem 1rem',
                WebkitClipPath: 'polygon(0 0, calc(100% - 135px) 0, calc(100% - 124px) 2px, calc(100% - 110px) 10px, calc(100% - 10px) 110px, calc(100% - 2px) 124px, 100% 135px, 100% 100%, 0 100%)'
              }}
            >
              <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${proj.img}')` }}></div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-end justify-between w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-none">{proj.title}</h3>
                    <p className="text-primary font-bold tracking-widest text-xs uppercase">{proj.category}</p>
                  </div>

                  <button className="h-12 px-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-500 delay-75">
                    See Project
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Projects;
