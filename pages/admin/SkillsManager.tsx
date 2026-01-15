import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Skill {
    id: string;
    name: string;
    level: number;
    category: string;
    image_url?: string;
    description?: string;
    tags?: string[];
}

const SkillsManager: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkill, setCurrentSkill] = useState<Partial<Skill>>({});

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        setLoading(true);
        const { data } = await supabase.from('skills').select('*').order('level', { ascending: false });
        if (data) setSkills(data);
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const skillData = {
            name: currentSkill.name,
            level: currentSkill.level,
            category: currentSkill.category,
            image_url: currentSkill.image_url,
            description: currentSkill.description,
            tags: typeof currentSkill.tags === 'string' ? (currentSkill.tags as string).split(',').map((t: string) => t.trim()) : currentSkill.tags
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

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this skill?')) return;
        const { error } = await supabase.from('skills').delete().eq('id', id);
        if (!error) fetchSkills();
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
                            <div className="w-12 h-12 bg-black/40 rounded-xl flex items-center justify-center border border-white/5">
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

                        <h3 className="text-lg font-bold text-white mb-1">{skill.name}</h3>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-4">{skill.category}</p>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-slate-500">
                                <span>Proficiency</span>
                                <span className="text-primary">{skill.level}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary shadow-[0_0_10px_#06f9f1] transition-all duration-1000" style={{ width: `${skill.level}%` }}></div>
                            </div>
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skill Name</label>
                                        <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none transition-all" value={currentSkill.name || ''} onChange={e => setCurrentSkill({ ...currentSkill, name: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Level (%)</label>
                                        <input type="number" min="0" max="100" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none transition-all" value={currentSkill.level || ''} onChange={e => setCurrentSkill({ ...currentSkill, level: parseInt(e.target.value) })} required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</label>
                                    <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none transition-all" value={currentSkill.category || ''} onChange={e => setCurrentSkill({ ...currentSkill, category: e.target.value })} placeholder="e.g. 3D, Motion, Code" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Image / Icon URL</label>
                                    <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none transition-all" value={currentSkill.image_url || ''} onChange={e => setCurrentSkill({ ...currentSkill, image_url: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tags</label>
                                    <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none transition-all" value={Array.isArray(currentSkill.tags) ? currentSkill.tags.join(', ') : currentSkill.tags || ''} onChange={e => setCurrentSkill({ ...currentSkill, tags: e.target.value.split(',') })} />
                                </div>
                            </form>
                        </div>

                        <div className="px-8 py-6 bg-black/40 border-t border-white/10 flex justify-end items-center gap-4">
                            <button onClick={() => setIsEditing(false)} className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-white transition-colors">Cancel</button>
                            <button type="submit" form="skillForm" className="px-8 py-2.5 bg-primary text-black text-sm font-black rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                                <span className="material-icons-round">save</span> SAVE DATA
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillsManager;
