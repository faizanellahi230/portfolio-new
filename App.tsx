
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Background Decorative Elements */}
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC3Hd6DGTg5qYIFon11goZIxdDcKmLGS6biCY0UoR8rXnqcleeNhR5XIuVUB990iO7CSED4PRKbKq3exeJPNNnny2Xb44sySOaV-ecyoSUhhzmEDB4-pSp12I9q72d5fbp9IxD1t60th5WQbQmwP6qU2M4zpsiG3Kx3y623iyMbera2aCXqyZS_2fg1xqR-h8VPMx6pnZIbkRhy-Z91tcSnvHIjeQGKR20jXpjDRJYedeqwN-Ro5JoCFdQDqBmFScAbnd_W5Pgvr3yC")'}}></div>
        <div className="pointer-events-none fixed top-[-20%] right-[-10%] z-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="pointer-events-none fixed bottom-[-10%] left-[-10%] z-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]"></div>
      </div>
    </Router>
  );
};

export default App;
