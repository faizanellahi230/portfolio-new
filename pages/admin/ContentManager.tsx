import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2 } from 'lucide-react';

interface SiteContent {
    home_heading: string;
    home_subheading: string;
    about_bio: string;
    about_image_url: string;
}

const ContentManager: React.FC = () => {
    const [content, setContent] = useState<SiteContent>({
        home_heading: '',
        home_subheading: '',
        about_bio: '',
        about_image_url: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        setLoading(true);
        // In a real app we might store this as rows with keys, here simplifying to a single fetch logic or row
        const { data } = await supabase.from('site_content').select('*').single();
        if (data && data.content) {
            setContent(data.content);
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // Check if row exists, if not insert, else update.
        // Assuming a single row configuration for simplicity user-specific
        const { data: existing } = await supabase.from('site_content').select('id').single();

        let error;
        if (existing) {
            const res = await supabase.from('site_content').update({ content }).eq('id', existing.id);
            error = res.error;
        } else {
            const res = await supabase.from('site_content').insert([{ content }]);
            error = res.error;
        }

        setSaving(false);
        if (error) alert('Error saving content: ' + error.message);
        else alert('Content updated successfully!');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Site Content</h1>
            </div>

            <form onSubmit={handleSave} className="space-y-8">

                {/* Home Section */}
                <section className="bg-surface p-6 rounded-2xl border border-white/10 space-y-4">
                    <h2 className="text-xl font-bold text-primary">Home Section</h2>
                    <div>
                        <label className="block text-sm mb-1">Main Heading</label>
                        <input
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl"
                            value={content.home_heading}
                            onChange={e => setContent({ ...content, home_heading: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Sub Heading / Tagline</label>
                        <input
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl"
                            value={content.home_subheading}
                            onChange={e => setContent({ ...content, home_subheading: e.target.value })}
                        />
                    </div>
                </section>

                {/* About Section */}
                <section className="bg-surface p-6 rounded-2xl border border-white/10 space-y-4">
                    <h2 className="text-xl font-bold text-primary">About Section</h2>
                    <div>
                        <label className="block text-sm mb-1">Profile Image URL</label>
                        <input
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl"
                            value={content.about_image_url}
                            onChange={e => setContent({ ...content, about_image_url: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Bio Description</label>
                        <textarea
                            rows={6}
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl"
                            value={content.about_bio}
                            onChange={e => setContent({ ...content, about_bio: e.target.value })}
                        />
                    </div>
                </section>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-primary text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-colors disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        <span>Save Changes</span>
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ContentManager;
