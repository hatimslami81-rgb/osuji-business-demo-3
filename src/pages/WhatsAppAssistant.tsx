import { Link } from 'react-router-dom'
import { WhatsAppChat } from '@/components/whatsapp/WhatsAppChat'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'
export function WhatsAppAssistant() {
  const { t } = useLanguage()

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow={t('wa_eyebrow')}
            title={t('wa_title')}
            description={t('wa_desc')}
          />
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li className="rounded-xl border border-slate-200 bg-white p-4">
              {t('wa_airtime_desc')}
            </li>
            <li className="rounded-xl border border-slate-200 bg-white p-4">
              {t('wa_data_desc')}
            </li>
            <li className="rounded-xl border border-slate-200 bg-white p-4">
              {t('wa_support_desc')}
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/airtime-data">
              <Button variant="accent">{t('open_full_vtu')}</Button>
            </Link>
            <a href="https://wa.me/" target="_blank" rel="noreferrer">
              <Button variant="secondary">{t('open_whatsapp')}</Button>
            </a>
          </div>
          <p className="mt-3 text-xs text-slate-500">{t('wa_placeholder_note')}</p>
        </div>
        <WhatsAppChat />
      </div>
    </div>
  )
}
