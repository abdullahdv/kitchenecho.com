import { notFound } from "next/navigation"
import { getAuthorBySlug, getPostsByAuthor } from "./actions"
import Link from "next/link"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  if (!author) return {}
  return {
    title: `${author.name} - Author`,
    description: author.bio || `Articles by ${author.name}`,
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  if (!author) notFound()

  const posts = await getPostsByAuthor(author.name)

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#a0998f] mb-8">
        <Link href="/" className="hover:text-[#e67e22]">Home</Link><span>/</span>
        <span className="text-[#636e72]">Authors</span><span>/</span>
        <span className="text-[#636e72] truncate max-w-[200px]">{author.name}</span>
      </nav>

      {/* Author Card */}
      <div className="flex flex-col sm:flex-row gap-6 items-start mb-12 p-6 border border-[#e8e0d6] rounded-xl bg-[#f8f6f2]">
        {author.avatar ? (
          <img src={author.avatar} alt={author.name} className="w-24 h-24 rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-[#e67e22]/10 flex items-center justify-center text-3xl font-bold text-[#e67e22] shrink-0">
            {author.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-[#2d3436]">{author.name}</h1>
            {(author as any).credentials && (
              <span className="text-xs bg-[#e67e22]/10 text-[#e67e22] px-2 py-1 rounded-full font-medium">
                {(author as any).credentials}
              </span>
            )}
          </div>
          {(author as any).position && <p className="text-[#a0998f] mt-1">{(author as any).position}</p>}
          {author.bio && <p className="mt-3 text-sm leading-relaxed text-[#636e72]">{author.bio}</p>}
          <div className="flex gap-3 mt-4">
            {(author as any).website && <a href={(author as any).website} target="_blank" className="text-sm text-[#e67e22] hover:underline">Website</a>}
            {(author as any).twitter && <a href={`https://x.com/${(author as any).twitter.replace("@", "")}`} target="_blank" className="text-sm text-[#e67e22] hover:underline">Twitter</a>}
            {(author as any).linkedin && <a href={(author as any).linkedin} target="_blank" className="text-sm text-[#e67e22] hover:underline">LinkedIn</a>}
            {author.email && <a href={`mailto:${author.email}`} className="text-sm text-[#e67e22] hover:underline">Email</a>}
          </div>
        </div>
      </div>

      {/* Posts by Author */}
      <h2 className="font-sans font-bold text-2xl text-[#2d3436] mb-6">Articles by {author.name}</h2>
      {posts.length === 0 ? (
        <p className="text-[#a0998f]">No articles yet.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post: any) => (
            <article key={post.id} className="border-b border-[#e8e0d6] pb-6">
              <Link href={`/posts/${post.slug}`} className="group block">
                {post.featuredImage && (
                  <img src={post.featuredImage} alt="" className="w-full h-40 object-cover rounded-lg mb-3" />
                )}
                <h3 className="font-sans font-semibold text-lg text-[#2d3436] group-hover:text-[#e67e22] transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && <p className="text-sm text-[#636e72] mt-1">{post.excerpt}</p>}
                <div className="text-xs text-[#a0998f] mt-2">
                  {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
