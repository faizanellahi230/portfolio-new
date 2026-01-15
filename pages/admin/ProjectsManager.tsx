import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Project {
    id: string;
    title: string;
    description_short: string;
    category: string;
    thumbnail_url: string;
    tools: string[];
    tags?: string[];
    created_at?: string;
}

const ProjectsManager: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({});

    // Filtering State
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setProjects(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (!error) fetchProjects();
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const projectData = {
            title: currentProject.title,
            description_short: currentProject.description_short,
            category: currentProject.category,
            thumbnail_url: currentProject.thumbnail_url,
            tools: typeof currentProject.tools === 'string' ? (currentProject.tools as string).split(',').map((t: string) => t.trim()) : currentProject.tools,
        };

        let error;
        if (currentProject.id) {
            const res = await supabase.from('projects').update(projectData).eq('id', currentProject.id);
            error = res.error;
        } else {
            const res = await supabase.from('projects').insert([projectData]);
            error = res.error;
        }

        if (!error) {
            setIsEditing(false);
            setCurrentProject({});
            fetchProjects();
        } else {
            alert('Error saving project: ' + error.message);
        }
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = categoryFilter === 'All' || project.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', '3D Scene', 'Character', 'Motion', 'Environment', 'Product', 'VFX', 'Branding'];

    return (
        <div className="min-h-screen text-slate-900 dark:text-slate-100 font-display">
            <style>{`
                .glass-modal {
                    background: rgba(16, 34, 34, 0.95);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(6, 249, 241, 0.2);
                }
                .upload-dashed {
                    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23333' stroke-width='2' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
                }
                 .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(6, 249, 241, 0.2);
                    border-radius: 10px;
                }
            `}</style>

            {/* Main Content Area */}
            <div>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Manage Library</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white">
                            Project <span className="text-slate-400 dark:text-white/20">Archive</span>
                        </h2>
                    </div>
                    <button
                        onClick={() => { setCurrentProject({}); setIsEditing(true); }}
                        className="flex items-center justify-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-primary transition-all active:scale-95 shadow-xl shadow-primary/10"
                    >
                        <span className="material-icons-round">add</span>
                        ADD NEW PROJECT
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col xl:flex-row gap-4 mb-8">
                    <div className="relative flex-1 group">
                        <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-white placeholder:text-slate-500"
                            placeholder="Search projects by name, tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border ${categoryFilter === cat ? 'bg-primary text-black border-primary' : 'bg-white/5 border-white/10 text-slate-400 hover:border-primary hover:bg-white/10'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(6,249,241,0.2)]">
                            <div className="aspect-video overflow-hidden relative">
                                {project.thumbnail_url ? (
                                    <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20">No Image</div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <div className="flex gap-2">
                                        <button onClick={() => { setCurrentProject(project); setIsEditing(true); }} className="bg-white text-black p-3 rounded-full hover:bg-primary transition-colors" title="Edit">
                                            <span className="material-icons-round text-[20px]">edit</span>
                                        </button>
                                        <button onClick={() => handleDelete(project.id)} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors" title="Delete">
                                            <span className="material-icons-round text-[20px]">delete_outline</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold uppercase tracking-tight truncate pr-4 text-white">{project.title}</h3>
                                    <span className="text-[10px] font-bold tracking-widest text-primary border border-primary/30 px-2 py-0.5 rounded">
                                        {project.created_at ? new Date(project.created_at).getFullYear() : '2024'}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <span className="bg-white/5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded text-slate-400">{project.category}</span>
                                    {project.tools.slice(0, 2).map((tool, i) => (
                                        <span key={i} className="bg-white/5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded text-slate-400">{tool}</span>
                                    ))}
                                    {project.tools.length > 2 && (
                                        <span className="bg-white/5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded text-slate-400">+{project.tools.length - 2}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Project Placeholder Card */}
                    <button
                        onClick={() => { setCurrentProject({}); setIsEditing(true); }}
                        className="group flex flex-col items-center justify-center gap-4 min-h-[300px] border-2 border-dashed border-white/10 rounded-2xl hover:border-primary transition-all hover:bg-primary/5"
                    >
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                            <span className="material-icons-round">add</span>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">Upload New Project</p>
                    </button>
                </div>

                {/* Footer Stats */}
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-[#1A2222] flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex gap-12">
                        <div>
                            <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase mb-1">Total Projects</p>
                            <p className="text-2xl font-extrabold text-white">{projects.length}<span className="text-primary text-sm">+</span></p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase mb-1">Storage Used</p>
                            <p className="text-2xl font-extrabold text-white">8.4<span className="text-slate-500 dark:text-white/20 text-sm">GB</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Overlay (Reused from previous step logic) */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="glass-modal w-full max-w-[800px] max-h-[90vh] rounded-xl flex flex-col shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <span className="material-icons-round text-primary text-2xl">rocket_launch</span>
                                <h2 className="text-white text-2xl font-bold tracking-tight">{currentProject.id ? 'Edit Project' : 'Add New Project'}</h2>
                            </div>
                            <button onClick={() => setIsEditing(false)} className="text-white/50 hover:text-white transition-colors">
                                <span className="material-icons-round">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <form id="projectForm" onSubmit={handleSave} className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-primary/80 uppercase tracking-widest">Project Media (URL)</label>
                                    <div className="upload-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer group">
                                        <div className="w-full">
                                            <input className="w-full bg-transparent border-b border-primary/30 text-center text-white placeholder:text-white/20 focus:border-primary outline-none py-2 transition-all" placeholder="Paste Image URL here..." value={currentProject.thumbnail_url || ''} onChange={e => setCurrentProject({ ...currentProject, thumbnail_url: e.target.value })} />
                                        </div>
                                        {currentProject.thumbnail_url && <img src={currentProject.thumbnail_url} alt="Preview" className="h-32 object-contain rounded-lg shadow-lg border border-white/10" />}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-slate-400">Project Title</label>
                                        <input className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder:text-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="e.g. Cybernetic Dreams 2024" value={currentProject.title || ''} onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })} required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-slate-400">Category</label>
                                        <div className="relative">
                                            <select className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white appearance-none focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer" value={currentProject.category || ''} onChange={e => setCurrentProject({ ...currentProject, category: e.target.value })} required>
                                                <option className="bg-[#0D1212]" value="">Select Category</option>
                                                {categories.filter(c => c !== 'All').map(c => <option key={c} value={c} className="bg-[#0D1212]">{c}</option>)}
                                            </select>
                                            <span className="material-icons-round absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-400">Project Description</label>
                                    <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder:text-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" placeholder="Write a brief overview..." rows={4} value={currentProject.description_short || ''} onChange={e => setCurrentProject({ ...currentProject, description_short: e.target.value })}></textarea>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-400">Tags (Tools used)</label>
                                    <input className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder:text-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Cinema4D, Octane..." value={Array.isArray(currentProject.tools) ? currentProject.tools.join(', ') : currentProject.tools || ''} onChange={e => setCurrentProject({ ...currentProject, tools: e.target.value.split(',') })} />
                                </div>
                            </form>
                        </div>
                        <div className="px-8 py-6 bg-black/40 border-t border-white/10 flex justify-end items-center gap-4">
                            <button onClick={() => setIsEditing(false)} className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-white transition-colors">Cancel</button>
                            <button type="submit" form="projectForm" className="px-8 py-2.5 bg-primary text-black text-sm font-black rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                                <span className="material-icons-round">send</span> {currentProject.id ? 'UPDATE' : 'PUBLISH'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsManager;
