import { db } from "@/lib/db"

export async function getSiteSettings() {
  const prisma = await db()
  const homepage = await prisma.homepageSettings.findFirst()
  return { homepage }
}

export async function getLatestPosts(limit = 10) {
  const prisma = await db()
  return prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: limit,
  })
}

export async function getPostBySlug(slug: string) {
  const prisma = await db()
  return prisma.post.findUnique({ where: { slug, status: "PUBLISHED" } })
}

export async function getCategories() {
  const prisma = await db()
  return prisma.category.findMany({ orderBy: { name: "asc" } })
}
