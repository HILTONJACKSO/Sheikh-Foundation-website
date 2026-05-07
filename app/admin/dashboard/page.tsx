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
      <aside className="w-64 bg-primaryDark text-white p-6 flex flex-col hidden lg:flex">
        <div className="mb-10">
          <h2 className="text-xl font-bold tracking-tighter uppercase">Sheikh CMS</h2>
        </div>
        
        <nav className="flex-grow space-y-2">
          <a href="#" className="flex items-center gap-3 p-3 bg-primary/10 text-primary rounded-xl font-bold transition-all">
            <LayoutDashboard size={18} />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 p-3 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <FileText size={18} />
            Blog Posts
          </a>
          <a href="#" className="flex items-center gap-3 p-3 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <Settings size={18} />
            Settings
          </a>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-white/50 hover:text-red-400 transition-all mt-auto border-t border-white/10 pt-6">
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 lg:p-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-primaryDark uppercase tracking-tighter">Manage Blog</h1>
            <p className="text-gray-400 text-sm mt-1">Create and curate stories for the foundation news portal.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm w-64"
              />
            </div>
            <button 
              onClick={() => openEditor()}
              className="bg-primary text-primaryDark px-6 py-2 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-primaryLight transition-all"
            >
              <Plus size={16} />
              New Post
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Post Details</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPosts.map((post) => (
                  <tr key={post.slug} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={post.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-primaryDark">{post.title}</p>
                          <p className="text-gray-400 text-xs mt-0.5">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500">{post.date}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a 
                          href={`/blog/${post.slug}`} 
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-primary transition-colors"
                          title="View Live"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <button 
                          onClick={() => openEditor(post)}
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(post.slug)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredPosts.length === 0 && (
              <div className="p-20 text-center text-gray-400">
                <FileText className="mx-auto mb-4 opacity-20" size={48} />
                <p>No blog posts found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-primaryDark/60 backdrop-blur-sm" onClick={() => setIsEditorOpen(false)}></div>
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
            <header className="px-10 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xl font-bold text-primaryDark uppercase tracking-tighter">
                {currentPost?.slug ? 'Edit Story' : 'New Story'}
              </h2>
              <button onClick={() => setIsEditorOpen(false)} className="text-gray-400 hover:text-primaryDark p-2">
                <X size={24} />
              </button>
            </header>

            <form onSubmit={savePost} className="p-10 overflow-y-auto flex-grow space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
                    <input 
                      type="text" 
                      value={currentPost?.title}
                      onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-primaryDark"
                      placeholder="Enter post title..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">URL Slug</label>
                    <input 
                      type="text" 
                      value={currentPost?.slug}
                      onChange={(e) => setCurrentPost({...currentPost, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-mono"
                      placeholder="post-slug-here"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Category</label>
                      <select 
                        value={currentPost?.category}
                        onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      >
                        {['Education', 'Justice', 'Development', 'Health', 'General'].map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Date</label>
                      <input 
                        type="text" 
                        value={currentPost?.date}
                        onChange={(e) => setCurrentPost({...currentPost, date: e.target.value})}
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                        placeholder="Jan 01, 2026"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Featured Image URL</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                      <input 
                        type="text" 
                        value={currentPost?.image}
                        onChange={(e) => setCurrentPost({...currentPost, image: e.target.value})}
                        className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-xs"
                        placeholder="https://unsplash.com/..."
                      />
                    </div>
                  </div>
                  
                  <div className="h-40 w-full rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                    <img src={currentPost?.image} alt="Preview" className="w-full h-full object-cover opacity-60" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Short Excerpt</label>
                <textarea 
                  value={currentPost?.excerpt}
                  onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm italic h-24 resize-none"
                  placeholder="Summarize the story in a few sentences..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Main Content (HTML Supported)</label>
                <textarea 
                  value={currentPost?.content}
                  onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                  className="w-full p-6 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-mono min-h-[400px]"
                  placeholder="<h2>Subheading</h2><p>Article content here...</p>"
                  required
                />
              </div>
            </form>

            <footer className="px-10 py-6 border-t border-gray-100 flex items-center justify-end gap-4 bg-gray-50/50">
              <button 
                onClick={() => setIsEditorOpen(false)}
                className="px-6 py-3 text-sm font-bold text-gray-400 uppercase tracking-widest hover:text-primaryDark transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={savePost}
                disabled={saving}
                className="bg-primary text-primaryDark px-10 py-3 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-primaryLight transition-all shadow-xl shadow-primary/20"
              >
                {saving ? 'Saving...' : (
                  <>
                    <CheckCircle size={16} />
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
