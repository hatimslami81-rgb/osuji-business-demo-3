import { networks } from '@/data/dataPlans'
import type { NetworkId } from '@/types'
import { useLanguage } from '@/context/LanguageContext'

export function NetworkPicker({
  value,
  onChange,
}: {
  value: NetworkId | null
  onChange: (network: NetworkId) => void
}) {
  const { t } = useLanguage()

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-navy-900">{t('select_network')}</p>
      <div className="grid grid-cols-3 gap-3">
        {networks.map((network) => {
          const selected = value === network.id
          return (
            <button
              key={network.id}
              type="button"
              onClick={() => onChange(network.id)}
              className={[
                'rounded-xl border-2 px-3 py-4 text-center text-sm font-bold transition',
                selected
                  ? 'border-navy-900 shadow-sm ring-2 ring-navy-100'
                  : 'border-slate-200 hover:border-slate-300',
                network.colorClass,
              ].join(' ')}
            >
              {network.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
