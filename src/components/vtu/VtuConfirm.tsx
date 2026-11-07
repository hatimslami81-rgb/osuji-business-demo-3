import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatNgn } from '@/lib/formatCurrency'
import { useLanguage } from '@/context/LanguageContext'

export function VtuConfirm({
  network,
  phone,
  service,
  amount,
  onBack,
  onConfirm,
  confirming,
}: {
  network: string
  phone: string
  service: string
  amount: number
  onBack: () => void
  onConfirm: () => void
  confirming?: boolean
}) {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-navy-900">{t('confirm_demo_order')}</h3>
        <Badge tone="demo">{t('simulated')}</Badge>
      </div>

      <dl className="space-y-3 rounded-2xl border border-slate-200 bg-navy-50/60 p-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">{t('network')}</dt>
          <dd className="font-semibold text-navy-900">{network}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">{t('phone_number')}</dt>
          <dd className="font-semibold text-navy-900">{phone}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">{t('selected_service')}</dt>
          <dd className="text-end font-semibold text-navy-900">{service}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-slate-200 pt-3">
          <dt className="text-slate-500">{t('amount')}</dt>
          <dd className="text-lg font-bold text-navy-900">{formatNgn(amount)}</dd>
        </div>
      </dl>

      <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950">
        {t('vtu_confirm_note')}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="secondary" fullWidth type="button" onClick={onBack}>
          {t('back')}
        </Button>
        <Button
          variant="accent"
          fullWidth
          type="button"
          onClick={onConfirm}
          disabled={confirming}
        >
          {confirming ? t('creating_demo') : t('confirm_order')}
        </Button>
      </div>
    </div>
  )
}
