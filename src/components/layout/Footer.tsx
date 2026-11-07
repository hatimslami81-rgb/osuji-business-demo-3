import { Link } from 'react-router-dom'
import { Globe, Share2 } from 'lucide-react'
import { categories } from '@/data/categories'
import { useLanguage } from '@/context/LanguageContext'
import { categoryNameKey } from '@/i18n/translations'

export function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    ['/', t('nav_home')],
    ['/shop', t('nav_shop')],
    ['/airtime-data', t('nav_vtu')],
    ['/whatsapp-assistant', t('nav_whatsapp_assistant')],
    ['/about', t('nav_about')],
    ['/contact', t('nav_contact')],
    ['/admin', t('nav_admin')],
  ] as const

  return (
    <footer className="mt-auto border-t border-navy-900/10 bg-navy-900 text-navy-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold text-white">
            Osuji <span className="text-accent-500">Business</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-navy-100/80">
            {t('footer_blurb')}
          </p>
          <p className="mt-4 text-xs text-navy-100/60">{t('footer_demo_note')}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t('quick_links')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-navy-100/80 transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t('product_categories')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/shop?category=${c.id}`}
                  className="text-navy-100/80 transition hover:text-white"
                >
                  {t(categoryNameKey[c.id])}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t('contact')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-100/80">
            <li>Email: hello@osujibusiness.demo</li>
            <li>{t('phone_on_request')}</li>
            <li>{t('location')}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {[Share2, Globe, Share2, Globe].map((Icon, i) => (
              <span
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
                aria-hidden
                title="Social placeholder"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-navy-100/50">{t('social_placeholders')}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-navy-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Osuji Business. {t('footer_copy')}
          </p>
          <p>{t('footer_simulated')}</p>
        </div>
      </div>
    </footer>
  )
}
