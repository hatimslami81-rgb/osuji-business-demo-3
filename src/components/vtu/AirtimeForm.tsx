import { airtimePresets } from '@/data/dataPlans'
import type { NetworkId } from '@/types'
import { NetworkPicker } from './NetworkPicker'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { formatNgn } from '@/lib/formatCurrency'
import { useLanguage } from '@/context/LanguageContext'

export interface AirtimeDraft {
  network: NetworkId | null
  phone: string
  amount: number | null
  customAmount: string
}

export function AirtimeForm({
  value,
  onChange,
  onContinue,
  error,
}: {
  value: AirtimeDraft
  onChange: (next: AirtimeDraft) => void
  onContinue: () => void
  error?: string
}) {
  const { t } = useLanguage()
  const selectedAmount =
    value.amount === -1 ? Number(value.customAmount) || null : value.amount

  return (
    <div className="space-y-6">
      <NetworkPicker
        value={value.network}
        onChange={(network) => onChange({ ...value, network })}
      />

      <Input
        label={t('phone')}
        name="phone"
        type="tel"
        inputMode="numeric"
        placeholder="e.g. 0803 123 4567"
        value={value.phone}
        onChange={(e) => onChange({ ...value, phone: e.target.value })}
        hint={t('phone_hint')}
      />

      <div>
        <p className="mb-2 text-sm font-medium text-navy-900">{t('amount')}</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {airtimePresets.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => onChange({ ...value, amount, customAmount: '' })}
              className={[
                'rounded-lg border px-2 py-2.5 text-sm font-semibold transition',
                value.amount === amount
                  ? 'border-navy-900 bg-navy-900 text-white'
                  : 'border-slate-200 bg-white text-navy-900 hover:border-navy-300',
              ].join(' ')}
            >
              {formatNgn(amount)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onChange({ ...value, amount: -1 })}
            className={[
              'rounded-lg border px-2 py-2.5 text-sm font-semibold transition',
              value.amount === -1
                ? 'border-navy-900 bg-navy-900 text-white'
                : 'border-slate-200 bg-white text-navy-900 hover:border-navy-300',
            ].join(' ')}
          >
            {t('custom')}
          </button>
        </div>
        {value.amount === -1 ? (
          <div className="mt-3">
            <Input
              label={t('custom_amount')}
              name="customAmount"
              type="number"
              min={50}
              placeholder={t('enter_amount')}
              value={value.customAmount}
              onChange={(e) =>
                onChange({ ...value, customAmount: e.target.value })
              }
            />
          </div>
        ) : null}
      </div>

      {selectedAmount ? (
        <p className="text-sm text-slate-600">
          {t('selected_amount')}{' '}
          <span className="font-semibold text-navy-900">
            {formatNgn(selectedAmount)}
          </span>
        </p>
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button type="button" fullWidth size="lg" onClick={onContinue}>
        {t('continue')}
      </Button>
    </div>
  )
}
