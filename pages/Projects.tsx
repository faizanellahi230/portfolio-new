import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', '3D Scene', 'Character', 'Motion', 'Environment', 'Product'];

  const isVideo = (url?: string) => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.webm', '.mov', '.ogg'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };

  /* Supabase Integration */
  useEffect(() => {
    const fetchProjects = async () => {
      const { supabase } = await import('../lib/supabase');
      let { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false });

      if (data) {
        const formattedData = data.map(p => ({
          title: p.title,
          category: p.category,
          desc: p.description_short,
          longDesc: p.description_long,
          img: p.thumbnail_url,
          video: isVideo(p.thumbnail_url) ? p.thumbnail_url : null,
          gallery: p.images ? p.images.map((url: string) => ({
            type: isVideo(url) ? 'video' : 'image',
            url: url
          })) : [],
          year: p.year,
          client: p.client,
          role: p.role
        }));
        setProjects(formattedData);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const filteredProjects = categoryFilter === 'All' ? projects : projects.filter(p => p.category === categoryFilter);

  return (
    <div className="w-full px-6 lg:px-20 py-12 pt-32 h-full overflow-y-auto no-scrollbar">
      <section className="mb-20 flex flex-col lg:flex-row justify-between items-end gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 w-fit mb-4">
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Showcase</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black leading-[0.9] tracking-tight text-white">
            SELECTED <br /><span className="text-white/50">WORKS 2024</span>
          </h1>
        </div>
        <p className="text-accent-text text-xl max-w-md text-right leading-relaxed mb-2">A curated collection of digital experiences focused on clarity and impact.</p>
      </section>

      <div className="flex gap-4 overflow-x-auto pb-12 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`h-12 px-8 rounded-full text-sm font-bold transition-all whitespace-nowrap ${categoryFilter === cat
                ? 'bg-primary text-black'
                : 'bg-white/5 border border-white/10 text-white/70 hover:text-white backdrop-blur-sm'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-20">
        {filteredProjects.map((proj, i) => (
          <article key={i} className="group relative w-full aspect-video bg-white/[0.03] backdrop-blur-md rounded-[3rem] border border-white/10 p-[24px] overflow-hidden transition-all hover:border-primary/50">
            {/* Year Stamp - Visible in the cut corner */}
            <div className="absolute top-8 right-8 z-0">
              <span className="text-white/40 font-mono text-sm tracking-widest">{proj.year || '2024'}</span>
            </div>

            {/* Clipped Image Container */}
            <div
              className="relative h-full w-full overflow-hidden bg-white/5"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 160px) 0, calc(100% - 154px) 2px, calc(100% - 140px) 10px, 100% 150px, 100% 100%, 0 100%)',
                borderRadius: '2rem 0 2rem 2rem',
                WebkitClipPath: 'polygon(0 0, calc(100% - 165px) 0, calc(100% - 154px) 2px, calc(100% - 140px) 10px, calc(100% - 10px) 140px, calc(100% - 2px) 154px, 100% 165px, 100% 100%, 0 100%)'
              }}
            >
              {isVideo(proj.img) ? (
                <video src={proj.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" muted playsInline loop autoPlay />
              ) : (
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${proj.img}')` }}></div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-end justify-between w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-none">{proj.title}</h3>
                    <p className="text-primary font-bold tracking-widest text-xs uppercase">{proj.category}</p>
                  </div>

                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="h-12 px-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-500 delay-75"
                  >
                    See Project
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectOverlay
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectOverlay: React.FC<{ project: any, onClose: () => void }> = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] bg-black overflow-y-auto overflow-x-hidden no-scrollbar"
  >
    {/* Cinematic Hero Section - Fixed Height */}
    <section className="relative w-full h-screen flex items-center overflow-hidden">
      {/* Background Media - Anchored Left with Smooth Edge Blending */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[75%] z-0"
        style={{
          maskImage: 'linear-gradient(to right, black 25%, transparent 95%), linear-gradient(to top, transparent 0%, black 10%)',
          WebkitMaskImage: 'linear-gradient(to right, black 25%, transparent 95%), linear-gradient(to top, transparent 0%, black 10%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
        {project.video ? (
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={project.video} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${project.img}')` }}></div>
        )}
      </div>

      {/* Hero Content - Strategically right-aligned for maximum readability */}
      <div className="relative z-20 w-full h-full max-w-[1920px] mx-auto px-10 lg:px-24 py-20 flex flex-col lg:flex-row justify-between items-start">
        {/* Back Button */}
        <div className="pt-4 lg:pt-0">
          <button
            onClick={onClose}
            className="h-14 w-14 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl text-white flex items-center justify-center hover:bg-white hover:text-black transition-all group pointer-events-auto"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
          </button>
        </div>

        <div className="w-full lg:max-w-2xl mt-12 lg:mt-0 lg:text-right space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-4 text-primary lg:flex-row-reverse">
              <span className="h-px w-12 bg-primary"></span>
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase">{project.category}</span>
            </div>

            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase whitespace-pre-wrap">
              {project.title}
            </h2>

            <p className="text-white/40 text-lg lg:text-xl leading-relaxed max-w-xl lg:ml-auto font-medium tracking-wide">
              {project.longDesc || project.desc}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-white/10 pt-10">
            <MetaItem label="Date" value={project.year} />
            <MetaItem label="Client" value={project.client} />
            <MetaItem label="Role" value={project.role} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 animate-pulse">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Scroll to Explore</span>
        <span className="h-12 w-px bg-white/50"></span>
      </div>
    </section>

    {/* Project Gallery Section - Vertical Scrolling */}
    <section className="relative z-10 w-full px-10 lg:px-24 py-32 space-y-24 bg-black">
      <div className="max-w-5xl mx-auto space-y-24">
        {project.gallery && project.gallery.length > 0 ? project.gallery.map((item: any, i: number) => (
          <div
            key={i}
            className="relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.02] w-full"
          >
            {item.type === 'video' ? (
              <video autoPlay loop muted playsInline className="w-full h-full object-cover aspect-video">
                <source src={item.url} type="video/mp4" />
              </video>
            ) : (
              <img src={item.url} alt={`Gallery ${i}`} className="w-full h-full object-cover aspect-video hover:scale-105 transition-transform duration-1000" />
            )}
          </div>
        )) : (
          <div className="text-center py-20 opacity-20 italic">No additional assets available for this showcase.</div>
        )}
      </div>

      {/* Full Case Study CTA */}
      <div className="py-20 flex flex-col items-center gap-12">
        <div className="h-px w-24 bg-primary/30"></div>
        <button className="group relative h-20 px-16 rounded-full bg-white text-black font-black text-xs tracking-[0.5em] uppercase hover:bg-primary transition-all overflow-hidden border border-white/10">
          <span className="relative z-10">Initiate Full Case Study</span>
          <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </button>
      </div>
    </section>

    {/* Branding Header */}
    <div className="fixed top-12 left-24 hidden lg:block pointer-events-none mix-blend-difference z-[110]">
      <span className="text-white text-[10px] font-black tracking-widest uppercase block">FAIZAN ELLAHI</span>
      <span className="text-white/40 text-[8px] font-bold tracking-widest uppercase">DISCOVERIVE VIEW</span>
    </div>
  </motion.div>
);

const MetaItem: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div>
    <span className="text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase block mb-3 font-mono">[{label}]</span>
    <p className="text-white text-base font-bold tracking-tight uppercase leading-tight">{value}</p>
  </div>
);

export default Projects;
