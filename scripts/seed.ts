import { PrismaClient } from "../src/generated/prisma/client.js"
import { PrismaLibSql } from "@prisma/adapter-libsql"
import crypto from "crypto"

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
  return `${salt}:${hash}`
}

async function main() {
  const url = process.env.DATABASE_URL || "file:./dev.db"
  const adapter = new PrismaLibSql({ url })
  const prisma = new PrismaClient({ adapter })

  const adminEmail = process.env.ADMIN_EMAIL || "admin@kitchenecho.com"
  const adminPass = process.env.ADMIN_PASSWORD || "admin123"

  if (!(await prisma.user.findUnique({ where: { email: adminEmail } }))) {
    await prisma.user.create({
      data: { email: adminEmail, name: "Admin", passwordHash: hashPassword(adminPass), role: "admin" },
    })
    console.log("✓ Admin:", adminEmail, "/", adminPass)
  }

  for (const cat of [
    { name: "Kitchen Tips", slug: "kitchen-tips" },
    { name: "Product Reviews", slug: "product-reviews" },
    { name: "Cooking Basics", slug: "cooking-basics" },
    { name: "Kitchen Design", slug: "kitchen-design" },
    { name: "Organization", slug: "organization" },
    { name: "Meal Prep", slug: "meal-prep" },
  ]) {
    await prisma.category.upsert({ where: { slug: cat.slug }, update: {}, create: cat })
    console.log("  ✓", cat.name)
  }

  if (!(await prisma.homepageSettings.findFirst())) {
    await prisma.homepageSettings.create({
      data: {
        siteName: "Kitchen Echo",
        tagline: "Your daily dose of kitchen wisdom",
        heroTitle: "Your Kitchen, Amplified",
        heroSubtitle: "Smart tips, honest reviews, and delicious inspiration for your home kitchen",
        heroCta: "Explore Articles",
        footerText: "(c) {year} Kitchen Echo",
        description: "Smart kitchen tips and honest reviews for your home.",
      },
    })
    console.log("✓ Settings created")
  }

  await prisma.$disconnect()
  console.log("\n✓ Seed complete!")
}

main().catch((e) => { console.error("FAILED:", e); process.exit(1) })
