import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Mail, Calendar } from 'lucide-react';

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
        if (data) setMessages(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this message?')) return;
        const { error } = await supabase.from('messages').delete().eq('id', id);
        if (!error) fetchMessages();
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Messages</h1>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid gap-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className="bg-surface p-6 rounded-2xl border border-white/10 group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">{msg.name}</h3>
                                    <a href={`mailto:${msg.email}`} className="text-primary text-sm flex items-center gap-2 hover:underline">
                                        <Mail size={14} /> {msg.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-400 text-xs flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        className="text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-300 bg-white/5 p-4 rounded-xl text-sm leading-relaxed whitespace-pre-wrap">
                                {msg.message}
                            </p>
                        </div>
                    ))}
                    {messages.length === 0 && (
                        <div className="text-center py-12 text-gray-500">No new messages.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Messages;
