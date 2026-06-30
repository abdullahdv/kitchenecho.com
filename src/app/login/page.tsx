"use client"
import { useRouter } from "next/navigation"
import { loginAction } from "@/lib/actions"
import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    const form = e.currentTarget
    try {
      await loginAction(new FormData(form))
      router.push("/dashboard")
    } catch (err: any) {
      setError(err?.message || "Invalid credentials")
    }
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl">🍳</Link>
          <h1 className="mt-2 text-2xl font-sans font-bold text-[#2d3436]">Welcome Back</h1>
          <p className="text-sm text-[#636e72] mt-1">Sign in to the dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="card space-y-4">
          {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#2d3436] mb-1">Email</label>
            <input id="email" name="email" type="email" required className="input-field" placeholder="admin@kitchenecho.com" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#2d3436] mb-1">Password</label>
            <input id="password" name="password" type="password" required className="input-field" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-primary w-full">Sign In</button>
        </form>
      </div>
    </div>
  )
}
