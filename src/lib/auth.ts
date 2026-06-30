import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import crypto from "crypto"

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
  return `${salt}:${hash}`
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":")
  if (!salt || !hash) return false
  return hash === crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const { db } = await import("@/lib/db")
        const prisma = await db()
        const user = await prisma.user.findUnique({ where: { email: String(credentials.email) } })
        if (!user?.passwordHash) return null
        if (!verifyPassword(String(credentials.password), user.passwordHash)) return null
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { (token as any).id = user.id; (token as any).role = (user as any).role }
      return token
    },
    async session({ session, token }) {
      if (token) { (session.user as any).id = token.id; (session.user as any).role = (token as any).role }
      return session
    },
  },
})

export { hashPassword }
