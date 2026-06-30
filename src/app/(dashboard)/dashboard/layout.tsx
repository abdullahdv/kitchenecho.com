import Sidebar from "@/components/dashboard/Sidebar"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect("/login")
  return (
    <div className="flex min-h-screen bg-[#faf8f5]">
      <Sidebar />
      <div className="flex-1">
        {/* Mobile Top Bar */}
        <div className="md:hidden bg-white border-b border-[#e8e0d6] px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg">🍳</span>
            <span className="font-sans font-bold text-sm text-[#2d3436]">Kitchen Echo</span>
          </Link>
          <span className="text-xs text-[#a0998f]">Dashboard</span>
        </div>
        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  )
}
