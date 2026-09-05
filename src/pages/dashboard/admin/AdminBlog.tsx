import { useState } from "react";
import { Plus, Search, Filter, Trash2, Edit3, Eye, Check, X, FileText } from "lucide-react";
import { toast } from "sonner";
import { INITIAL_BLOG_POSTS, BlogPost } from "@/constants/dashboardData";

export const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Couture Craft",
    author: "Betees Editorial",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&q=80",
    excerpt: "",
    content: "",
    status: "published" as "published" | "draft"
  });

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      category: "Couture Craft",
      author: "Betees Editorial",
      coverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=500&fit=crop&q=80",
      excerpt: "",
      content: "",
      status: "published"
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p: BlogPost) => {
    setEditingPost(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      category: p.category,
      author: p.author,
      coverImage: p.coverImage,
      excerpt: p.excerpt,
      content: p.content,
      status: p.status
    });
    setModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete blog post "${title}"?`)) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success(`Post "${title}" deleted.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    if (editingPost) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id
            ? {
                ...p,
                ...formData,
                slug
              }
            : p
        )
      );
      toast.success("Blog article updated successfully.");
    } else {
      const newPost: BlogPost = {
        id: `BLOG-${Date.now()}`,
        ...formData,
        slug,
        publishedDate: "Just now",
        views: 0
      };
      setPosts([newPost, ...posts]);
      toast.success(`Blog article "${newPost.title}" published!`);
    }
    setModalOpen(false);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Editorial & Blog CMS</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Publish trend forecasts, bespoke craftsmanship spotlights, and platform style journalism.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary self-start text-xs">
          <Plus size={14} /> Draft New Article
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 shadow-editorial">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, author, category..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
              <th className="p-4">Article</th>
              <th className="p-4">Category</th>
              <th className="p-4">Author</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Reads</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((post) => (
              <tr key={post.id} className="hover:bg-surface-low/30 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-14 h-10 bg-surface-high overflow-hidden shrink-0">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block text-xs line-clamp-1">{post.title}</span>
                    <span className="text-[11px] text-on-surface-variant font-mono">/{post.slug}</span>
                  </div>
                </td>
                <td className="p-4 text-xs font-semibold text-burgundy">{post.category}</td>
                <td className="p-4 text-xs text-charcoal">{post.author}</td>
                <td className="p-4 text-xs text-on-surface-variant">{post.publishedDate}</td>
                <td className="p-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                      post.status === "published" ? "bg-emerald/10 text-emerald" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="p-4 text-xs font-medium text-charcoal">{post.views.toLocaleString()}</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(post)}
                    className="p-1.5 border border-outline-color hover:border-charcoal text-charcoal"
                    title="Edit Post"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="p-1.5 text-red-600 hover:bg-red-50 border border-red-200"
                    title="Delete Post"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <h2 className="font-display text-xl text-charcoal">
                {editingPost ? "Edit Blog Post" : "Draft Editorial Article"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Article Headline *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. The Renaissance of Canvassed Italian Suiting"
                  className="input-editorial w-full font-serif text-sm font-semibold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-editorial w-full"
                  >
                    <option>Couture Craft</option>
                    <option>AI & Innovation</option>
                    <option>Trends</option>
                    <option>Style Guides</option>
                  </select>
                </div>
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Author Byline</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="input-editorial w-full"
                  />
                </div>
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Short Excerpt / Teaser</label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Full Article Body</label>
                <textarea
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="input-editorial w-full text-xs"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Publication Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "published" | "draft" })}
                  className="input-editorial w-full font-semibold"
                >
                  <option value="published">Published (Live to Public)</option>
                  <option value="draft">Draft (Internal Only)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Check size={14} /> {editingPost ? "Save Changes" : "Publish Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
