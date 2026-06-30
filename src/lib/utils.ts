import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim()
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()
}

export function excerpt(content: string, maxLen = 160): string {
  const text = stripHtml(content)
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text
}

export function readingTime(content: string): number {
  return Math.max(1, Math.ceil(stripHtml(content).split(/\s+/).length / 200))
}
