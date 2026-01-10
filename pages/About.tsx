
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
      <section className="py-16 md:py-24 lg:py-32 grid gap-12 lg:grid-cols-2 items-center">
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Designing <br/><span className="text-primary">The Future.</span>
          </h1>
          <p className="max-w-[600px] text-lg text-slate-400 md:text-xl leading-relaxed">
            I’m John, a Product Designer based in Paris. I craft digital experiences that matter, blending aesthetics with functionality to solve real problems.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="h-14 rounded-full bg-primary px-8 text-base font-bold text-background-dark hover:bg-primary/90 transition-transform hover:scale-105">Download CV</button>
            <button className="h-14 rounded-full border border-white/20 bg-transparent px-8 text-base font-bold text-white hover:bg-white/5 transition-colors">View Portfolio</button>
          </div>
        </div>
        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative aspect-[3/4] w-full max-w-[460px] overflow-hidden rounded-[3rem] border border-white/10 bg-surface group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDuD-MGqwz1Tt3R9q0wlhZgW1yv1pPjHskcrgYf3SH2vp2LdgX1wRdU_R_Lt4GbBoyTMoIN3cj_A8p7YhKneEdQjuYWy9YXMF1xTXsh1EK830k6dOmqKjK_zIZ9vlTz6tCBafEAUBiAjsa03_Pp-t6N71wlsaZI14FBPYeAOLAQlG4_2q42EbT6degSYDECCgX7VOqbtrB68Y0c9qfUeGq_f7MO0dJEnD1hfzK7I7mA_0IhADiyaX_39uau5Q1KaTNtcRSnlcSD3tz0")'}}></div>
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-background-dark/80 backdrop-blur-md p-4 border border-white/10 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-background-dark">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div><p className="text-xs text-slate-400 uppercase tracking-wider">Based in</p><p className="font-bold text-white">Paris, France</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto">
        <div className="mb-12 flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="text-sm font-bold uppercase tracking-widest">My Story</span>
        </div>
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
            <h3 className="text-3xl font-bold text-white md:text-4xl">From pixels to people.</h3>
            <p>My journey started with a curiosity for how things work. Over the last <span className="text-primary font-medium">5+ years</span>, I've translated that curiosity into a career crafting digital products used by millions.</p>
            <p>I believe that great design is invisible. It's about removing friction and creating pathways that feel natural.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 h-fit">
            <StatCard value="5+" label="Years Experience" />
            <StatCard value="30+" label="Projects Shipped" />
            <StatCard value="12+" label="Happy Clients" />
          </div>
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white md:text-4xl mb-12">Experience</h2>
        <div className="space-y-6">
          <JobItem role="Senior Product Designer" company="TechFlow Systems" loc="San Francisco (Remote)" year="2021 — Present" icon="token" />
          <JobItem role="UI Designer" company="CreativeStudio" loc="London" year="2018 — 2021" icon="brush" />
          <JobItem role="Junior Designer" company="StartUp Inc" loc="Paris" year="2016 — 2018" icon="rocket_launch" />
        </div>
      </section>
    </div>
  );
};

const StatCard: React.FC<{value: string, label: string}> = ({value, label}) => (
  <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-primary/50 transition-colors">
    <span className="text-4xl font-bold text-white">{value}</span>
    <span className="text-sm font-medium text-slate-400">{label}</span>
  </div>
);

const JobItem: React.FC<{role: string, company: string, loc: string, year: string, icon: string}> = ({role, company, loc, year, icon}) => (
  <div className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-surface p-6 transition-all hover:border-primary/30 md:flex-row md:items-center md:gap-8 md:p-8">
    <div className="flex h-16 w-16 min-w-[64px] items-center justify-center rounded-2xl bg-background-dark border border-white/5 text-white">
      <span className="material-symbols-outlined text-3xl">{icon}</span>
    </div>
    <div className="flex flex-1 flex-col gap-1">
      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{role}</h3>
      <p className="text-base text-slate-400">{company} • {loc}</p>
    </div>
    <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-white w-fit">{year}</span>
  </div>
);

export default About;
