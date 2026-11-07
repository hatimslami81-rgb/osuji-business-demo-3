import { useMemo, useState } from 'react'
import { CheckCircle2, Smartphone } from 'lucide-react'
import { AirtimeForm, type AirtimeDraft } from '@/components/vtu/AirtimeForm'
import { DataPlanList, type DataDraft } from '@/components/vtu/DataPlanList'
import { VtuConfirm } from '@/components/vtu/VtuConfirm'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getNetworkName, getPlansForNetwork } from '@/data/dataPlans'
import { generateId, generateVtuRef } from '@/lib/generateId'
import { saveVtuTransaction } from '@/lib/storage'
import type { VtuTransaction } from '@/types'
import { formatNgn } from '@/lib/formatCurrency'
import { useLanguage } from '@/context/LanguageContext'

type Tab = 'airtime' | 'data'
type Stage = 'form' | 'confirm' | 'success'

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, '')
}

function validPhone(phone: string) {
  const d = normalizePhone(phone)
  return d.length === 11 && d.startsWith('0')
}

export function AirtimeData() {
  const { t } = useLanguage()
  const [tab, setTab] = useState<Tab>('airtime')
  const [stage, setStage] = useState<Stage>('form')
  const [error, setError] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [result, setResult] = useState<VtuTransaction | null>(null)

  const [airtime, setAirtime] = useState<AirtimeDraft>({
    network: null,
    phone: '',
    amount: null,
    customAmount: '',
  })
  const [data, setData] = useState<DataDraft>({
    network: null,
    phone: '',
    planId: null,
  })

  const airtimeAmount =
    airtime.amount === -1
      ? Number(airtime.customAmount) || null
      : airtime.amount

  const selectedPlan = useMemo(() => {
    if (!data.network || !data.planId) return null
    return getPlansForNetwork(data.network).find((p) => p.id === data.planId) ?? null
  }, [data])

  function switchTab(next: Tab) {
    setTab(next)
    setStage('form')
    setError('')
    setResult(null)
  }

  function continueAirtime() {
    setError('')
    if (!airtime.network) {
      setError(t('err_select_network'))
      return
    }
    if (!validPhone(airtime.phone)) {
      setError(t('err_phone'))
      return
    }
    if (!airtimeAmount || airtimeAmount < 50) {
      setError(t('err_amount'))
      return
    }
    setStage('confirm')
  }

  function continueData() {
    setError('')
    if (!data.network) {
      setError(t('err_select_network'))
      return
    }
    if (!validPhone(data.phone)) {
      setError(t('err_phone'))
      return
    }
    if (!selectedPlan) {
      setError(t('err_data_plan'))
      return
    }
    setStage('confirm')
  }

  function confirmOrder() {
    setConfirming(true)
    const txn: VtuTransaction =
      tab === 'airtime'
        ? {
            id: generateId('vtu'),
            ref: generateVtuRef(),
            network: airtime.network!,
            type: 'airtime',
            phone: normalizePhone(airtime.phone),
            amountNgn: airtimeAmount!,
            createdAt: new Date().toISOString(),
            status: 'demo',
          }
        : {
            id: generateId('vtu'),
            ref: generateVtuRef(),
            network: data.network!,
            type: 'data',
            phone: normalizePhone(data.phone),
            amountNgn: selectedPlan!.priceNgn,
            planLabel: selectedPlan!.label,
            createdAt: new Date().toISOString(),
            status: 'demo',
          }

    window.setTimeout(() => {
      saveVtuTransaction(txn)
      setResult(txn)
      setStage('success')
      setConfirming(false)
    }, 450)
  }

  function resetFlow() {
    setStage('form')
    setResult(null)
    setError('')
    if (tab === 'airtime') {
      setAirtime({ network: null, phone: '', amount: null, customAmount: '' })
    } else {
      setData({ network: null, phone: '', planId: null })
    }
  }

  return (
    <div>
      <section className="border-b border-slate-200 bg-navy-900 py-12 text-white">
        <div className="container-page max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-500">
            <Smartphone className="h-3.5 w-3.5" />
            {t('vtu_flagship')}
          </div>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">
            {t('vtu_title')}
          </h1>
          <p className="mt-3 text-base text-white/80">{t('vtu_hero_desc')}</p>
        </div>
      </section>

      <div className="container-page py-10 sm:py-14">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-4">
            <SectionHeading
              title={t('vtu_steps_title')}
              description={t('vtu_steps_desc')}
            />
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="rounded-xl border border-slate-200 bg-white p-4">
                {t('vtu_step_1')}
              </li>
              <li className="rounded-xl border border-slate-200 bg-white p-4">
                {t('vtu_step_2')}
              </li>
              <li className="rounded-xl border border-slate-200 bg-white p-4">
                {t('vtu_step_3')}
              </li>
            </ul>
            <p className="text-xs text-slate-500">{t('vtu_sample_note')}</p>
          </aside>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6 flex rounded-xl bg-navy-50 p-1">
              {(['airtime', 'data'] as Tab[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => switchTab(item)}
                  className={[
                    'flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition',
                    tab === item
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'text-navy-800 hover:bg-white',
                  ].join(' ')}
                >
                  {item === 'airtime' ? t('airtime') : t('data')}
                </button>
              ))}
            </div>

            {stage === 'form' ? (
              tab === 'airtime' ? (
                <AirtimeForm
                  value={airtime}
                  onChange={setAirtime}
                  onContinue={continueAirtime}
                  error={error}
                />
              ) : (
                <DataPlanList
                  value={data}
                  onChange={setData}
                  onContinue={continueData}
                  error={error}
                />
              )
            ) : null}

            {stage === 'confirm' ? (
              <VtuConfirm
                network={getNetworkName(
                  tab === 'airtime' ? airtime.network! : data.network!,
                )}
                phone={tab === 'airtime' ? airtime.phone : data.phone}
                service={
                  tab === 'airtime'
                    ? `${t('airtime')} · ${formatNgn(airtimeAmount!)}`
                    : `${selectedPlan!.label} · ${selectedPlan!.size}`
                }
                amount={
                  tab === 'airtime' ? airtimeAmount! : selectedPlan!.priceNgn
                }
                onBack={() => setStage('form')}
                onConfirm={confirmOrder}
                confirming={confirming}
              />
            ) : null}

            {stage === 'success' && result ? (
              <div className="space-y-5 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-accent-600" />
                <Badge tone="demo">{t('demo_transaction')}</Badge>
                <h2 className="text-2xl font-semibold text-navy-900">
                  {t('demo_txn_success')}
                </h2>
                <p className="text-sm text-slate-600">{t('demo_txn_not_delivered')}</p>
                <div className="rounded-2xl bg-navy-50 px-4 py-5 text-start text-sm">
                  <p className="text-slate-500">{t('reference')}</p>
                  <p className="mt-1 font-mono font-semibold text-navy-900">
                    {result.ref}
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <p>
                      <span className="text-slate-500">{t('network')}:</span>{' '}
                      {getNetworkName(result.network)}
                    </p>
                    <p>
                      <span className="text-slate-500">{t('phone')}:</span> {result.phone}
                    </p>
                    <p>
                      <span className="text-slate-500">{t('type')}:</span>{' '}
                      <span className="capitalize">
                        {result.type === 'airtime' ? t('airtime') : t('data')}
                      </span>
                    </p>
                    <p>
                      <span className="text-slate-500">{t('amount')}:</span>{' '}
                      {formatNgn(result.amountNgn)}
                    </p>
                  </div>
                </div>
                <Button fullWidth onClick={resetFlow}>
                  {t('start_another_vtu')}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
