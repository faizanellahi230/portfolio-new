
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Work', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-6 md:px-12 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-[1200px] flex items-center justify-between whitespace-nowrap bg-surface/80 backdrop-blur-md border border-[#214a49] rounded-full px-6 py-3 shadow-lg transition-all duration-300">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-8 flex items-center justify-center bg-primary rounded-full text-background-dark">
            <span className="material-symbols-outlined text-xl font-bold">code</span>
          </div>
          <h2 className="text-white text-lg font-bold tracking-tight">DESIGNER</h2>
        </Link>

        <div className="hidden md:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold transition-colors ${
                location.pathname === link.path ? 'text-primary' : 'text-slate-300 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden md:flex items-center justify-center rounded-full h-10 px-6 bg-primary text-background-dark text-sm font-bold shadow-[0_0_15px_rgba(6,249,241,0.3)] hover:shadow-[0_0_25px_rgba(6,249,241,0.5)] transition-all transform hover:-translate-y-0.5">
            Let's Talk
          </Link>
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-24 left-6 right-6 bg-surface border border-[#214a49] rounded-2xl p-6 flex flex-col gap-4 shadow-2xl pointer-events-auto md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-lg font-bold hover:text-primary"
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
