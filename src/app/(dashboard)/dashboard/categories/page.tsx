import { db } from "@/lib/db"
import { createCategory, deleteCategory } from "@/lib/actions"

export default async function CategoriesPage() {
  const prisma = await db()
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } })

  return (
    <div>
      <h1 className="text-2xl font-sans font-bold text-[#2d3436] mb-6">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-sans font-bold text-sm text-[#2d3436] mb-4">Add Category</h2>
          <form action={createCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#636e72] mb-1">Name *</label>
              <input name="name" className="input-field" placeholder="e.g. Kitchen Tips" required />
            </div>
            <button type="submit" className="btn-primary text-xs py-2">Create</button>
          </form>
        </div>
        <div className="card">
          <h2 className="font-sans font-bold text-sm text-[#2d3436] mb-4">All Categories ({categories.length})</h2>
          {categories.length > 0 ? (
            <div className="space-y-2">
              {categories.map((c: any) => (
                <div key={c.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#f5f0eb]">
                  <span className="text-sm font-medium text-[#2d3436]">{c.name}</span>
                  <form action={deleteCategory.bind(null, c.id)} >
                    <button type="submit" className="text-xs text-red-500 hover:underline">Delete</button>
                  </form>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#a0998f] text-center py-4">No categories yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
