import { Info } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export function DemoBanner({ className = '' }: { className?: string }) {
  const { t } = useLanguage()

  return (
    <div
      className={[
        'border-b border-amber-200 bg-amber-50 text-amber-950',
        className,
      ].join(' ')}
      role="status"
    >
      <div className="container-page flex items-start gap-2 py-2 text-xs sm:items-center sm:text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" aria-hidden />
        <p>
          <span className="font-semibold">{t('demo_mode')}</span> {t('demo_banner')}
        </p>
      </div>
    </div>
  )
}

export function DemoPill({ className = '' }: { className?: string }) {
  const { t } = useLanguage()

  return (
    <span
      className={[
        'inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-900',
        className,
      ].join(' ')}
    >
      {t('demo')}
    </span>
  )
}
