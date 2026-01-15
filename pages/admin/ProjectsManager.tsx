import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';

interface Project {
    id: string;
    title: string;
    description_short: string;
    description_long?: string;
    category: string;
    thumbnail_url: string;
    images?: string[];
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

    // Tag/Tools Input State
    const [toolInput, setToolInput] = useState('');
    const toolInputRef = useRef<HTMLInputElement>(null);

    // Media Upload State
    const [uploadingHero, setUploadingHero] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);

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
            description_long: currentProject.description_long || '',
            category: currentProject.category,
            thumbnail_url: currentProject.thumbnail_url,
            images: currentProject.images || [],
            tools: currentProject.tools || [],
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
            setToolInput('');
            fetchProjects();
        } else {
            alert('Error saving project: ' + error.message);
        }
    };

    // Media Upload Functions
    const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploadingHero(true);
            const file = e.target.files?.[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_hero.${fileExt}`;
            const filePath = `projects/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
            if (data) {
                setCurrentProject({ ...currentProject, thumbnail_url: data.publicUrl });
            }
        } catch (error: any) {
            alert('Error uploading hero media: ' + error.message);
        } finally {
            setUploadingHero(false);
        }
    };

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploadingGallery(true);
            const files = e.target.files;
            if (!files || files.length === 0) return;

            const newUrls: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}_gallery_${i}.${fileExt}`;
                const filePath = `projects/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('portfolio')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
                if (data) newUrls.push(data.publicUrl);
            }

            setCurrentProject({
                ...currentProject,
                images: [...(currentProject.images || []), ...newUrls]
            });
        } catch (error: any) {
            alert('Error uploading gallery media: ' + error.message);
        } finally {
            setUploadingGallery(false);
        }
    };

    // Tag Operations
    const handleToolKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (toolInput.trim()) {
                const newTools = [...(currentProject.tools || []), toolInput.trim()];
                setCurrentProject({ ...currentProject, tools: newTools });
                setToolInput('');
            }
        } else if (e.key === 'Backspace' && !toolInput && currentProject.tools?.length) {
            const newTools = currentProject.tools.slice(0, -1);
            setCurrentProject({ ...currentProject, tools: newTools });
        }
    };

    const removeTool = (indexToRemove: number) => {
        const newTools = (currentProject.tools || []).filter((_, index) => index !== indexToRemove);
        setCurrentProject({ ...currentProject, tools: newTools });
    };

    const filteredProjects = projects.filter(project => {
        const titleMatch = project.title?.toLowerCase().includes(searchQuery.toLowerCase());
        const toolsMatch = project.tools?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesSearch = titleMatch || toolsMatch;
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
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6, 249, 241, 0.2); border-radius: 10px; }
                
                .tag-container {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 8px;
                    padding: 12px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    min-height: 56px;
                }
                .tag-container:focus-within { border-color: #06f9f1; }
                .tag-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(6, 249, 241, 0.1);
                    border: 1px solid rgba(6, 249, 241, 0.2);
                    color: #06f9f1;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                }
                .tag-remove { cursor: pointer; opacity: 0.6; transition: opacity 0.2s; }
                .tag-remove:hover { opacity: 1; }
                #tag-input {
                    flex: 1;
                    min-width: 120px;
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 0.875rem;
                    outline: none;
                }
            `}</style>

            {/* Main Content Area */}
            <div>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#06f9f1]"></span>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Manage Library</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
                            Project <span className="text-slate-500">Archive</span>
                        </h2>
                    </div>
                    <button
                        onClick={() => { setCurrentProject({}); setToolInput(''); setIsEditing(true); }}
                        className="group bg-white text-black font-bold px-8 py-4 rounded-full text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-primary transition-all shadow-xl shadow-white/5 hover:shadow-primary/20 active:scale-95"
                    >
                        <span className="material-icons-round text-lg group-hover:rotate-90 transition-transform">add</span>
                        ADD NEW PROJECT
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col xl:flex-row gap-4 mb-8">
                    <div className="relative flex-1 group">
                        <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-primary transition-all outline-none text-white placeholder:text-slate-500"
                            placeholder="Search projects..."
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
                        <div key={project.id} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all hover:border-primary/30 hover:shadow-[0_0_30px_-10px_rgba(6,249,241,0.1)]">
                            <div className="aspect-video overflow-hidden relative">
                                {project.thumbnail_url ? (
                                    <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full bg-white/10 flex items-center justify-center text-white/20">NO MEDIA</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <div className="flex gap-2">
                                        <button onClick={() => { setCurrentProject(project); setToolInput(''); setIsEditing(true); }} className="bg-white text-black p-3 rounded-full hover:bg-primary transition-colors">
                                            <span className="material-icons-round">edit</span>
                                        </button>
                                        <button onClick={() => handleDelete(project.id)} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors">
                                            <span className="material-icons-round">delete_outline</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold uppercase tracking-tight text-white">{project.title}</h3>
                                    <span className="text-[10px] font-bold text-primary border border-primary/30 px-2 py-0.5 rounded">
                                        {project.created_at ? new Date(project.created_at).getFullYear() : '2024'}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-white/5 text-[9px] font-bold uppercase px-2 py-1 rounded text-slate-400 border border-white/5">{project.category}</span>
                                    {project.tools?.slice(0, 3).map((tool, i) => (
                                        <span key={i} className="bg-white/5 text-[9px] font-bold uppercase px-2 py-1 rounded text-primary border border-primary/10">{tool}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => { setCurrentProject({}); setToolInput(''); setIsEditing(true); }}
                        className="group flex flex-col items-center justify-center gap-4 min-h-[300px] border-2 border-dashed border-white/10 rounded-2xl hover:border-primary transition-all hover:bg-primary/5"
                    >
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                            <span className="material-icons-round">add</span>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">Create New Project</p>
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="glass-modal w-full max-w-[700px] max-h-[90vh] rounded-3xl flex flex-col shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-white/5">
                            <h2 className="text-white text-xl font-extrabold tracking-tight uppercase">{currentProject.id ? 'Edit Mission' : 'New Deployment'}</h2>
                            <button onClick={() => setIsEditing(false)} className="text-white/50 hover:text-white transition-colors">
                                <span className="material-icons-round">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <form id="projectForm" onSubmit={handleSave} className="space-y-8">
                                {/* Media Upload Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Hero Media */}
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex justify-between">
                                            Hero Media (Thumb)
                                            {uploadingHero && <span className="text-primary animate-pulse">Uploading...</span>}
                                        </label>
                                        <div className="aspect-video bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                                            {currentProject.thumbnail_url ? (
                                                <>
                                                    <img src={currentProject.thumbnail_url} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                        <label htmlFor="hero-upload" className="cursor-pointer bg-white text-black text-[10px] font-bold px-4 py-2 rounded-lg hover:bg-primary transition-colors">CHANGE</label>
                                                        <button type="button" onClick={() => setCurrentProject({ ...currentProject, thumbnail_url: '' })} className="bg-red-500 text-white text-[10px] font-bold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">REMOVE</button>
                                                    </div>
                                                </>
                                            ) : (
                                                <label htmlFor="hero-upload" className="cursor-pointer flex flex-col items-center gap-2 group-hover:text-primary transition-colors">
                                                    <span className="material-icons-round text-3xl">add_photo_alternate</span>
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">Add Hero Media</span>
                                                </label>
                                            )}
                                            <input type="file" id="hero-upload" accept="image/*,video/*" onChange={handleHeroUpload} className="hidden" />
                                        </div>
                                    </div>

                                    {/* Gallery Media */}
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex justify-between">
                                            Gallery (Multiple)
                                            {uploadingGallery && <span className="text-primary animate-pulse">Uploading...</span>}
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {currentProject.images?.map((url, i) => (
                                                <div key={i} className="aspect-square bg-white/5 rounded-xl border border-white/10 relative group overflow-hidden">
                                                    <img src={url} className="w-full h-full object-cover" />
                                                    <button type="button" onClick={() => setCurrentProject({ ...currentProject, images: (currentProject.images || []).filter((_, idx) => idx !== i) })} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="material-icons-round text-[12px]">close</span>
                                                    </button>
                                                </div>
                                            ))}
                                            <label htmlFor="gallery-upload" className="aspect-square bg-white/5 border border-dashed border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-slate-500 hover:text-primary">
                                                <span className="material-icons-round text-2xl">add</span>
                                                <input type="file" id="gallery-upload" multiple accept="image/*,video/*" onChange={handleGalleryUpload} className="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project Title</label>
                                        <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all font-bold" value={currentProject.title || ''} onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</label>
                                        <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white appearance-none focus:border-primary outline-none transition-all cursor-pointer font-bold" value={currentProject.category || ''} onChange={e => setCurrentProject({ ...currentProject, category: e.target.value })} required>
                                            <option value="" className="bg-[#102222]">Select Category</option>
                                            {categories.filter(c => c !== 'All').map(c => <option key={c} value={c} className="bg-[#102222]">{c}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mission Brief (Short Desc)</label>
                                        <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all resize-none h-20" value={currentProject.description_short || ''} onChange={e => setCurrentProject({ ...currentProject, description_short: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">In-Depth Intel (Long Desc)</label>
                                        <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all resize-none h-32" value={currentProject.description_long || ''} onChange={e => setCurrentProject({ ...currentProject, description_long: e.target.value })} />
                                    </div>
                                </div>

                                {/* Tags (Tools) Section */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tags (Tools Used)</label>
                                    <div className="tag-container h-auto min-h-[56px] transition-colors focus-within:border-primary">
                                        {currentProject.tools?.map((tool, index) => (
                                            <div key={index} className="tag-item animate-in zoom-in duration-200">
                                                {tool}
                                                <span className="tag-remove" onClick={() => removeTool(index)}>
                                                    <span className="material-icons-round text-[12px]">close</span>
                                                </span>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            id="tag-input"
                                            ref={toolInputRef}
                                            value={toolInput}
                                            onChange={(e) => setToolInput(e.target.value)}
                                            onKeyDown={handleToolKeyDown}
                                            placeholder={currentProject.tools?.length ? '' : "Type and press Enter..."}
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-500">Add tools like Cinema 4D, React, Octane. Only adds on Enter.</p>
                                </div>
                            </form>
                        </div>

                        <div className="px-8 py-6 bg-white/5 border-t border-white/10 flex justify-end items-center gap-4">
                            <button onClick={() => setIsEditing(false)} className="px-6 py-3 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Abort</button>
                            <button type="submit" form="projectForm" className="px-10 py-3 bg-primary text-black text-xs font-black rounded-xl hover:shadow-[0_0_20px_rgba(6,249,241,0.4)] transition-all flex items-center gap-2 uppercase tracking-widest">
                                <span className="material-icons-round text-sm">rocket_launch</span> {currentProject.id ? 'Update Mission' : 'Deploy Archive'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsManager;
