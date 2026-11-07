import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { getProductById } from '@/data/products'
import { formatNgn } from '@/lib/formatCurrency'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { categoryNameKey } from '@/i18n/translations'
import { RelatedProducts } from '@/components/products/RelatedProducts'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'

export function ProductDetail() {
  const { id } = useParams()
  const product = id ? getProductById(id) : undefined
  const { addItem } = useCart()
  const { t } = useLanguage()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title={t('product_not_found')}
          description={t('product_not_found_desc')}
          action={
            <Link to="/shop">
              <Button>{t('back_to_shop')}</Button>
            </Link>
          }
        />
      </div>
    )
  }

  const categoryLabel = t(categoryNameKey[product.categoryId])

  function handleAdd() {
    addItem(product!.id, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mb-6 text-sm text-slate-500">
        <Link to="/shop" className="hover:text-navy-900">
          {t('nav_shop')}
        </Link>
        <span className="mx-2">/</span>
        <Link
          to={`/shop?category=${product.categoryId}`}
          className="hover:text-navy-900"
        >
          {categoryLabel}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-navy-900">{product.name}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        <div>
          <Badge tone="info">{categoryLabel}</Badge>
          <h1 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-navy-900">
            {formatNgn(product.priceNgn)}
          </p>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-lg border border-slate-200">
              <button
                type="button"
                className="p-3 hover:bg-navy-50"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-10 text-center font-semibold">{qty}</span>
              <button
                type="button"
                className="p-3 hover:bg-navy-50"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button size="lg" onClick={handleAdd}>
              <ShoppingCart className="h-4 w-4" />
              {added ? t('added_to_cart') : t('add_to_cart')}
            </Button>
          </div>

          <p className="mt-4 text-xs text-slate-500">{t('product_disclaimer')}</p>
        </div>
      </div>

      <RelatedProducts product={product} />
    </div>
  )
}
