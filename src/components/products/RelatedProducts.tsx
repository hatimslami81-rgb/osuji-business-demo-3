import type { Product } from '@/types'
import { getRelatedProducts } from '@/data/products'
import { ProductCard } from './ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useLanguage } from '@/context/LanguageContext'

export function RelatedProducts({ product }: { product: Product }) {
  const { t } = useLanguage()
  const related = getRelatedProducts(product)
  if (related.length === 0) return null

  return (
    <section className="mt-16">
      <SectionHeading title={t('related_products')} description={t('related_desc')} />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
