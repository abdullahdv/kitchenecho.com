import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { formatDate, readingTime } from "@/lib/utils"
import Link from "next/link"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const prisma = await db()
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })
  if (!post) return {}
  return {
    title: `${post.title} | Kitchen Echo`,
    description: post.excerpt || "Smart kitchen tips, honest product reviews, and delicious inspiration.",
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const prisma = await db()
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })
  if (!post || post.status !== "PUBLISHED") notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-sm text-[#a0998f] mb-6">
        <Link href="/" className="hover:text-[#e67e22]">Home</Link><span>/</span>
        <Link href="/posts" className="hover:text-[#e67e22]">Articles</Link><span>/</span>
        <span className="text-[#636e72] truncate max-w-[200px]">{post.title}</span>
      </nav>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-[#2d3436] leading-tight">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#a0998f]">
          {post.author && <span className="font-medium text-[#636e72]">By {post.author}</span>}
          <time>{formatDate(post.publishedAt)}</time>
          <span>· {readingTime(post.content)} min read</span>
        </div>
      </header>
      {post.featuredImage && (
        <div className="mb-8 rounded-2xl overflow-hidden">
          <img src={post.featuredImage} alt={post.title} className="w-full h-auto" />
        </div>
      )}
      <div className="prose prose-lg max-w-none prose-img:rounded-xl prose-a:text-[#e67e22]" dangerouslySetInnerHTML={{ __html: post.content }} />
      <footer className="mt-12 pt-8 border-t border-[#e8e0d6]">
        {post.tags?.split(",").filter(Boolean).map((tag: string) => (
          <span key={tag} className="inline-block mr-2 mb-2 px-3 py-1 bg-[#f5f0eb] rounded-full text-xs font-medium text-[#636e72]">#{tag.trim()}</span>
        ))}
        <div className="mt-6">
          <Link href="/posts" className="text-sm font-medium text-[#e67e22] hover:underline">← Back to articles</Link>
        </div>
      </footer>
    </article>
  )
}
