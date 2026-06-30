import { db } from "@/lib/db"
import Link from "next/link"

export default async function DashboardOverview() {
  const prisma = await db()
  const [posts, published, categories, unreadMessages, subscribers] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.category.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.subscription.count({ where: { status: "ACTIVE" } }),
  ])

  const recentPosts = await prisma.post.findMany({ orderBy: { createdAt: "desc" }, take: 5 })

  const cards = [
    { label: "Total Posts", value: posts, icon: "📝", color: "bg-blue-50 text-blue-600" },
    { label: "Published", value: published, icon: "✅", color: "bg-green-50 text-green-600" },
    { label: "Categories", value: categories, icon: "🏷️", color: "bg-purple-50 text-purple-600" },
    { label: "Unread Messages", value: unreadMessages, icon: "✉️", color: unreadMessages > 0 ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600" },
    { label: "Subscribers", value: subscribers, icon: "📧", color: "bg-[#fdf6ec] text-[#e67e22]" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-sans font-bold text-[#2d3436] mb-6">Dashboard Overview</h1>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className={`card ${c.color} border-0`}>
            <div className="text-2xl mb-1">{c.icon}</div>
            <p className="text-2xl font-sans font-bold">{c.value}</p>
            <p className="text-xs mt-1 opacity-80">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans font-bold text-[#2d3436]">Recent Posts</h2>
          <Link href="/dashboard/posts" className="text-sm text-[#e67e22] hover:underline">Manage →</Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="space-y-3">
            {recentPosts.map((p: any) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-[#f5f0eb] last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#2d3436] truncate">{p.title}</p>
                  <p className="text-xs text-[#a0998f]">{p.status} · {new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`ml-3 px-2 py-0.5 rounded-full text-xs font-medium ${p.status === "PUBLISHED" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>{p.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#a0998f] py-4 text-center">No posts yet. Create your first one!</p>
        )}
      </div>
    </div>
  )
}
