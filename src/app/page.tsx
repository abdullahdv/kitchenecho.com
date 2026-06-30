import { db } from "@/lib/db"
import PostCard from "@/components/PostCard"
import Link from "next/link"

export default async function HomePage() {
  const prisma = await db()
  const [settings, posts, categories] = await Promise.all([
    prisma.homepageSettings.findFirst(),
    prisma.post.findMany({ where: { status: "PUBLISHED" }, orderBy: { publishedAt: "desc" }, take: 6 }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#faf8f5] via-[#fdf6ec] to-[#f5e6d3] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e67e22' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-[#2d3436] leading-tight">
              {settings?.heroTitle || "Your Kitchen, Amplified"}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-[#636e72] leading-relaxed">
              {settings?.heroSubtitle || "Smart tips, honest reviews, and delicious inspiration for every home cook"}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/posts" className="btn-primary">{settings?.heroCta || "Explore Articles"}</Link>
              <Link href="/contact" className="btn-secondary">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-[#2d3436]">Latest Articles</h2>
              <p className="mt-1 text-[#636e72]">Fresh kitchen wisdom served daily</p>
            </div>
            <Link href="/posts" className="text-sm font-medium text-[#e67e22] hover:underline">View all →</Link>
          </div>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => <PostCard key={post.id} post={post} />)}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-5xl">🍽️</span>
              <p className="mt-4 text-[#636e72] text-lg">Articles coming soon!</p>
              <p className="text-sm text-[#a0998f] mt-1">Check back for kitchen tips, reviews, and more.</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-[#2d3436]">Explore by Topic</h2>
            <p className="mt-1 text-[#636e72]">Find exactly what you&apos;re looking for</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat: any) => (
              <Link key={cat.id} href={`/posts?cat=${cat.slug}`} className="card text-center py-8 group">
                <p className="font-sans font-semibold text-[#2d3436] group-hover:text-[#e67e22] transition-colors">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#e67e22] to-[#d35400] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-sans font-bold">Stay in the Loop</h2>
          <p className="mt-2 text-white/80 max-w-md mx-auto">Get weekly kitchen tips, recipes, and product reviews.</p>
          <form action="/api/subscribe" method="POST" className="mt-6 flex max-w-sm mx-auto gap-2">
            <input type="email" name="email" placeholder="Your email address" className="flex-1 rounded-lg border-0 px-4 py-3 text-sm text-[#2d3436] focus:outline-none focus:ring-2 focus:ring-white/50" required />
            <button type="submit" className="rounded-lg bg-[#2d3436] px-6 py-3 text-sm font-semibold hover:bg-[#1a1f21] transition-colors">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  )
}
