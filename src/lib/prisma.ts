let _prisma: any = null

export default async function getPrisma() {
  if (!_prisma) {
    const [mod, { PrismaLibSql }] = await Promise.all([
      import("@/generated/prisma/client"),
      import("@prisma/adapter-libsql"),
    ])
    const url = process.env.DATABASE_URL || "file:./dev.db"
    const authToken = process.env.TURSO_AUTH_TOKEN
    const adapter = authToken && url.startsWith("libsql")
      ? new PrismaLibSql({ url, authToken })
      : new PrismaLibSql({ url })
    _prisma = new mod.PrismaClient({ adapter })
  }
  return _prisma
}
