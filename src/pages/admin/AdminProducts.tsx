import { products } from '@/data/products'
import { getCategoryById } from '@/data/categories'
import { formatNgn } from '@/lib/formatCurrency'
import { Badge } from '@/components/ui/Badge'

export function AdminProducts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy-900">
          Products
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Demo catalog inventory used by the public shop.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-navy-50/70 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Product</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Featured</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const category = getCategoryById(product.categoryId)
              return (
                <tr key={product.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.imageUrl}
                        alt=""
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-navy-900">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{category?.name ?? product.categoryId}</td>
                  <td className="px-4 py-3 font-semibold">
                    {formatNgn(product.priceNgn)}
                  </td>
                  <td className="px-4 py-3">
                    {product.featured ? (
                      <Badge tone="success">Yes</Badge>
                    ) : (
                      <Badge>No</Badge>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
