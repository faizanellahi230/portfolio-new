
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
        {/* Removed additional black overlay to brighten the hero */}
        <img
          src="/Home_PAge.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full w-full mx-auto px-6 md:px-20 pb-12 flex flex-col justify-end">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 w-full">

          {/* Bottom Left: Title */}
          <div className="space-y-4 w-full md:max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium text-white tracking-wide uppercase">Available for work</span>
            </div>

            <h1 className="text-white text-4xl md:text-7xl font-black leading-[0.9] tracking-tighter mix-blend-overlay opacity-90">
              3D ARTIST<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">MOTION DESIGNER</span>
            </h1>
            <p className="text-slate-300 text-sm font-bold tracking-[0.2em] uppercase pl-2">Pakistan</p>
          </div>

          {/* Bottom Right: Description & Actions */}
          <div className="flex flex-col gap-8 max-w-md w-full">
            <p className="text-slate-300 text-lg leading-relaxed border-l-2 border-primary/50 pl-6">
              Building digital experiences that matter. Focusing on motion, interaction, and visual storytelling.
            </p>

            <div className="flex gap-4">
              <Link to="/projects" className="group h-14 px-8 rounded-full bg-white text-background-dark font-bold text-lg flex items-center justify-center hover:bg-primary transition-colors">
                Projects
              </Link>
              <Link to="/about" className="group h-14 px-8 rounded-full border border-white/20 text-white font-bold text-lg flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur">
                Showreel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Home;
