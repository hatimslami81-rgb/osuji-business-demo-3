import { Link } from 'react-router-dom'
import {
  Headphones,
  Lock,
  PackageCheck,
  ShoppingBag,
  Smartphone,
} from 'lucide-react'
import { categories } from '@/data/categories'
import { getFeaturedProducts } from '@/data/products'
import { CategoryCard } from '@/components/products/CategoryCard'
import { ProductCard } from '@/components/products/ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'
import type { TranslationKey } from '@/i18n/translations'

export function Home() {
  const { t, isRtl } = useLanguage()
  const featured = getFeaturedProducts()

  const why: { icon: typeof PackageCheck; titleKey: TranslationKey; textKey: TranslationKey }[] = [
    {
      icon: PackageCheck,
      titleKey: 'why_reliable_title',
      textKey: 'why_reliable_text',
    },
    {
      icon: ShoppingBag,
      titleKey: 'why_ordering_title',
      textKey: 'why_ordering_text',
    },
    {
      icon: Lock,
      titleKey: 'why_payment_title',
      textKey: 'why_payment_text',
    },
    {
      icon: Headphones,
      titleKey: 'why_support_title',
      textKey: 'why_support_text',
    },
  ]

  return (
    <div>
      <section className="relative isolate min-h-[78vh] overflow-hidden bg-navy-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div
          className={[
            'absolute inset-0',
            isRtl
              ? 'bg-gradient-to-l from-navy-950 via-navy-950/85 to-navy-950/35'
              : 'bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/35',
          ].join(' ')}
        />
        <div className="container-page relative flex min-h-[78vh] items-center py-16">
          <div className="max-w-2xl animate-[fadeIn_0.7s_ease-out]">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent-500">
              Osuji Business
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {t('hero_title')}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              {t('hero_desc')}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop">
                <Button size="lg" className="bg-white text-navy-900 hover:bg-navy-50">
                  {t('explore_products')}
                </Button>
              </Link>
              <Link to="/airtime-data">
                <Button size="lg" variant="accent">
                  {t('buy_airtime_data')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow={t('categories_eyebrow')}
          title={t('categories_title')}
          description={t('categories_desc')}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-500">
              {t('digital_services')}
            </p>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              {t('vtu_promo_title')}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
              {t('vtu_promo_desc')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                ['MTN', 'bg-mtn text-navy-950'],
                ['Airtel', 'bg-airtel text-white'],
                ['Glo', 'bg-glo text-white'],
              ].map(([name, cls]) => (
                <span
                  key={name}
                  className={`rounded-xl px-4 py-2 text-sm font-bold ${cls}`}
                >
                  {name}
                </span>
              ))}
            </div>
            <Link to="/airtime-data" className="mt-8 inline-flex">
              <Button size="lg" variant="accent">
                <Smartphone className="h-4 w-4" />
                {t('buy_airtime_data')}
              </Button>
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <img
              src="https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1200&q=80"
              alt=""
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
            <p className="mt-4 text-sm text-white/70">{t('vtu_promo_note')}</p>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t('featured_eyebrow')}
            title={t('featured_title')}
            description={t('featured_desc')}
          />
          <Link to="/shop">
            <Button variant="secondary">{t('view_all_products')}</Button>
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow={t('why_eyebrow')}
            title={t('why_title')}
            description={t('why_desc')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(({ icon: Icon, titleKey, textKey }) => (
              <div key={titleKey} className="rounded-2xl border border-slate-100 bg-navy-50/50 p-6">
                <div className="mb-4 inline-flex rounded-xl bg-navy-900 p-3 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900">{t(titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
