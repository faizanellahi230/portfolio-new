import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC = () => {
    const { session, loading, signOut } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen bg-[#05080a] flex items-center justify-center text-primary">Loading...</div>;
    }

    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    // Material Icons map
    const navItems = [
        { path: '/admin/dashboard', icon: 'dashboard', label: 'Analytics' },
        { path: '/admin/projects', icon: 'layers', label: 'Project Manager' },
        { path: '/admin/skills', icon: 'bolt', label: 'Skills & Toolkit' },
        { path: '/admin/messages', icon: 'mail', label: 'Inquiries' },
        // { path: '/admin/settings', icon: 'settings', label: 'Settings' }, // Removed for now or kept as placeholder
    ];

    return (
        <div className="min-h-screen text-white font-display selection:bg-primary selection:text-black">
            <style>{`
                .glass-panel {
                    background: rgba(22, 27, 34, 0.4);
                    backdrop-filter: blur(12px);
                    border-right: 1px solid rgba(255, 255, 255, 0.05);
                }
                .text-glow {
                    text-shadow: 0 0 15px rgba(6, 249, 241, 0.4);
                }
                .sidebar-link:hover {
                    background: rgba(6, 249, 241, 0.1);
                    color: #06f9f1;
                }
                .active-link {
                    background: rgba(6, 249, 241, 0.1);
                    color: #06f9f1;
                    border-right: 3px solid #06f9f1;
                }
            `}</style>

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 glass-panel z-50 flex flex-col justify-between">
                <div>
                    <div className="p-8">
                        <h1 className="text-xl font-extrabold tracking-tighter uppercase leading-none text-white">
                            FAIZAN <br /><span className="text-primary text-glow">ELLAHI</span>
                        </h1>
                        <p className="text-[10px] mt-2 opacity-50 uppercase tracking-[0.2em] text-white">Admin Console</p>
                    </div>

                    <nav className="mt-4 px-4 space-y-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${isActive ? 'active-link' : 'sidebar-link text-slate-400'}`}
                                >
                                    <div className="relative">
                                        <span className="material-icons-round text-xl">{item.icon}</span>
                                        {item.path === '/admin/messages' && (
                                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                        )}
                                    </div>
                                    <span className="font-semibold text-sm tracking-wide">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-8">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
                            {/* Placeholder Avatar */}
                            {/* In a real app we might fetch user avatar */}
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white">FE</div>
                        </div>
                        <div className="overflow-hidden flex-1">
                            <p className="text-xs font-bold truncate text-white">Faizan Ellahi</p>
                            <button onClick={() => signOut()} className="text-[10px] opacity-50 truncate uppercase tracking-widest hover:text-red-400 transition-colors text-left">Sign Out</button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-10 h-screen overflow-y-auto custom-scrollbar relative">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
