
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="w-full min-h-screen px-6 lg:px-20 pt-32 pb-32 overflow-y-auto no-scrollbar">

      {/* Editorial Hero */}
      <section className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center mb-48">
        <div className="w-full lg:w-1/2 flex flex-col justify-between py-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-4 text-primary group cursor-default">
              <span className="h-px w-12 bg-primary transition-all group-hover:w-20"></span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase italic">The Artist</span>
            </div>

            <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter uppercase">
              FAIZAN <br />
              <span className="text-white/10">ELLAHI</span>
            </h1>

            <p className="text-xl text-white/60 leading-relaxed max-w-xl font-medium">
              A digital architect specializing in <span className="text-white">high-fidelity 3D modeling</span>, immersive meta-environments, and cinematic motion design.
              I bridge the gap between technical precision and artistic imagination.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:gap-16 pt-12 border-t border-white/5">
            <div>
              <span className="text-5xl md:text-7xl font-black text-white leading-none block mb-2">03<span className="text-primary text-xl">+</span></span>
              <span className="text-[10px] font-bold text-white/30 tracking-[0.3em] uppercase">Years Exp.</span>
            </div>
            <div>
              <span className="text-5xl md:text-7xl font-black text-white leading-none block mb-2">25<span className="text-primary text-xl">+</span></span>
              <span className="text-[10px] font-bold text-white/30 tracking-[0.3em] uppercase">Projects</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-end">
          <div className="relative aspect-[4/5] w-full max-w-[800px] rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl shadow-primary/5">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            <img src="/My self.png" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100" alt="Faizan Ellahi" />

            <div className="absolute bottom-12 left-12 z-20 space-y-2">
              <span className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase">Current Location</span>
              <p className="text-3xl font-black text-white tracking-tighter">PAKISTAN, PK</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Minimalist Cards */}
      <section className="mb-48">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">DIGITAL <br /><span className="text-white/20">CAPABILITIES</span></h2>
          <p className="text-white/40 max-w-sm text-[11px] leading-loose tracking-[0.1em] uppercase font-bold text-right italic">
            From conceptual digital sculpting to real-time rendering in high-fidelity engines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 rounded-[3rem] overflow-hidden border border-white/10">
          <CapabilityCard
            num="01"
            title="3D Modeling"
            desc="Hard-surface and organic modeling focused on topology optimization and silhouette."
            tools={['Blender', 'Zbrush', '3Ds Max']}
          />
          <CapabilityCard
            num="02"
            title="Texturing"
            desc="PBR material creation with physically accurate bakes and procedural adjustments."
            tools={['Substance', 'Photoshop', 'Marmoset']}
          />
          <CapabilityCard
            num="03"
            title="Environments"
            desc="Large-scale world building for metaverses and real-time interactive experiences."
            tools={['Unreal Engine 5', 'TCCM']}
          />
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="grid lg:grid-cols-12 gap-20 items-start mb-48">
        <div className="lg:col-span-4 sticky top-40">
          <h3 className="text-primary font-mono text-xs tracking-[0.5em] uppercase mb-8">Career Journey</h3>
          <p className="text-3xl font-black text-white tracking-tighter leading-tight">Crafting virtual realities at the intersection of tech and art.</p>
        </div>

        <div className="lg:col-span-8 space-y-12">
          <ExperienceItem
            year="2022 — PRE"
            company="Narsun Studios"
            role="Senior 3D Artist"
            desc="Leading 3D production for the Cloud City Metaverse ecosystem. Focusing on high-fidelity asset creation and engine optimization."
          />
          <ExperienceItem
            year="2021 — 2022"
            company="Freelance"
            role="3D Generalist"
            desc="Collaborating with global clients on high-end Product Renders, Game Assets, and Architectural Visualization."
          />
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="relative px-12 py-32 rounded-[4rem] bg-white/[0.05] backdrop-blur-xl border border-white/10 overflow-hidden group">
        <div className="absolute -top-20 -right-20 opacity-[0.03] grayscale transition-all group-hover:opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[400px]">auto_awesome</span>
        </div>

        <div className="max-w-4xl relative z-10">
          <span className="text-white/30 text-[10px] font-bold tracking-[0.4em] uppercase block mb-10 italic">Design Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-12 italic">
            "I thrive in the complexity of the digital realm, transforming abstract concepts into tangible visual experiences through relentless iteration and technical mastery."
          </h2>
          <div className="flex items-center gap-6">
            <div className="h-0.5 w-12 bg-primary"></div>
            <span className="font-bold text-white tracking-widest uppercase text-xs">FAIZAN ELAHI</span>
          </div>
        </div>
      </section>

    </div>
  );
};

const CapabilityCard: React.FC<{ num: string, title: string, desc: string, tools: string[] }> = ({ num, title, desc, tools }) => (
  <div className="bg-white/[0.03] backdrop-blur-md p-12 transition-all hover:bg-white/5 group">
    <span className="text-primary font-mono text-xs font-bold block mb-8 opacity-40 group-hover:opacity-100 transition-opacity">[{num}]</span>
    <h3 className="text-3xl font-black text-white mb-6 tracking-tighter">{title}</h3>
    <p className="text-white/40 text-sm leading-relaxed mb-10 group-hover:text-white/60 transition-colors">{desc}</p>
    <div className="flex flex-wrap gap-2">
      {tools.map(tool => (
        <span key={tool} className="text-[9px] font-bold text-white/30 tracking-widest uppercase border border-white/10 px-2 py-1 rounded group-hover:border-primary/30 group-hover:text-primary transition-all">
          {tool}
        </span>
      ))}
    </div>
  </div>
);

const ExperienceItem: React.FC<{ year: string, company: string, role: string, desc: string }> = ({ year, company, role, desc }) => (
  <div className="group space-y-4">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h4 className="text-2xl font-black text-white tracking-tighter uppercase group-hover:text-primary transition-colors">{company}</h4>
      <span className="text-[10px] font-bold text-white/20 tracking-[0.2em] uppercase font-mono">{year}</span>
    </div>
    <p className="text-primary text-xs font-bold tracking-widest uppercase">{role}</p>
    <p className="text-white/50 text-sm leading-relaxed max-w-2xl">{desc}</p>
    <div className="h-px w-full bg-white/5 group-hover:bg-primary/20 transition-colors"></div>
  </div>
);

export default About;
