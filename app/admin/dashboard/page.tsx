'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Search, 
  LogOut, 
  LayoutDashboard,
  FileText,
  Settings,
  Image as ImageIcon,
  CheckCircle,
  X
} from 'lucide-react';
import { BlogPost } from '@/lib/blog';

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/posts');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        setCurrentPost(prev => prev ? { ...prev, image: url } : null);
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Upload failed: ${errData.details || errData.error || res.statusText}`);
      }
    } catch (err) {
      alert('Upload error: Connection failed or server error');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    // In a real app, clear cookie via API
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/admin/login');
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`/api/admin/posts?slug=${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter(p => p.slug !== slug));
      }
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const openEditor = (post: BlogPost | null = null) => {
    setCurrentPost(post || {
      title: '',
      slug: '',
      excerpt: '',
      category: 'Education',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
      content: ''
    });
    setIsEditorOpen(true);
  };

  const savePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentPost),
      });

      if (res.ok) {
        setIsEditorOpen(false);
        fetchPosts();
      }
    } catch (err) {
      alert('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primaryDark text-white p-8 flex flex-col hidden lg:flex border-r border-white/5">
        <div className="mb-12">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tighter uppercase text-primary">Sheikh CMS</h2>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Kouyateh Foundation</p>
          </div>
        </div>
        
        <nav className="flex-grow space-y-3">
          <a href="#" className="flex items-center gap-3 p-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all">
            <LayoutDashboard size={18} />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 p-4 text-white/70 hover:text-white hover:bg-white/5 rounded-2xl transition-all group">
            <FileText size={18} className="text-white/30 group-hover:text-primary transition-colors" />
            Blog Posts
          </a>
          <a href="#" className="flex items-center gap-3 p-4 text-white/70 hover:text-white hover:bg-white/5 rounded-2xl transition-all group">
            <Settings size={18} className="text-white/30 group-hover:text-primary transition-colors" />
            Settings
          </a>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 p-4 text-white/50 hover:text-red-400 transition-all mt-auto border-t border-white/10 pt-8 group">
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 lg:p-16 bg-gray-50/50">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <h1 className="text-4xl font-bold text-primaryDark uppercase tracking-tighter">Manage Blog</h1>
            <p className="text-gray-400 text-sm mt-2 font-light italic">Create and curate stories for the foundation news portal.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm w-72 shadow-sm"
              />
            </div>
            <button 
              onClick={() => openEditor()}
              className="bg-primary text-white px-8 py-3 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-primaryLight transition-all shadow-xl shadow-primary/20 active:scale-95"
            >
              <Plus size={18} />
              New Post
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Post Details</th>
                  <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Category</th>
                  <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date Published</th>
                  <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPosts.map((post) => (
                  <tr key={post.slug} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm border border-gray-100 transition-transform group-hover:scale-105">
                          <img src={post.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-primaryDark text-lg group-hover:text-primary transition-colors leading-tight">{post.title}</p>
                          <p className="text-gray-400 text-xs mt-1 font-mono">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.15em] border border-primary/20">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-sm text-gray-500 font-medium">{post.date}</td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <a 
                          href={`/blog/${post.slug}`} 
                          target="_blank"
                          className="p-3 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                          title="View Live"
                        >
                          <ExternalLink size={18} />
                        </a>
                        <button 
                          onClick={() => openEditor(post)}
                          className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                          title="Edit Story"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(post.slug)}
                          className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="Remove"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredPosts.length === 0 && (
              <div className="p-32 text-center text-gray-300">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="opacity-40" size={32} />
                </div>
                <p className="text-lg font-light italic">No blog posts found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-primaryDark/80 backdrop-blur-md transition-all animate-in fade-in" onClick={() => setIsEditorOpen(false)}></div>
          <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl z-10 overflow-hidden flex flex-col max-h-[95vh] border border-white/20 animate-in zoom-in-95 duration-300">
            <header className="px-12 py-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h2 className="text-2xl font-bold text-primaryDark uppercase tracking-tighter">
                  {currentPost?.slug ? 'Refine Story' : 'New Story Entry'}
                </h2>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-bold italic"> Sheikh Foundation Newsroom</p>
              </div>
              <button onClick={() => setIsEditorOpen(false)} className="text-gray-300 hover:text-primaryDark p-3 hover:bg-gray-100 rounded-full transition-all">
                <X size={28} />
              </button>
            </header>

            <form onSubmit={savePost} className="p-12 overflow-y-auto flex-grow space-y-10 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Headline</label>
                    <input 
                      type="text" 
                      value={currentPost?.title}
                      onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                      className="w-full p-5 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-xl text-primaryDark placeholder:text-gray-200"
                      placeholder="Enter a compelling title..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Universal Slug</label>
                    <input 
                      type="text" 
                      value={currentPost?.slug}
                      onChange={(e) => setCurrentPost({...currentPost, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                      className="w-full p-5 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-mono text-gray-500"
                      placeholder="story-identifier-slug"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Category</label>
                      <select 
                        value={currentPost?.category}
                        onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                        className="w-full p-5 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold text-primaryDark appearance-none cursor-pointer"
                      >
                        {['Education', 'Justice', 'Development', 'Health', 'General'].map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Publish Date</label>
                      <input 
                        type="text" 
                        value={currentPost?.date}
                        onChange={(e) => setCurrentPost({...currentPost, date: e.target.value})}
                        className="w-full p-5 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium text-gray-600"
                        placeholder="Jan 01, 2026"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Hero Image Asset</label>
                    <div className="space-y-4">
                      <div className="relative group">
                        <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                        <input 
                          type="text" 
                          value={currentPost?.image}
                          onChange={(e) => setCurrentPost({...currentPost, image: e.target.value})}
                          className="w-full p-5 pl-14 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-xs text-gray-400 italic"
                          placeholder="Paste image URL here..."
                        />
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="h-[1px] flex-grow bg-gray-100"></div>
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">OR</span>
                        <div className="h-[1px] flex-grow bg-gray-100"></div>
                      </div>

                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-[1.5rem] cursor-pointer hover:bg-gray-50 hover:border-primary/30 transition-all group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {uploading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          ) : (
                            <>
                              <Plus className="w-8 h-8 text-gray-300 group-hover:text-primary transition-colors mb-2" />
                              <p className="text-xs text-gray-400 group-hover:text-primaryDark transition-colors">
                                <span className="font-bold uppercase tracking-widest text-[10px]">Upload Image</span>
                              </p>
                            </>
                          )}
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                      </label>
                    </div>
                  </div>
                  
                  <div className="h-48 w-full rounded-[2rem] overflow-hidden border border-gray-100 bg-gray-50 group relative shadow-inner">
                    {currentPost?.image ? (
                      <img src={currentPost.image} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200 italic text-xs">No image selected</div>
                    )}
                    <div className="absolute inset-0 bg-primaryDark/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Narrative Excerpt</label>
                <textarea 
                  value={currentPost?.excerpt}
                  onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                  className="w-full p-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-base italic h-28 resize-none text-gray-500 leading-relaxed"
                  placeholder="Summarize the impact in a few evocative sentences..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Main Narrative Content (HTML/Markdown Supported)</label>
                <textarea 
                  value={currentPost?.content}
                  onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                  className="w-full p-8 bg-gray-50/50 border border-gray-100 rounded-[2.5rem] outline-none focus:ring-4 focus:ring-primary/10 transition-all text-base font-medium text-gray-600 min-h-[500px] leading-relaxed custom-scrollbar"
                  placeholder="<h2>Subheading</h2><p>Article content here...</p>"
                  required
                />
              </div>
            </form>

            <footer className="px-12 py-8 border-t border-gray-100 flex items-center justify-end gap-6 bg-gray-50/50">
              <button 
                onClick={() => setIsEditorOpen(false)}
                className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-primaryDark transition-all active:scale-95"
              >
                Discard Changes
              </button>
              <button 
                onClick={savePost}
                disabled={saving}
                className="bg-primary text-white px-12 py-4 rounded-[1.5rem] font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-primaryLight transition-all shadow-2xl shadow-primary/30 active:scale-95 disabled:opacity-50"
              >
                {saving ? 'Syncing...' : (
                  <>
                    <CheckCircle size={18} />
                    Publish Story
                  </>
                )}
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
