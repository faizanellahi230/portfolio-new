
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 z-50 w-full px-6 py-8 md:px-20 pointer-events-none transition-all duration-300 bg-black/5 backdrop-blur-xl">
      <nav className="pointer-events-auto w-full flex items-center justify-between">
        {/* Left Side: Branding */}
        <div className="flex flex-col gap-0.5">
          <Link to="/" className="text-sm font-black text-white tracking-[0.2em] hover:text-primary transition-colors uppercase">
            Faizan Ellahi
          </Link>
          <span className="text-[10px] font-bold text-white/30 tracking-[0.3em] uppercase">3D Artist & Motion Designer</span>
        </div>

        {/* Right Side: Links & Contact */}
        <div className="flex items-center gap-12">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            <Link to="/projects" className="text-[10px] font-bold text-white/60 tracking-[0.2em] hover:text-primary transition-colors uppercase">Projects</Link>
            <Link to="/skills" className="text-[10px] font-bold text-white/60 tracking-[0.2em] hover:text-primary transition-colors uppercase">Skills</Link>
            <Link to="/about" className="text-[10px] font-bold text-white/60 tracking-[0.2em] hover:text-primary transition-colors uppercase">About</Link>
          </div>

          <div className="flex items-center gap-8">
            <Link to="/contact" className="hidden md:flex items-center justify-center h-11 px-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:border-white transition-all">
              Contact Me
            </Link>

            <button className="text-[10px] font-bold text-white/30 hover:text-white transition-colors uppercase hidden md:block tracking-widest">
            </button>

            <button
              className="md:hidden text-white pointer-events-auto"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-24 left-6 right-6 bg-surface border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl pointer-events-auto md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-lg font-bold hover:text-primary uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
