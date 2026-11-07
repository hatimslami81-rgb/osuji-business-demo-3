import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categories } from '@/data/categories'
import { searchProducts } from '@/data/products'
import { ProductGrid } from '@/components/products/ProductGrid'
import { EmptyState } from '@/components/ui/EmptyState'
import { Input } from '@/components/ui/Input'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useLanguage } from '@/context/LanguageContext'
import { categoryNameKey } from '@/i18n/translations'

export function Shop() {
  const { t } = useLanguage()
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? 'all'
  const qParam = params.get('q') ?? ''
  const [query, setQuery] = useState(qParam)

  useEffect(() => {
    setQuery(qParam)
  }, [qParam])

  const filtered = useMemo(
    () => searchProducts(qParam, category),
    [qParam, category],
  )

  function updateCategory(next: string) {
    const nextParams = new URLSearchParams(params)
    if (next === 'all') nextParams.delete('category')
    else nextParams.set('category', next)
    setParams(nextParams)
  }

  function submitSearch(e: FormEvent) {
    e.preventDefault()
    const nextParams = new URLSearchParams(params)
    if (query.trim()) nextParams.set('q', query.trim())
    else nextParams.delete('q')
    setParams(nextParams)
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow={t('shop_eyebrow')}
        title={t('shop_title')}
        description={t('shop_desc')}
      />

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <form onSubmit={submitSearch} className="w-full max-w-md">
          <Input
            label={t('search_products')}
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_by_name')}
          />
        </form>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={category === 'all'}
            onClick={() => updateCategory('all')}
            label={t('all')}
          />
          {categories.map((c) => (
            <FilterChip
              key={c.id}
              active={category === c.id}
              onClick={() => updateCategory(c.id)}
              label={t(categoryNameKey[c.id])}
            />
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        {t('showing')} {filtered.length}{' '}
        {filtered.length === 1 ? t('product') : t('products')}
        {qParam ? ` ${t('for_query')} “${qParam}”` : ''}
      </p>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState title={t('no_products')} description={t('no_products_desc')} />
        ) : (
          <ProductGrid products={filtered} />
        )}
      </div>
    </div>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-full px-3.5 py-1.5 text-xs font-semibold transition',
        active
          ? 'bg-navy-900 text-white'
          : 'bg-white text-navy-800 ring-1 ring-slate-200 hover:ring-slate-300',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
