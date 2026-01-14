
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col lg:flex-row pt-32 overflow-y-auto no-scrollbar">

      {/* Contact Info Sidebar */}
      <div className="w-full lg:w-5/12 p-10 lg:p-24 flex flex-col justify-between gap-16">
        <div className="space-y-10">
          <div className="space-y-4">
            <span className="text-primary font-mono text-[10px] tracking-[0.5em] uppercase italic px-2 border-l border-primary">Availability</span>
            <p className="text-white/60 text-sm font-medium tracking-wide">Currently accepting high-end 3D & Motion commissions.</p>
          </div>

          <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase">
            Start a <br />
            <span className="text-white/20">Project</span>
          </h1>

          <p className="text-white/40 text-lg leading-relaxed max-w-sm tracking-wide">
            Ready to bring your vision to life? Let's discuss your next digital masterpiece.
          </p>
        </div>

        <div className="space-y-12">
          <div className="group cursor-pointer">
            <span className="text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase block mb-4">Direct Communication</span>
            <a href="mailto:faizanellahi23@gmail.com" className="text-2xl font-black text-white hover:text-primary transition-all flex items-center gap-3">
              FAIZANELLAHI23@GMAIL.COM
              <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">north_east</span>
            </a>
          </div>

          <div className="flex gap-4">
            {[
              { name: 'ArtStation', link: '#' },
              { name: 'LinkedIn', link: 'https://www.linkedin.com/in/faizan--ellahi/' },
              { name: 'Behance', link: '#' }
            ].map(social => (
              <a key={social.name} href={social.link} className="px-6 py-2 rounded-full border border-white/10 text-[10px] font-bold text-white/40 tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all">
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Cinematic Form Container */}
      <div className="w-full lg:w-7/12 bg-white/[0.02] border-l border-white/5 p-10 lg:p-24 flex items-center">
        <form className="w-full max-w-2xl space-y-12" onSubmit={e => e.preventDefault()}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <LuxuryInput label="YOUR IDENTITY" placeholder="Enter your name" type="text" />
            <LuxuryInput label="DIGITAL ADDRESS" placeholder="Enter your email" type="email" />
          </div>

          <div className="space-y-6">
            <label className="text-[10px] font-black text-white/30 tracking-[0.3em] uppercase ml-2">SPECIFIC EXPERTISE</label>
            <div className="flex flex-wrap gap-3">
              {["3D Character", "Environment", "Motion Design", "Metaverse", "Product Render"].map(s => (
                <label key={s} className="cursor-pointer group">
                  <input className="peer sr-only" name="service" type="checkbox" />
                  <div className="px-8 py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[10px] font-bold tracking-widest text-white/40 hover:border-primary/50 peer-checked:bg-white peer-checked:text-black peer-checked:border-white transition-all uppercase">
                    {s}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-white/30 tracking-[0.3em] uppercase ml-2">PROJECT BRIEF</label>
            <textarea className="w-full h-48 p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-md border border-white/10 focus:border-primary focus:ring-0 transition-all outline-none resize-none placeholder:text-white/10 text-white font-medium" placeholder="Describe the masterpiece you have in mind..."></textarea>
          </div>

          <div className="flex items-center justify-between gap-8 pt-8">
            <button className="flex-1 md:flex-none group flex items-center justify-center gap-6 bg-white text-black px-12 py-6 rounded-full font-black text-[10px] tracking-[0.4em] uppercase hover:bg-primary transition-all">
              Initiate Inquiry
              <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
            <div className="hidden md:block">
              <p className="text-[10px] font-bold text-white/20 tracking-widest italic flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary animate-pulse"></span>
                ACTIVE RESPONSE WITHIN 24H
              </p>
            </div>
          </div>

        </form>
      </div>

    </div>
  );
};

const LuxuryInput: React.FC<{ label: string, placeholder: string, type: string }> = ({ label, placeholder, type }) => (
  <div className="space-y-3 group">
    <label className="text-[10px] font-black text-white/30 tracking-[0.3em] uppercase ml-2 group-focus-within:text-primary transition-colors">{label}</label>
    <input className="w-full h-16 px-8 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 focus:border-primary focus:ring-0 transition-all outline-none placeholder:text-white/10 text-white font-medium italic" placeholder={placeholder} type={type} />
  </div>
);

export default Contact;
