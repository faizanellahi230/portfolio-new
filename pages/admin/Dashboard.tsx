import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({
        projects: 0,
        skills: 0,
        messages: 0
    });
    const [recentProjects, setRecentProjects] = useState<any[]>([]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
        const { count: skillsCount } = await supabase.from('skills').select('*', { count: 'exact', head: true });
        const { count: messagesCount } = await supabase.from('messages').select('*', { count: 'exact', head: true });

        // Fetch recent projects
        const { data: projects } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(3);

        setStats({
            projects: projectsCount || 0,
            skills: skillsCount || 0,
            messages: messagesCount || 0
        });

        if (projects) setRecentProjects(projects);
    };

    return (
        <div>
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#06f9f1]"></span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">System Status</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
                        Command <span className="text-slate-500">Center</span>
                    </h2>
                    <p className="text-slate-400 text-sm mt-4 max-w-md leading-relaxed">
                        Overview of portfolio metrics, deployment status, and incoming signal transmissions.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link to="/admin/projects" className="bg-white text-black font-bold px-8 py-4 rounded-full text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-primary transition-all shadow-xl shadow-white/5 hover:shadow-primary/20 active:scale-95">
                        <span className="material-icons-round text-lg">add</span>
                        Upload Project
                    </Link>
                </div>
            </header>

            {/* Top Grid: Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Inquiries */}
                <div className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl overflow-hidden hover:border-primary/50 transition-all hover:bg-white/10">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <span className="p-3 bg-white/5 rounded-xl text-white group-hover:bg-primary group-hover:text-black transition-colors">
                                <span className="material-icons-round text-xl">mail</span>
                            </span>
                            <span className="text-[10px] font-bold tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">+12%</span>
                        </div>
                        <h3 className="text-5xl font-extrabold tracking-tighter text-white mb-1">{stats.messages}</h3>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Total Inquiries</p>
                    </div>
                    {/* Decor */}
                    <div className="absolute top-1/2 right-[-20%] w-[150px] h-[150px] bg-primary/10 rounded-full blur-[60px] group-hover:bg-primary/20 transition-all"></div>
                </div>

                {/* Projects */}
                <div className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl overflow-hidden hover:border-primary/50 transition-all hover:bg-white/10">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <span className="p-3 bg-white/5 rounded-xl text-white group-hover:bg-primary group-hover:text-black transition-colors">
                                <span className="material-icons-round text-xl">dataset</span>
                            </span>
                            <span className="text-[10px] font-bold tracking-widest text-green-400 bg-green-400/10 px-2 py-1 rounded">ACTIVE</span>
                        </div>
                        <h3 className="text-5xl font-extrabold tracking-tighter text-white mb-1">{stats.projects}</h3>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Deployed Projects</p>
                    </div>
                    <div className="absolute top-1/2 right-[-20%] w-[150px] h-[150px] bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/20 transition-all"></div>
                </div>

                {/* Skills */}
                <div className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl overflow-hidden hover:border-primary/50 transition-all hover:bg-white/10">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <span className="p-3 bg-white/5 rounded-xl text-white group-hover:bg-primary group-hover:text-black transition-colors">
                                <span className="material-icons-round text-xl">bolt</span>
                            </span>
                            <span className="text-[10px] font-bold tracking-widest text-orange-400 bg-orange-400/10 px-2 py-1 rounded">LOGGED</span>
                        </div>
                        <h3 className="text-5xl font-extrabold tracking-tighter text-white mb-1">{stats.skills}</h3>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Tech Stack</p>
                    </div>
                    <div className="absolute top-1/2 right-[-20%] w-[150px] h-[150px] bg-orange-500/10 rounded-full blur-[60px] group-hover:bg-orange-500/20 transition-all"></div>
                </div>
            </div>

            {/* Bottom Grid: Recent & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Deployments Table */}
                <div className="lg:col-span-2 bg-white/5 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-md">
                    <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <div className="flex items-center gap-3">
                            <span className="material-icons-round text-slate-400">history</span>
                            <h4 className="font-bold uppercase tracking-widest text-sm text-white">Recent Deployments</h4>
                        </div>
                        <Link to="/admin/projects" className="text-[10px] text-primary uppercase font-bold tracking-widest hover:text-white transition-colors">View All Archive</Link>
                    </div>
                    <div className="p-4">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
                                    <th className="p-4 font-bold">Project Name</th>
                                    <th className="p-4 font-bold">Category</th>
                                    <th className="p-4 font-bold">Date</th>
                                    <th className="p-4 font-bold text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {recentProjects.map((project, i) => (
                                    <tr key={project.id} className="hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-8 rounded bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
                                                    {project.thumbnail_url ? <img src={project.thumbnail_url} className="w-full h-full object-cover" /> : <div className="text-[10px] text-white/20">IMG</div>}
                                                </div>
                                                <span className="font-bold text-white group-hover:text-primary transition-colors">{project.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">{project.category}</td>
                                        <td className="p-4 text-xs font-medium text-slate-500">{new Date(project.created_at).toLocaleDateString()}</td>
                                        <td className="p-4 text-right">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                                <span className="text-[10px] font-bold uppercase tracking-wide">Live</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {recentProjects.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-slate-500 text-sm">No recent projects deployed.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Side Column */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-white flex items-center gap-2">
                            <span className="w-1 h-4 bg-primary rounded-full"></span> Quick Actions
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <Link to="/admin/content" className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-primary/10 hover:border-primary/50 transition-all group">
                                <span className="material-icons-round text-slate-400 group-hover:text-primary transition-colors text-2xl">edit_note</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">Content</span>
                            </Link>
                            <Link to="/admin/projects" className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-primary/10 hover:border-primary/50 transition-all group">
                                <span className="material-icons-round text-slate-400 group-hover:text-primary transition-colors text-2xl">add_photo_alternate</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">Project</span>
                            </Link>
                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 opacity-40 cursor-not-allowed">
                                <span className="material-icons-round text-slate-400 text-2xl">analytics</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Analytics</span>
                            </div>
                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 opacity-40 cursor-not-allowed">
                                <span className="material-icons-round text-slate-400 text-2xl">settings</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Settings</span>
                            </div>
                        </div>
                    </div>

                    {/* Arsenal Status */}
                    <div className="bg-gradient-to-br from-white/10 to-black/50 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="font-bold uppercase tracking-widest text-sm text-white">System Status</h4>
                            <span className="text-[10px] text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded border border-green-400/20">OPERATIONAL</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <span className="material-icons-round text-primary text-sm">database</span>
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">Supabase</span>
                                </div>
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <span className="material-icons-round text-blue-400 text-sm">cloud</span>
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">Storage</span>
                                </div>
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Effects (Optional, if not handled by global Layout) */}
            <div className="fixed inset-0 -z-10 pointer-events-none opacity-20 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full"></div>
            </div>
        </div>
    );
};

export default Dashboard;
