import { db } from "@/lib/db"
import { createPost, deletePost } from "@/lib/actions"
import Link from "next/link"

export default async function PostsPage() {
  const prisma = await db()
  const [posts, categories] = await Promise.all([
    prisma.post.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-sans font-bold text-[#2d3436]">Posts</h1>
      </div>

      {/* New Post Form */}
      <div className="card mb-8">
        <h2 className="font-sans font-bold text-sm text-[#2d3436] mb-4">Create New Post</h2>
        <form action={createPost} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#636e72] mb-1">Title *</label>
              <input name="title" required className="input-field" placeholder="Post title" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#636e72] mb-1">Category</label>
              <select name="categoryId" className="input-field">
                <option value="">None</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#636e72] mb-1">Content (HTML)</label>
            <textarea name="content" rows={8} className="input-field font-mono text-xs" placeholder="<p>Write your article content here...</p>" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#636e72] mb-1">Excerpt</label>
              <input name="excerpt" className="input-field" placeholder="Short description" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#636e72] mb-1">Featured Image URL</label>
              <input name="featuredImage" className="input-field" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#636e72] mb-1">Tags (comma)</label>
              <input name="tags" className="input-field" placeholder="tips, organization" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#636e72] mb-1">Author</label>
              <input name="author" className="input-field" placeholder="Author name" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#636e72] mb-1">Status</label>
              <select name="status" className="input-field">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn-primary text-xs py-2">Create Post</button>
        </form>
      </div>

      {/* Posts List */}
      <div className="card">
        <h2 className="font-sans font-bold text-sm text-[#2d3436] mb-4">All Posts ({posts.length})</h2>
        {posts.length > 0 ? (
          <div className="space-y-2">
            {posts.map((p: any) => (
              <div key={p.id} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-[#f5f0eb] transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#2d3436] truncate">{p.title}</p>
                  <p className="text-xs text-[#a0998f]">{new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.status === "PUBLISHED" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>{p.status}</span>
                  <form action={deletePost.bind(null, p.id)}>
                    <button type="submit" className="text-xs text-red-500 hover:underline">Delete</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#a0998f] text-center py-8">No posts yet.</p>
        )}
      </div>
    </div>
  )
}
