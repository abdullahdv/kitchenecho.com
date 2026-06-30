import { db } from "@/lib/db"
import { updateSettings } from "@/lib/actions"

export default async function SettingsPage() {
  const prisma = await db()
  const settings = await prisma.homepageSettings.findFirst() || {}

  return (
    <div>
      <h1 className="text-2xl font-sans font-bold text-[#2d3436] mb-6">Homepage Settings</h1>
      <div className="card max-w-2xl">
        <form action={updateSettings} className="space-y-5">
          {[
            ["siteName", "Site Name", settings.siteName || "Kitchen Echo"],
            ["tagline", "Tagline", settings.tagline || ""],
            ["description", "SEO Description", settings.description || ""],
            ["heroTitle", "Hero Title", settings.heroTitle || ""],
            ["heroSubtitle", "Hero Subtitle", settings.heroSubtitle || ""],
            ["heroCta", "Hero CTA Button Text", settings.heroCta || ""],
            ["footerText", "Footer Text", settings.footerText || ""],
            ["aboutText", "About Text", settings.aboutText || ""],
          ].map(([name, label, val]) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-[#2d3436] mb-1">{label}</label>
              {name === "aboutText" || name === "description" ? (
                <textarea id={name} name={name} rows={3} className="input-field" defaultValue={val} />
              ) : (
                <input id={name} name={name} className="input-field" defaultValue={val} />
              )}
            </div>
          ))}
          <button type="submit" className="btn-primary text-xs py-2">Save Settings</button>
        </form>
      </div>
    </div>
  )
}
