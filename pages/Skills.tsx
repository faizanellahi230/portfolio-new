
import React from 'react';

const Skills: React.FC = () => {
  const tools = [
    {
      name: "Blender",
      desc: "Comprehensive 3D workflow including modeling, animation, shading, lighting, rendering, and node-based compositing for professional results.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/2560px-Blender_logo_no_text.svg.png",
      tags: ['Geometry Nodes', 'Cycles X', 'Hard Surface'],
      progress: '95%'
    },
    {
      name: "Unreal Engine 5",
      desc: "Real-time environment setup, lighting, materials, cinematic rendering, and asset integration for interactive and high-quality visual outputs.",
      img: "/Unreal Engine.png",
      tags: ['Lumen', 'Niagara', 'Blueprints'],
      progress: '90%'
    },
    {
      name: "ZBrush",
      desc: "High-resolution sculpting, detailing, and character/asset development with strong focus on anatomy, form, and surface refinement.",
      img: "/ZBrush_icon.svg",
      tags: ['Sculpting', 'Dynamesh', 'Polypaint'],
      progress: '85%'
    },
    {
      name: "Substance Painter",
      desc: "Physically based texturing (PBR), smart materials, texture baking, and detailed surface wear for production-ready assets.",
      img: "/substance-3d-painter-64.svg",
      tags: ['PBR', 'Baking', 'Smart Materials'],
      progress: '90%'
    },
    {
      name: "3Ds Max",
      desc: "Hard-surface and architectural modeling, scene setup, and rendering with clean topology and efficient workflows.",
      img: "/3ds-max.svg",
      tags: ['Modeling', 'UV Mapping', 'Arnold'],
      progress: '80%'
    },
    {
      name: "Marmoset Toolbag",
      desc: "Real-time rendering, lighting, texture previewing, and high-quality asset presentation for portfolios and client reviews.",
      img: "/Marmoset.png",
      tags: ['Baking', 'RTX Rendering', 'Lookdev'],
      progress: '85%'
    },
    {
      name: "Rizom UV",
      desc: "Advanced UV unwrapping, packing, and optimization for clean, distortion-free UV layouts suitable for game and production pipelines.",
      img: "/Rizom UV.svg",
      tags: ['Unwrap', 'Packing', 'Optimization'],
      progress: '90%'
    },
    {
      name: "Twinmotion",
      desc: "Real-time architectural visualization, scene composition, lighting, and fast client-ready presentations.",
      img: "https://logo.svgcdn.com/simple-icons/twinmotion-dark.svg",
      tags: ['ArchViz', 'Lumen', 'Fast Rendering'],
      progress: '85%'
    },
    {
      name: "Photoshop",
      desc: "Texture editing, matte painting, post-processing, and visual enhancements for renders and digital assets.",
      img: "/Adobe-Photoshop-Logo.png",
      tags: ['Compositing', 'Textures', 'Post'],
      progress: '95%'
    },
  ];

  return (
    <div className="min-h-screen w-full pt-32 px-6 md:px-20 pb-24 overflow-y-auto no-scrollbar">

      {/* Cinematic Header */}
      <header className="mb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-4 text-primary group cursor-default">
              <span className="h-px w-12 bg-primary transition-all group-hover:w-20"></span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase italic">The Arsenal</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.8] uppercase tracking-wide">
              DIGITAL <br />
              <span className="text-white/20 font-black">WEAPONRY</span>
            </h1>
            <p className="text-white/40 text-sm md:text-lg max-w-xl font-medium leading-relaxed tracking-wide">
              A specialized collection of industry-leading software utilized to define the next generation of 3D artistry and metaverse experiences.
            </p>
          </div>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1920px] mx-auto">
        {tools.map((tool, i) => (
          <div key={tool.name} className="group relative min-h-[20rem] bg-white/[0.03] backdrop-blur-md rounded-[2.5rem] border border-white/10 p-8 flex flex-col justify-between overflow-hidden hover:border-primary/40 hover:shadow-[0_0_40px_rgba(6,249,241,0.05)] transition-all duration-700">

            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Top Section */}
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-xl group-hover:bg-white/10 transition-colors border border-white/5">
                  <img src={tool.img} className="w-8 h-8 object-contain grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500" alt={tool.name} />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-primary transition-colors">{tool.name}</h3>
                <p className="text-white/40 text-xs leading-relaxed font-medium tracking-wide">{tool.desc}</p>
              </div>
            </div>

            {/* Bottom Section: Tags */}
            <div className="relative z-10 flex flex-wrap gap-2 mt-6">
              {tool.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-white/5 rounded-lg text-[9px] uppercase font-bold text-white/40 border border-white/5 group-hover:border-primary/20 group-hover:text-white transition-all">
                  {tag}
                </span>
              ))}
            </div>

            {/* Decorative Background Icon */}
            <img
              src={tool.img}
              className="absolute -bottom-10 -right-10 w-48 h-48 object-contain opacity-[0.02] grayscale group-hover:grayscale-0 group-hover:opacity-[0.08] transition-all duration-1000 rotate-12 group-hover:rotate-0 group-hover:scale-110 pointer-events-none"
              alt=""
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Skills;
