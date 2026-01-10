
import React from 'react';

const Skills: React.FC = () => {
  const coreCompetencies = [
    { name: "UI/UX Design", icon: "palette", primary: true },
    { name: "Front-end Dev", icon: "code" },
    { name: "Interaction Design", icon: "animation" },
    { name: "Motion Graphics", icon: "rocket_launch" },
  ];

  const secondarySkills = ["React", "Three.js / WebGL", "Tailwind CSS", "TypeScript", "Node.js", "Design Systems", "Prototyping", "Blender 3D"];

  const toolset = [
    { name: "Figma", desc: "Primary tool for UI/UX and rapid prototyping.", icon: "design_services", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyRqa_8KC3AV6h_Ju2jmdblpSLNtIfHKJmoaOqtdlyIeAOb5hLb9Puf-n2t26sL5D1LrX1MonUbd0E6tSaCqnyn1FyLjly-SjUXmolWtjyaIJMptfnS9_-dvWpd6Cipu0hQnl8KQ2hTnuZJBEOPxfkEt6N2rffb8Rs0svjkPw3a1Wx4PA1eStm2q55mMFlqDkxdtRcHqpe3x71it4jGYfIUkfQ92e-Qzb9YnQ1hzUxY0R8FiBSGVDMGlS4nCnk7DAnkbcMMPS-TJge" },
    { name: "React", desc: "Building complex, interactive web applications.", icon: "code_blocks", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDvfXqKnOq0N2zjo82UA1STlnUIIfY2Ho8L2hKx0jx2n4l9hBph41xfSmFYdj7yzjeovjOYpvIKRwRJNvT_mZepl-iuT4zEsuKecvXpgg4_NNhc-1k394tNR_q2wisSU0UjRTL5cbyOIfJP81CX-roRNOwi9DGL0FW5rX15sQkXXy8BhbxMJWvzjHN8nJ92WbeiOmJVwQxGFddYCfvqv56lwPLbJ2HaTGcH8t9mny0S8F6Rux6hTPSJNXvcw64cI7eXc0o2UFvYQsf" },
    { name: "After Effects", desc: "Advanced motion graphics and Lottie animations.", icon: "movie_filter", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxltNUChUREigNs5lJYYn8WKp4UjSmantVcbbvGERq1d75IGiRzwq59Svl5tSNZucbtpkWjZ7NwSVnjg2PnERnYEqZc23EZ-IJxlYDVPYzwbBf-HdsFFGTN6dW_TXGQUBpz3K8PdumY0iTNr58Q6f0PRbLZR2v_KwfZ0tI2zlvIz0x1oNPs8K7SZBIzpQwnweEed-UKv2eNaFlz2ECTyG4Z71SEpve6B5jKUhDrrf8zihhsJb7N_hx_ENF5GRwLTWpUx5nf5LvZYJr" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-20 py-12">
      <section className="flex flex-col gap-6 mb-16">
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-[-0.033em]">
          Expertise <br/><span className="text-primary/90">& Toolset.</span>
        </h1>
        <p className="text-accent-text text-lg md:text-xl max-w-md leading-relaxed">
          Bridging the gap between aesthetic purity and functional code. My approach combines brutalist layouts with refined interactions.
        </p>
      </section>

      <section className="mb-20">
        <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8 ml-1">Core Competencies</h3>
        <div className="flex flex-wrap gap-4">
          {coreCompetencies.map((skill) => (
            <div 
              key={skill.name} 
              className={`group flex h-12 md:h-14 shrink-0 items-center justify-center gap-x-3 rounded-full px-6 md:px-8 border transition-all duration-300 cursor-default
                ${skill.primary ? 'bg-white text-background-dark border-white hover:bg-primary hover:border-primary' : 'bg-surface text-white border-white/5 hover:border-primary/50 hover:bg-surface/80'}`}
            >
              <span className={`material-symbols-outlined text-[20px] ${!skill.primary && 'text-primary'}`}>{skill.icon}</span>
              <p className={`text-base md:text-lg font-bold`}>{skill.name}</p>
            </div>
          ))}
          {secondarySkills.map(skill => (
            <div key={skill} className="flex h-12 md:h-14 shrink-0 items-center justify-center gap-x-2 rounded-full border border-white/10 px-5 hover:border-white/30 transition-colors cursor-default">
              <p className="text-white/80 text-sm md:text-base font-medium">{skill}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Featured Toolset</h3>
          <div className="flex gap-2">
            <button className="size-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-background-dark transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </button>
            <button className="size-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-background-dark transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-6 pb-4">
          {toolset.map((tool) => (
            <div key={tool.name} className="group flex-none w-[300px] aspect-[4/3] bg-surface rounded-xl p-6 flex flex-col justify-between border border-white/5 hover:border-primary/40 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-white">{tool.icon}</span>
              </div>
              <div className="size-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 backdrop-blur-md">
                <div className="w-full h-full bg-center bg-contain bg-no-repeat p-2" style={{backgroundImage: `url("${tool.img}")`}}></div>
              </div>
              <div>
                <h4 className="text-white text-xl font-bold mb-1">{tool.name}</h4>
                <p className="text-white/60 text-sm">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Skills;
