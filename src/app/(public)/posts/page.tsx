import { db } from "@/lib/db"
import PostCard from "@/components/PostCard"
import Link from "next/link"

export default async function PostsPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const prisma = await db()
  const params = await searchParams
  const where: any = { status: "PUBLISHED" }
  if (params.cat) where.categoryId = params.cat
  const [posts, categories] = await Promise.all([
    prisma.post.findMany({ where, orderBy: { publishedAt: "desc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ])

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-[#2d3436]">Articles</h1>
        <p className="mt-1 text-[#636e72]">Explore our collection of kitchen wisdom</p>
      </div>
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <Link href="/posts" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!params.cat ? "bg-[#e67e22] text-white" : "bg-[#f5f0eb] text-[#636e72] hover:bg-[#ede4d9]"}`}>All</Link>
        {categories.map((cat: any) => (
          <Link key={cat.id} href={`/posts?cat=${cat.slug}`} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${params.cat === cat.slug ? "bg-[#e67e22] text-white" : "bg-[#f5f0eb] text-[#636e72] hover:bg-[#ede4d9]"}`}>{cat.name}</Link>
        ))}
      </div>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => <PostCard key={post.id} post={post} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-5xl">📝</span>
          <p className="mt-4 text-lg text-[#636e72]">No articles yet</p>
          <p className="text-sm text-[#a0998f]">Check back soon!</p>
        </div>
      )}
    </div>
  )
}
