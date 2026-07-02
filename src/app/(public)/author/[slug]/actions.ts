"use server"

import { db } from "@/lib/db"

export async function getAuthorBySlug(slug: string) {
  const prisma = await db()
  const author = await prisma.author.findUnique({ where: { slug } })
  return author
}

export async function getPostsByAuthor(authorName: string) {
  const prisma = await db()
  const posts = await prisma.post.findMany({
    where: { author: authorName, status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      publishedAt: true,
    },
  })
  return posts
}
