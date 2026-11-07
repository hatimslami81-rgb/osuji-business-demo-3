import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import type { Product } from '@/types'
import { formatNgn } from '@/lib/formatCurrency'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { categoryNameKey } from '@/i18n/translations'
import { Button } from '@/components/ui/Button'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { t } = useLanguage()
  const categoryLabel = t(categoryNameKey[product.categoryId])

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <span className="absolute start-3 top-3 rounded-md bg-white/95 px-2 py-1 text-[11px] font-semibold text-navy-900 shadow-sm">
          {categoryLabel}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="line-clamp-2 text-base font-semibold text-navy-900 transition group-hover:text-navy-800">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{product.shortDescription}</p>
        <p className="mt-3 text-lg font-bold text-navy-900">{formatNgn(product.priceNgn)}</p>
        <div className="mt-auto flex gap-2 pt-4">
          <Link to={`/product/${product.id}`} className="flex-1">
            <Button variant="secondary" size="sm" fullWidth type="button">
              {t('view_details')}
            </Button>
          </Link>
          <Button
            size="sm"
            type="button"
            aria-label={`${t('add_to_cart')}: ${product.name}`}
            onClick={() => addItem(product.id)}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  )
}
