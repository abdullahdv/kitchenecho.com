'use server'

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { hashPassword, signIn } from "@/lib/auth"
import { slugify } from "@/lib/utils"

export async function loginAction(formData: FormData) {
  await signIn("credentials", { email: String(formData.get("email")), password: String(formData.get("password")), redirectTo: "/dashboard" })
}

export async function registerAction(formData: FormData) {
  const email = String(formData.get("email"))
  const password = String(formData.get("password"))
  const name = String(formData.get("name") || email.split("@")[0])
  const prisma = await db()
  if (await prisma.user.findUnique({ where: { email } })) throw new Error("Email exists")
  await prisma.user.create({ data: { email, name, passwordHash: hashPassword(password) } })
  await signIn("credentials", { email, password, redirectTo: "/dashboard" })
}

export async function createPost(formData: FormData) {
  const prisma = await db()
  await prisma.post.create({
    data: {
      title: String(formData.get("title")),
      slug: slugify(String(formData.get("title"))) + "-" + Date.now().toString(36),
      content: String(formData.get("content") || ""),
      excerpt: String(formData.get("excerpt") || ""),
      featuredImage: String(formData.get("featuredImage") || ""),
      tags: String(formData.get("tags") || ""),
      status: String(formData.get("status") || "DRAFT"),
      categoryId: String(formData.get("categoryId") || ""),
      author: String(formData.get("author") || ""),
      publishedAt: String(formData.get("status")) === "PUBLISHED" ? new Date() : null,
    },
  })
  revalidatePath("/dashboard/posts"); revalidatePath("/")
}

export async function updatePost(id: string, formData: FormData) {
  const prisma = await db()
  const existing = await prisma.post.findUnique({ where: { id } })
  if (!existing) throw new Error("Not found")
  const title = String(formData.get("title"))
  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug: title !== existing.title ? slugify(title) + "-" + Date.now().toString(36) : existing.slug,
      content: String(formData.get("content") || ""),
      excerpt: String(formData.get("excerpt") || ""),
      featuredImage: String(formData.get("featuredImage") || ""),
      tags: String(formData.get("tags") || ""),
      status: String(formData.get("status") || "DRAFT"),
      categoryId: String(formData.get("categoryId") || ""),
      author: String(formData.get("author") || ""),
      publishedAt: String(formData.get("status")) === "PUBLISHED" && !existing.publishedAt ? new Date() : existing.publishedAt,
    },
  })
  revalidatePath("/dashboard/posts"); revalidatePath("/")
}

export async function deletePost(id: string) {
  const prisma = await db()
  await prisma.post.delete({ where: { id } })
  revalidatePath("/dashboard/posts"); revalidatePath("/")
}

export async function createCategory(formData: FormData) {
  const name = String(formData.get("name"))
  const prisma = await db()
  await prisma.category.create({ data: { name, slug: slugify(name) } })
  revalidatePath("/dashboard/categories")
}

export async function deleteCategory(id: string) {
  const prisma = await db()
  await prisma.category.delete({ where: { id } })
  revalidatePath("/dashboard/categories")
}

export async function createAuthor(formData: FormData) {
  const name = String(formData.get("name"))
  const prisma = await db()
  await prisma.author.create({ data: { name, slug: slugify(name), bio: String(formData.get("bio") || "") } })
  revalidatePath("/dashboard/authors")
}

export async function submitContact(formData: FormData) {
  const prisma = await db()
  await prisma.contactMessage.create({ data: { name: String(formData.get("name")), email: String(formData.get("email")), subject: String(formData.get("subject") || ""), message: String(formData.get("message")) } })
}

export async function markContactRead(id: string) {
  const prisma = await db()
  await prisma.contactMessage.update({ where: { id }, data: { read: true } })
  revalidatePath("/dashboard/contact")
}

export async function subscribeAction(formData: FormData) {
  const email = String(formData.get("email"))
  const prisma = await db()
  const existing = await prisma.subscription.findUnique({ where: { email } })
  if (existing) {
    if (existing.status === "UNSUBSCRIBED") await prisma.subscription.update({ where: { email }, data: { status: "ACTIVE" } })
    return { message: "Already subscribed!" }
  }
  await prisma.subscription.create({ data: { email, source: "website" } })
  return { message: "Subscribed!" }
}

export async function updateSettings(formData: FormData) {
  const data: Record<string, string> = {}
  const fields = ["siteName", "tagline", "description", "footerText", "heroTitle", "heroSubtitle", "heroCta", "aboutText"]
  for (const f of fields) data[f] = String(formData.get(f) || "")
  const prisma = await db()
  const existing = await prisma.homepageSettings.findFirst()
  if (existing) await prisma.homepageSettings.update({ where: { id: existing.id }, data })
  else await prisma.homepageSettings.create({ data })
  revalidatePath("/"); revalidatePath("/dashboard/settings")
}
