
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row">
      <div className="w-full lg:w-5/12 p-6 lg:p-16 flex flex-col justify-between gap-12 border-r border-transparent lg:border-white/10">
        <div className="space-y-6">
          <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tighter">
            Got a project?<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">Let's talk.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-md">I'm currently available for freelance work and open to collaboration. Tell me about your ideas.</p>
        </div>
        
        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-2">Email Me</p>
            <a href="mailto:hello@designer.com" className="text-2xl font-bold hover:text-primary transition-colors flex items-center gap-2 group">
              hello@designer.com
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-primary">arrow_outward</span>
            </a>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-2">Office</p>
            <p className="text-xl font-medium">123 Design Avenue<br/>New York, NY 10012</p>
          </div>
          <div className="flex gap-4">
            {['globe', 'photo_camera', 'mail'].map(icon => (
              <a key={icon} href="#" className="size-12 rounded-full border border-[#2f6a68] flex items-center justify-center hover:bg-primary hover:text-background-dark hover:border-primary transition-all duration-300 group">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">{icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-7/12 p-6 lg:p-16 flex flex-col justify-center">
        <form className="w-full max-w-2xl mx-auto space-y-8" onSubmit={e => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Your Name" placeholder="Jane Doe" type="text" />
            <Input label="Your Email" placeholder="jane@example.com" type="email" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Service required</h3>
            <div className="flex flex-wrap gap-3">
              {["Web Design", "Development", "Branding", "Strategy"].map(s => (
                <label key={s} className="cursor-pointer">
                  <input className="peer sr-only" name="service" type="checkbox"/>
                  <div className="px-6 py-3 rounded-full border border-[#2f6a68] bg-[#183534] text-slate-300 hover:border-primary/50 peer-checked:bg-primary peer-checked:text-background-dark peer-checked:font-bold peer-checked:border-primary transition-all select-none">
                    {s}
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium ml-4 text-slate-300">Project Details</span>
            <textarea className="w-full h-40 p-6 rounded-3xl bg-[#183534] border border-[#2f6a68] focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none resize-none placeholder:text-[#8eccca]/50 text-base" placeholder="Tell me a bit about your project..."></textarea>
          </div>
          <div className="pt-4 flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm">
              <span className="material-symbols-outlined text-lg">info</span>
              <span>Usually responds within 24h</span>
            </div>
            <button className="group flex items-center gap-3 bg-primary text-background-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,249,241,0.2)] w-full sm:w-auto justify-center">
              Send Inquiry <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input: React.FC<{label: string, placeholder: string, type: string}> = ({label, placeholder, type}) => (
  <label className="flex flex-col gap-2">
    <span className="text-sm font-medium ml-4 text-slate-300">{label}</span>
    <input className="w-full h-14 px-6 rounded-full bg-[#183534] border border-[#2f6a68] focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none placeholder:text-[#8eccca]/50" placeholder={placeholder} type={type}/>
  </label>
);

export default Contact;
