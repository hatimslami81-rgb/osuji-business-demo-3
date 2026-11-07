import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatNgn } from '@/lib/formatCurrency'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/types'

export function CartItemRow({
  product,
  quantity,
}: {
  product: Product
  quantity: number
}) {
  const { setQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4 border-b border-slate-100 py-5 last:border-0">
      <Link to={`/product/${product.id}`} className="shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-24 w-24 rounded-xl object-cover"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Link
            to={`/product/${product.id}`}
            className="font-semibold text-navy-900 hover:text-navy-800"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-sm text-slate-500">{formatNgn(product.priceNgn)}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center rounded-lg border border-slate-200">
            <button
              type="button"
              className="p-2 text-navy-900 hover:bg-navy-50"
              onClick={() => setQuantity(product.id, quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-8 text-center text-sm font-semibold">{quantity}</span>
            <button
              type="button"
              className="p-2 text-navy-900 hover:bg-navy-50"
              onClick={() => setQuantity(product.id, quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <p className="min-w-24 text-right text-sm font-bold text-navy-900">
            {formatNgn(product.priceNgn * quantity)}
          </p>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            onClick={() => removeItem(product.id)}
            aria-label={`Remove ${product.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
