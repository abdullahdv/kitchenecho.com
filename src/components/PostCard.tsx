import Link from "next/link"
import { formatDate, readingTime, excerpt } from "@/lib/utils"

export default function PostCard({ post }: { post: any }) {
  return (
    <article className="card group">
      {post.featuredImage && (
        <div className="mb-4 -m-6 -mt-4 rounded-t-2xl overflow-hidden h-48 bg-[#f5f0eb]">
          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#a0998f]">
          {post.categoryId && <span className="text-[#e67e22] font-medium">{post.categoryId}</span>}
          <span>{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
          <span>· {readingTime(post.content)} min read</span>
        </div>
        <h2 className="text-xl font-sans font-bold text-[#2d3436] group-hover:text-[#e67e22] transition-colors">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="text-sm text-[#636e72] leading-relaxed">{excerpt(post.excerpt || post.content, 150)}</p>
        <Link href={`/posts/${post.slug}`} className="inline-flex items-center text-sm font-medium text-[#e67e22] hover:underline gap-1">
          Read more <span>→</span>
        </Link>
      </div>
    </article>
  )
}
