let _prisma: any = null
export async function db() {
  if (!_prisma) {
    const getPrisma = await import("@/lib/prisma")
    _prisma = await getPrisma.default()
  }
  return _prisma
}
