import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/types'
import { useLanguage } from '@/context/LanguageContext'
import { categoryDescKey, categoryNameKey } from '@/i18n/translations'

export function CategoryCard({ category }: { category: Category }) {
  const { t, isRtl } = useLanguage()

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-navy-900 text-white shadow-sm">
      <img
        src={category.imageUrl}
        alt={t(categoryNameKey[category.id])}
        className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-500 group-hover:scale-105 group-hover:opacity-45"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent" />
      <div className="relative flex min-h-[280px] flex-col justify-end p-6">
        <h3 className="font-display text-2xl font-semibold">
          {t(categoryNameKey[category.id])}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">
          {t(categoryDescKey[category.id])}
        </p>
        <Link
          to={`/shop?category=${category.id}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-500 transition hover:text-accent-500/90"
        >
          {t('explore')}
          <ArrowRight
            className={[
              'h-4 w-4 transition group-hover:translate-x-0.5',
              isRtl ? 'rotate-180 group-hover:-translate-x-0.5' : '',
            ].join(' ')}
          />
        </Link>
      </div>
    </article>
  )
}
