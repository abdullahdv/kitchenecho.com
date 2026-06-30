import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "./globals.css"

export const metadata: Metadata = {
  title: { default: "Kitchen Echo — Your Daily Dose of Kitchen Wisdom", template: "%s | Kitchen Echo" },
  description: "Smart kitchen tips, honest product reviews, and delicious inspiration for every home cook.",
  openGraph: { title: "Kitchen Echo", description: "Smart kitchen tips, honest product reviews, and delicious inspiration.", type: "website" },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header session={session} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
