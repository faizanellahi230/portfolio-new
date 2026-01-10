
import React from 'react';

const Skills: React.FC = () => {
  const tools = [
    {
      name: "Blender",
      desc: "Modeling, animation, and node-based compositing.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/2560px-Blender_logo_no_text.svg.png",
      tags: ['Geometry Nodes', 'Cycles X', 'Hard Surface'],
      progress: '95%'
    },
    {
      name: "Unreal Engine 5",
      desc: "Real-time rendering, blueprints, and virtual production.",
      img: "/Unreal Engine.png",
      tags: ['Blueprints', 'Lumen', 'Niagara'],
      progress: '90%'
    },
    {
      name: "ZBrush",
      desc: "Digital sculpting and high-poly character creation.",
      img: "/ZBrush_icon.svg",
      tags: ['Sculpting', 'Dynamesh', 'Polypaint'],
      progress: '85%'
    },
    {
      name: "Substance Painter",
      desc: "Advanced texturing and material creation.",
      img: "/substance-3d-painter-64.svg",
      tags: ['PBR', 'Smart Materials', 'Baking'],
      progress: '90%'
    },
    {
      name: "3Ds Max",
      desc: "Professional 3D modeling and rendering.",
      img: "/3ds-max.svg",
      tags: ['Modeling', 'UV Mapping', 'Arnold'],
      progress: '80%'
    },
    {
      name: "Marmoset Toolbag",
      desc: "Real-time lookdev, baking, and rendering.",
      img: "/Marmoset.png",
      tags: ['Baking', 'RTX Rendering', 'Lookdev'],
      progress: '85%'
    },
    {
      name: "Rizom UV",
      desc: "Industrial strength UV mapping and unfolding.",
      img: "/Rizom UV.svg",
      tags: ['Unwrap', 'Packing', 'Optimization'],
      progress: '90%'
    },
    {
      name: "Photoshop",
      desc: "Post-processing, texturing, and matte painting.",
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
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.8] uppercase">
              DIGITAL <br />
              <span className="text-white/20 font-black">WEAPONRY</span>
            </h1>
            <p className="text-white/40 text-sm md:text-lg max-w-xl font-medium leading-relaxed">
              A specialized collection of industry-leading software utilized to define the next generation of 3D artistry and metaverse experiences.
            </p>
          </div>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1920px] mx-auto">
        {tools.map((tool, i) => (
          <div key={tool.name} className="group relative h-[24rem] bg-white/[0.03] backdrop-blur-md rounded-[2.5rem] border border-white/10 p-8 flex flex-col justify-between overflow-hidden hover:border-primary/40 hover:shadow-[0_0_40px_rgba(6,249,241,0.05)] transition-all duration-700">

            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Top Section */}
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-xl group-hover:bg-white/10 transition-colors border border-white/5">
                  <img src={tool.img} className="w-8 h-8 object-contain grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500" alt={tool.name} />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-primary transition-colors">{tool.name}</h3>
                <p className="text-white/40 text-xs leading-relaxed line-clamp-2 font-medium">{tool.desc}</p>
              </div>

              {/* Software Progress Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                  <span>Mastery Level</span>
                  <span className="text-primary italic">{tool.progress}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                    style={{ width: tool.progress }}
                  ></div>
                </div>
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
