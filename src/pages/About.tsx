import { SectionHeading } from '@/components/ui/SectionHeading'
import { useLanguage } from '@/context/LanguageContext'

export function About() {
  const { t } = useLanguage()

  const cards = [
    ['about_trading_title', 'about_trading_text'],
    ['about_digital_title', 'about_digital_text'],
    ['about_growth_title', 'about_growth_text'],
  ] as const

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-navy-950/70" />
        <div className="container-page relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-500">
            {t('about_eyebrow')}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold">{t('about_title')}</h1>
          <p className="mt-4 text-base leading-relaxed text-white/85">{t('about_hero')}</p>
        </div>
      </section>

      <div className="container-page space-y-14 py-14">
        <SectionHeading title={t('about_what_title')} description={t('about_what_desc')} />

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map(([titleKey, textKey]) => (
            <div
              key={titleKey}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-navy-900">{t(titleKey)}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{t(textKey)}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
          <p className="font-semibold">{t('about_notice_title')}</p>
          <p className="mt-2">{t('about_notice_text')}</p>
        </div>
      </div>
    </div>
  )
}
