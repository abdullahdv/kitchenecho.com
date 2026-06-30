"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

const links = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/posts", label: "Posts", icon: "📝" },
  { href: "/dashboard/categories", label: "Categories", icon: "🏷️" },
  { href: "/dashboard/contact", label: "Contact", icon: "✉️" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
]

export default function Sidebar() {
  const path = usePathname()
  return (
    <aside className="w-64 bg-white border-r border-[#e8e0d6] min-h-screen p-4 hidden md:block">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🍳</span>
          <span className="font-sans font-bold text-[#2d3436]">Kitchen <span className="text-[#e67e22]">Echo</span></span>
        </Link>
        <p className="text-xs text-[#a0998f] mt-1">Dashboard</p>
      </div>
      <nav className="space-y-1">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${path === l.href ? "bg-[#fdf6ec] text-[#e67e22]" : "text-[#636e72] hover:bg-[#f5f0eb]"}`}>
            <span>{l.icon}</span>
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-8">
        <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-colors">
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>
  )
}
