import { Languages } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { t, toggleLocale, locale } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={[
        'inline-flex items-center gap-1.5 rounded-lg border border-navy-100 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy-900 transition hover:bg-navy-50 sm:px-3',
        className,
      ].join(' ')}
      aria-label={t('language_switch_aria')}
      title={t('language_switch_aria')}
    >
      <Languages className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span>{t('language_switch')}</span>
      <span className="sr-only">({locale})</span>
    </button>
  )
}
