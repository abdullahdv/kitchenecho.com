"use client"
import Link from "next/link"
import { useState } from "react"

export default function Header({ session }: { session: any }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e8e0d6]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            <span className="text-xl font-sans font-bold text-[#2d3436] tracking-tight">Kitchen <span className="text-[#e67e22]">Echo</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-[#636e72] hover:text-[#e67e22] transition-colors">Home</Link>
            <Link href="/posts" className="text-sm font-medium text-[#636e72] hover:text-[#e67e22] transition-colors">Articles</Link>
            <Link href="/contact" className="text-sm font-medium text-[#636e72] hover:text-[#e67e22] transition-colors">Contact</Link>
            {session ? (
              <Link href="/dashboard" className="btn-primary text-xs py-2 px-4">Dashboard</Link>
            ) : (
              <Link href="/login" className="btn-secondary text-xs py-2 px-4">Sign In</Link>
            )}
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-[#f5f0eb]">
            <svg className="h-6 w-6 text-[#2d3436]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 border-t border-[#e8e0d6] pt-4 space-y-3">
            <Link href="/" className="block text-sm py-1" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/posts" className="block text-sm py-1" onClick={() => setOpen(false)}>Articles</Link>
            <Link href="/contact" className="block text-sm py-1" onClick={() => setOpen(false)}>Contact</Link>
            {session ? <Link href="/dashboard" className="block btn-primary text-center text-xs">Dashboard</Link> : <Link href="/login" className="block btn-secondary text-center text-xs">Sign In</Link>}
          </div>
        )}
      </div>
    </header>
  )
}
