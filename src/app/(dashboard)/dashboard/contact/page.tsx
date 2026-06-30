import { db } from "@/lib/db"
import { markContactRead } from "@/lib/actions"

export default async function ContactPage() {
  const prisma = await db()
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <h1 className="text-2xl font-sans font-bold text-[#2d3436] mb-6">Contact Messages</h1>
      {messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((m: any) => (
            <div key={m.id} className={`card ${!m.read ? 'border-l-4 border-l-[#e67e22]' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-sans font-semibold text-sm text-[#2d3436]">{m.name}</p>
                  <p className="text-xs text-[#a0998f]">{m.email} · {new Date(m.createdAt).toLocaleString()}</p>
                </div>
                {!m.read && (
                  <form action={markContactRead.bind(null, m.id)}>
                    <button type="submit" className="text-xs text-[#e67e22] hover:underline">Mark read</button>
                  </form>
                )}
              </div>
              {m.subject && <p className="text-sm font-medium text-[#636e72] mb-1">Subject: {m.subject}</p>}
              <p className="text-sm text-[#636e72] whitespace-pre-wrap">{m.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <span className="text-4xl">📭</span>
          <p className="mt-2 text-[#a0998f]">No messages yet</p>
        </div>
      )}
    </div>
  )
}
