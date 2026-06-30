import { subscribeAction } from "@/lib/actions"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const formData = await request.formData()
  const result = await subscribeAction(formData)
  const html = `<html><head><meta http-equiv="refresh" content="3;url=/"></head><body style="font-family:Georgia;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#faf8f5"><div style="text-align:center;background:white;padding:2rem;border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,0.1)"><p style="font-size:3rem;margin:0">✅</p><h2 style="font-family:Arial;color:#2d3436">${result?.message || "Subscribed!"}</h2><p style="color:#636e72">Redirecting...</p></div></body></html>`
  return new NextResponse(html, { headers: { "content-type": "text/html" } })
}
