
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full px-6 md:px-12 py-8 flex justify-center border-t border-white/10 mt-20">
      <div className="max-w-[1200px] w-full flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>© 2024 Designer Portfolio. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="hover:text-primary transition-colors" href="#">Twitter</a>
          <a className="hover:text-primary transition-colors" href="#">LinkedIn</a>
          <a className="hover:text-primary transition-colors" href="#">Instagram</a>
          <a className="hover:text-primary transition-colors" href="#">Dribbble</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
