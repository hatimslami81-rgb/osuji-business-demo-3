import { getPlansForNetwork } from '@/data/dataPlans'
import type { NetworkId } from '@/types'
import { NetworkPicker } from './NetworkPicker'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { formatNgn } from '@/lib/formatCurrency'
import { useLanguage } from '@/context/LanguageContext'

export interface DataDraft {
  network: NetworkId | null
  phone: string
  planId: string | null
}

export function DataPlanList({
  value,
  onChange,
  onContinue,
  error,
}: {
  value: DataDraft
  onChange: (next: DataDraft) => void
  onContinue: () => void
  error?: string
}) {
  const { t } = useLanguage()
  const plans = value.network ? getPlansForNetwork(value.network) : []

  return (
    <div className="space-y-6">
      <NetworkPicker
        value={value.network}
        onChange={(network) => onChange({ ...value, network, planId: null })}
      />

      <Input
        label={t('phone')}
        name="dataPhone"
        type="tel"
        inputMode="numeric"
        placeholder="e.g. 0803 123 4567"
        value={value.phone}
        onChange={(e) => onChange({ ...value, phone: e.target.value })}
        hint={t('phone_hint')}
      />

      <div>
        <p className="mb-2 text-sm font-medium text-navy-900">{t('select_data_plan')}</p>
        {!value.network ? (
          <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            {t('choose_network_plans')}
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {plans.map((plan) => {
              const selected = value.planId === plan.id
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => onChange({ ...value, planId: plan.id })}
                  className={[
                    'rounded-xl border p-4 text-start transition',
                    selected
                      ? 'border-accent-600 bg-accent-50 ring-2 ring-accent-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300',
                  ].join(' ')}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-navy-900">{plan.size}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {plan.validity} · {plan.label}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-navy-900">
                      {formatNgn(plan.priceNgn)}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button type="button" fullWidth size="lg" onClick={onContinue}>
        {t('continue')}
      </Button>
    </div>
  )
}
