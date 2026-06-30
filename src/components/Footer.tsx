import Link from "next/link"
export default function Footer() {
  return (
    <footer className="bg-[#2d3436] text-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3"><span className="text-xl">🍳</span><span className="text-lg font-sans font-bold">Kitchen <span className="text-[#e67e22]">Echo</span></span></div>
            <p className="text-sm text-[#b2bec3]">Your daily dose of kitchen wisdom — smart tips, honest reviews, and delicious inspiration.</p>
          </div>
          <div>
            <h3 className="font-sans font-semibold text-xs uppercase tracking-wider mb-4 text-[#e67e22]">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-[#b2bec3] hover:text-white">Home</Link></li>
              <li><Link href="/posts" className="text-sm text-[#b2bec3] hover:text-white">Articles</Link></li>
              <li><Link href="/contact" className="text-sm text-[#b2bec3] hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-sans font-semibold text-xs uppercase tracking-wider mb-4 text-[#e67e22]">Stay Connected</h3>
            <p className="text-sm text-[#b2bec3] mb-3">Get kitchen tips in your inbox.</p>
            <form action="/api/subscribe" method="POST" className="flex gap-2">
              <input type="email" name="email" placeholder="Your email" className="flex-1 rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#e67e22]" required />
              <button type="submit" className="rounded-lg bg-[#e67e22] px-4 py-2 text-sm font-semibold hover:bg-[#d35400]">Join</button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-[#b2bec3]">&copy; {new Date().getFullYear()} Kitchen Echo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
