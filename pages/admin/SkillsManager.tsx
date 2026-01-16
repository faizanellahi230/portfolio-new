import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Skill {
    id: string;
    name: string;
    image_url?: string;
    description?: string;
    tags?: string[];
    created_at?: string;
}

const SkillsManager: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkill, setCurrentSkill] = useState<Partial<Skill>>({});
    const [tagInput, setTagInput] = useState('');
    const [uploadingIcon, setUploadingIcon] = useState(false);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        setLoading(true);
        const { data } = await supabase.from('skills').select('*').order('created_at', { ascending: false });
        if (data) setSkills(data);
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const skillData = {
            name: currentSkill.name,
            image_url: currentSkill.image_url,
            description: currentSkill.description,
            tags: currentSkill.tags || []
        };

        let error;
        if (currentSkill.id) {
            const res = await supabase.from('skills').update(skillData).eq('id', currentSkill.id);
            error = res.error;
        } else {
            const res = await supabase.from('skills').insert([skillData]);
            error = res.error;
        }

        if (!error) {
            setIsEditing(false);
            setCurrentSkill({});
            fetchSkills();
        } else {
            alert('Error saving skill: ' + error.message);
        }
    };

    const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploadingIcon(true);
            const file = e.target.files?.[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_skill.${fileExt}`;
            const filePath = `skills/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
            if (data) {
                setCurrentSkill({ ...currentSkill, image_url: data.publicUrl });
            }
        } catch (error: any) {
            alert('Error uploading icon: ' + error.message);
        } finally {
            setUploadingIcon(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this skill?')) return;
        const { error } = await supabase.from('skills').delete().eq('id', id);
        if (!error) fetchSkills();
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tagInput.trim()) {
                const newTags = [...(currentSkill.tags || []), tagInput.trim()];
                setCurrentSkill({ ...currentSkill, tags: newTags });
                setTagInput('');
            }
        } else if (e.key === 'Backspace' && !tagInput && currentSkill.tags?.length) {
            const newTags = currentSkill.tags.slice(0, -1);
            setCurrentSkill({ ...currentSkill, tags: newTags });
        }
    };

    const removeTag = (indexToRemove: number) => {
        const newTags = (currentSkill.tags || []).filter((_, index) => index !== indexToRemove);
        setCurrentSkill({ ...currentSkill, tags: newTags });
    };

    return (
        <div className="font-display">
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

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Manage Capabilities</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white">
                        Tech <span className="text-slate-500">Arsenal</span>
                    </h2>
                </div>
                <button
                    onClick={() => { setCurrentSkill({}); setIsEditing(true); }}
                    className="flex items-center justify-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-primary transition-all active:scale-95 shadow-xl shadow-primary/10"
                >
                    <span className="material-icons-round">add</span>
                    ADD NEW ABILITY
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {skills.map(skill => (
                    <div key={skill.id} className="group relative bg-white/5 border border-white/10 p-6 rounded-2xl transition-all hover:bg-white/10 hover:border-primary/30">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-black/40 rounded-xl flex items-center justify-center border border-white/5 overflow-hidden">
                                {skill.image_url ? (
                                    <img src={skill.image_url} alt={skill.name} className="w-8 h-8 object-contain" />
                                ) : (
                                    <span className="text-lg font-bold text-slate-500">{skill.name.charAt(0)}</span>
                                )}
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { setCurrentSkill(skill); setIsEditing(true); }} className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-lg hover:bg-primary transition-colors">
                                    <span className="material-icons-round text-sm">edit</span>
                                </button>
                                <button onClick={() => handleDelete(skill.id)} className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                                    <span className="material-icons-round text-sm">delete</span>
                                </button>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2">{skill.name}</h3>

                        {skill.description && (
                            <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed italic">"{skill.description}"</p>
                        )}

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {skill.tags?.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-[9px] font-bold text-primary/60 border border-primary/20 px-2 py-0.5 rounded capitalize">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
                <button
                    onClick={() => { setCurrentSkill({}); setIsEditing(true); }}
                    className="flex flex-col items-center justify-center gap-4 min-h-[200px] border-2 border-dashed border-white/10 rounded-2xl hover:border-primary/50 transition-all hover:bg-primary/5 group"
                >
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                        <span className="material-icons-round">add</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">New Skill</p>
                </button>
            </div>

            {/* Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="glass-modal w-full max-w-[600px] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
                            <h2 className="text-white text-xl font-bold tracking-tight">{currentSkill.id ? 'Edit Ability' : 'New Ability'}</h2>
                            <button onClick={() => setIsEditing(false)} className="text-white/50 hover:text-white transition-colors">
                                <span className="material-icons-round">close</span>
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
                            <form id="skillForm" onSubmit={handleSave} className="space-y-6">
                                <div className="space-y-6">
                                    {/* Icon Upload Section */}
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group/icon">
                                            {currentSkill.image_url ? (
                                                <img src={currentSkill.image_url} className="w-12 h-12 object-contain" />
                                            ) : (
                                                <span className="material-icons-round text-3xl text-slate-600">image</span>
                                            )}
                                            {uploadingIcon && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skill Icon</label>
                                            <div className="flex gap-2">
                                                <label className="cursor-pointer bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold px-4 py-2.5 rounded-lg transition-colors border border-white/5">
                                                    {uploadingIcon ? 'UPLOADING...' : 'UPLOAD NEW ICON'}
                                                    <input type="file" accept="image/*" onChange={handleIconUpload} className="hidden" disabled={uploadingIcon} />
                                                </label>
                                                {currentSkill.image_url && (
                                                    <button type="button" onClick={() => setCurrentSkill({ ...currentSkill, image_url: '' })} className="bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[10px] font-bold px-4 py-2.5 rounded-lg transition-colors border border-red-500/20">
                                                        REMOVE
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-[9px] text-slate-500 italic">SVG or PNG recommended (Small file size)</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skill Name</label>
                                        <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all" value={currentSkill.name || ''} onChange={e => setCurrentSkill({ ...currentSkill, name: e.target.value })} placeholder="e.g. Cinema 4D" required />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description</label>
                                        <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all h-24 resize-none" value={currentSkill.description || ''} onChange={e => setCurrentSkill({ ...currentSkill, description: e.target.value })} placeholder="Briefly describe your expertise with this tool..." />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tags (Capabilities / Features)</label>
                                        <div className="tag-container h-auto min-h-[56px] transition-colors focus-within:border-primary">
                                            {currentSkill.tags?.map((tag, index) => (
                                                <div key={index} className="tag-item animate-in zoom-in duration-200">
                                                    {tag}
                                                    <span className="tag-remove" onClick={() => removeTag(index)}>
                                                        <span className="material-icons-round text-[12px]">close</span>
                                                    </span>
                                                </div>
                                            ))}
                                            <input
                                                type="text"
                                                id="tag-input"
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                                onKeyDown={handleTagKeyDown}
                                                placeholder={currentSkill.tags?.length ? '' : "Add features..."}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="px-8 py-6 bg-black/40 border-t border-white/10 flex justify-end items-center gap-4">
                            <button onClick={() => setIsEditing(false)} className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-white transition-colors">Cancel</button>
                            <button type="submit" form="skillForm" className="px-8 py-2.5 bg-primary text-black text-sm font-black rounded-lg hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 shadow-xl shadow-primary/20">
                                <span className="material-icons-round">save</span> SAVE ABILITY
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillsManager;
