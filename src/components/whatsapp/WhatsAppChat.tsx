import { useMemo, useState, type ReactNode } from 'react'
import { ExternalLink, RotateCcw } from 'lucide-react'
import { getPlansForNetwork, getNetworkName, airtimePresets } from '@/data/dataPlans'
import { generateId, generateVtuRef } from '@/lib/generateId'
import { saveVtuTransaction } from '@/lib/storage'
import { formatNgn } from '@/lib/formatCurrency'
import type { NetworkId, VtuTransaction } from '@/types'
import { Button } from '@/components/ui/Button'

type Step =
  | 'welcome'
  | 'airtime-network'
  | 'airtime-phone'
  | 'airtime-amount'
  | 'airtime-confirm'
  | 'data-network'
  | 'data-phone'
  | 'data-plan'
  | 'data-confirm'
  | 'support'
  | 'done'

interface Message {
  id: string
  from: 'bot' | 'user'
  text: string
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

function isValidPhone(phone: string) {
  const d = digitsOnly(phone)
  return d.length === 11 && d.startsWith('0')
}

export function WhatsAppChat() {
  const [step, setStep] = useState<Step>('welcome')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm0',
      from: 'bot',
      text: 'Welcome to Osuji Business! How can we help you today?',
    },
  ])
  const [network, setNetwork] = useState<NetworkId | null>(null)
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState<number | null>(null)
  const [planId, setPlanId] = useState<string | null>(null)
  const [phoneDraft, setPhoneDraft] = useState('')
  const [lastRef, setLastRef] = useState<string | null>(null)

  const plans = useMemo(
    () => (network ? getPlansForNetwork(network) : []),
    [network],
  )
  const selectedPlan = plans.find((p) => p.id === planId)

  function push(from: Message['from'], text: string) {
    setMessages((prev) => [...prev, { id: generateId('msg'), from, text }])
  }

  function reset() {
    setStep('welcome')
    setNetwork(null)
    setPhone('')
    setAmount(null)
    setPlanId(null)
    setPhoneDraft('')
    setLastRef(null)
    setMessages([
      {
        id: generateId('msg'),
        from: 'bot',
        text: 'Welcome to Osuji Business! How can we help you today?',
      },
    ])
  }

  function chooseWelcome(option: 'airtime' | 'data' | 'support') {
    if (option === 'airtime') {
      push('user', '1. Buy Airtime')
      push('bot', 'Great — select a network for airtime.')
      setStep('airtime-network')
    } else if (option === 'data') {
      push('user', '2. Buy Data')
      push('bot', 'Select a network for your data plan.')
      setStep('data-network')
    } else {
      push('user', '3. Contact Support')
      push(
        'bot',
        'This is a demo assistant. For a live deployment, this option would connect to your support team via WhatsApp Business. Use the Contact page or Open WhatsApp placeholder for now.',
      )
      setStep('support')
    }
  }

  function chooseNetwork(next: NetworkId, kind: 'airtime' | 'data') {
    setNetwork(next)
    push('user', getNetworkName(next))
    push('bot', `Enter the phone number for ${getNetworkName(next)}.`)
    setStep(kind === 'airtime' ? 'airtime-phone' : 'data-phone')
  }

  function submitPhone(kind: 'airtime' | 'data') {
    if (!isValidPhone(phoneDraft)) {
      push('bot', 'Please enter a valid 11-digit Nigerian number starting with 0.')
      return
    }
    setPhone(phoneDraft)
    push('user', phoneDraft)
    if (kind === 'airtime') {
      push('bot', 'Select an airtime amount.')
      setStep('airtime-amount')
    } else {
      push('bot', 'Select a data plan.')
      setStep('data-plan')
    }
  }

  function chooseAmount(value: number) {
    setAmount(value)
    push('user', formatNgn(value))
    push('bot', 'Please confirm this demo airtime order.')
    setStep('airtime-confirm')
  }

  function choosePlan(id: string) {
    const plan = plans.find((p) => p.id === id)
    if (!plan) return
    setPlanId(id)
    push('user', `${plan.size} · ${formatNgn(plan.priceNgn)}`)
    push('bot', 'Please confirm this demo data order.')
    setStep('data-confirm')
  }

  function confirm(kind: 'airtime' | 'data') {
    if (!network || !phone) return
    const txn: VtuTransaction = {
      id: generateId('vtu'),
      ref: generateVtuRef(),
      network,
      type: kind,
      phone: digitsOnly(phone),
      amountNgn:
        kind === 'airtime'
          ? amount ?? 0
          : selectedPlan?.priceNgn ?? 0,
      planLabel: kind === 'data' ? selectedPlan?.label : undefined,
      createdAt: new Date().toISOString(),
      status: 'demo',
    }
    saveVtuTransaction(txn)
    setLastRef(txn.ref)
    push('user', 'Confirm demo order')
    push(
      'bot',
      `Demo transaction created successfully.\nReference: ${txn.ref}\n\nNo airtime or data was delivered. This is a simulated WhatsApp VTU flow.`,
    )
    setStep('done')
  }

  const quickReplies = (() => {
    switch (step) {
      case 'welcome':
        return (
          <>
            <Quick onClick={() => chooseWelcome('airtime')}>1. Buy Airtime</Quick>
            <Quick onClick={() => chooseWelcome('data')}>2. Buy Data</Quick>
            <Quick onClick={() => chooseWelcome('support')}>3. Contact Support</Quick>
          </>
        )
      case 'airtime-network':
      case 'data-network':
        return (
          <>
            {(['mtn', 'airtel', 'glo'] as NetworkId[]).map((n) => (
              <Quick
                key={n}
                onClick={() =>
                  chooseNetwork(n, step.startsWith('airtime') ? 'airtime' : 'data')
                }
              >
                {getNetworkName(n)}
              </Quick>
            ))}
          </>
        )
      case 'airtime-phone':
      case 'data-phone':
        return (
          <div className="flex w-full gap-2">
            <input
              value={phoneDraft}
              onChange={(e) => setPhoneDraft(e.target.value)}
              placeholder="0803..."
              className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm outline-none focus:border-[#25D366]"
            />
            <button
              type="button"
              onClick={() =>
                submitPhone(step.startsWith('airtime') ? 'airtime' : 'data')
              }
              className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
            >
              Send
            </button>
          </div>
        )
      case 'airtime-amount':
        return (
          <>
            {airtimePresets.map((a) => (
              <Quick key={a} onClick={() => chooseAmount(a)}>
                {formatNgn(a)}
              </Quick>
            ))}
          </>
        )
      case 'data-plan':
        return (
          <>
            {plans.map((p) => (
              <Quick key={p.id} onClick={() => choosePlan(p.id)}>
                {p.size} · {formatNgn(p.priceNgn)}
              </Quick>
            ))}
          </>
        )
      case 'airtime-confirm':
        return (
          <>
            <Quick onClick={() => confirm('airtime')}>Confirm demo order</Quick>
            <Quick onClick={reset}>Start over</Quick>
          </>
        )
      case 'data-confirm':
        return (
          <>
            <Quick onClick={() => confirm('data')}>Confirm demo order</Quick>
            <Quick onClick={reset}>Start over</Quick>
          </>
        )
      case 'support':
      case 'done':
        return <Quick onClick={reset}>Start new chat</Quick>
      default:
        return null
    }
  })()

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
      <div className="flex items-center justify-between bg-[#075E54] px-4 py-3 text-white">
        <div>
          <p className="font-semibold">Osuji Business</p>
          <p className="text-xs text-white/80">WhatsApp VTU Assistant · Demo</p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg p-2 hover:bg-white/10"
          aria-label="Reset chat"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div
        className="flex h-[420px] flex-col gap-2 overflow-y-auto px-4 py-4"
        style={{
          backgroundImage:
            'linear-gradient(rgba(229,221,213,0.95), rgba(229,221,213,0.95))',
        }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={[
              'max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm shadow-sm',
              m.from === 'bot'
                ? 'self-start rounded-tl-sm bg-white text-navy-900'
                : 'self-end rounded-tr-sm bg-[#DCF8C6] text-navy-900',
            ].join(' ')}
          >
            {m.text}
          </div>
        ))}
        {lastRef && step === 'done' ? (
          <p className="self-center rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-slate-600">
            Saved locally · {lastRef}
          </p>
        ) : null}
      </div>

      <div className="space-y-3 border-t border-slate-200 bg-white p-3">
        <div className="flex flex-wrap gap-2">{quickReplies}</div>
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex"
        >
          <Button variant="secondary" size="sm" type="button">
            Open WhatsApp
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </a>
        <p className="text-[11px] text-slate-500">
          Placeholder link — not connected to WhatsApp Business API.
        </p>
      </div>
    </div>
  )
}

function Quick({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-[#25D366]/40 bg-white px-3 py-1.5 text-xs font-semibold text-[#075E54] transition hover:bg-[#25D366]/10"
    >
      {children}
    </button>
  )
}
