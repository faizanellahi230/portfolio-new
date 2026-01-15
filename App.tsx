
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import GravityParticles from './components/GravityParticles';
import { Navigate } from 'react-router-dom';

// Admin Imports
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProjectsManager from './pages/admin/ProjectsManager';
import SkillsManager from './pages/admin/SkillsManager';
import ContentManager from './pages/admin/ContentManager';
import Messages from './pages/admin/Messages';
import AdminLayout from './layouts/AdminLayout';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {!location.pathname.startsWith('/admin') && <GravityParticles />}
      {!location.pathname.startsWith('/admin') && <Navbar />}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <div key={location.pathname} className="h-full w-full">
            <Routes location={location}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
              <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="projects" element={<ProjectsManager />} />
                <Route path="skills" element={<SkillsManager />} />
                <Route path="content" element={<ContentManager />} />
                <Route path="messages" element={<Messages />} />
              </Route>
            </Routes>
          </div>
        </AnimatePresence>
      </main>

      {/* Background Decorative Elements */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC3Hd6DGTg5qYIFon11goZIxdDcKmLGS6biCY0UoR8rXnqcleeNhR5XIuVUB990iO7CSED4PRKbKq3exeJPNNnny2Xb44sySOaV-ecyoSUhhzmEDB4-pSp12I9q72d5fbp9IxD1t60th5WQbQmwP6qU2M4zpsiG3Kx3y623iyMbera2aCXqyZS_2fg1xqR-h8VPMx6pnZIbkRhy-Z91tcSnvHIjeQGKR20jXpjDRJYedeqwN-Ro5JoCFdQDvBmFScAbnd_W5Pgvr3yC")' }}></div>
      <div className="pointer-events-none fixed top-[-20%] right-[-10%] z-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]"></div>
      <div className="pointer-events-none fixed bottom-[-10%] left-[-10%] z-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]"></div>
    </div>
  );
};

export default App;
