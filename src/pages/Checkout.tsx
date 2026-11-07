import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { CartSummary } from '@/components/cart/CartSummary'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { generateOrderId } from '@/lib/generateId'
import { saveOrder } from '@/lib/storage'
import type { CustomerInfo, Order, PaymentMethod } from '@/types'
import type { TranslationKey } from '@/i18n/translations'

type Errors = Partial<Record<keyof CustomerInfo | 'paymentMethod', string>>

const emptyCustomer: CustomerInfo = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
}

export function Checkout() {
  const { lines, subtotal, clearCart } = useCart()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [customer, setCustomer] = useState<CustomerInfo>(emptyCustomer)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  function validate(
    nextCustomer: CustomerInfo,
    nextPayment: PaymentMethod | null,
  ): Errors {
    const next: Errors = {}
    if (!nextCustomer.fullName.trim()) next.fullName = t('required_name')
    if (
      !nextCustomer.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextCustomer.email)
    ) {
      next.email = t('required_email')
    }
    if (
      !nextCustomer.phone.trim() ||
      nextCustomer.phone.replace(/\D/g, '').length < 10
    ) {
      next.phone = t('required_phone')
    }
    if (!nextCustomer.address.trim()) next.address = t('required_address')
    if (!nextCustomer.city.trim()) next.city = t('required_city')
    if (!nextCustomer.state.trim()) next.state = t('required_state')
    if (!nextPayment) next.paymentMethod = t('required_payment')
    return next
  }

  if (lines.length === 0 && !submitting) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title={t('nothing_checkout')}
          description={t('nothing_checkout_desc')}
          action={
            <Link to="/shop">
              <Button>{t('browse_shop')}</Button>
            </Link>
          }
        />
      </div>
    )
  }

  if (submitting) {
    return (
      <div className="container-page py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
          <p className="text-lg font-semibold text-navy-900">{t('placing_order')}</p>
          <p className="mt-2 text-sm text-slate-500">{t('checkout_payment_note')}</p>
        </div>
      </div>
    )
  }

  function updateField<K extends keyof CustomerInfo>(key: K, value: CustomerInfo[K]) {
    setCustomer((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const nextErrors = validate(customer, paymentMethod)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0 || !paymentMethod) return

    const order: Order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      customer,
      items: lines.map((line) => ({
        productId: line.productId,
        name: line.product.name,
        priceNgn: line.product.priceNgn,
        quantity: line.quantity,
        imageUrl: line.product.imageUrl,
      })),
      paymentMethod,
      status: 'pending',
      totalNgn: subtotal,
      demo: true,
    }

    // Persist first, then show transition UI, then navigate, then clear cart.
    saveOrder(order)
    setSubmitting(true)
    navigate(`/order-success/${order.id}`, { replace: true })
    clearCart()
  }

  const field = (key: keyof CustomerInfo, labelKey: TranslationKey, type = 'text') => (
    <Input
      label={t(labelKey)}
      name={key}
      type={type}
      value={customer[key]}
      onChange={(e) => updateField(key, e.target.value)}
      error={errors[key]}
    />
  )

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow={t('checkout_eyebrow')}
        title={t('checkout_title')}
        description={t('checkout_desc')}
      />

      <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.8fr]">
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-navy-900">{t('customer_info')}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">{field('fullName', 'full_name')}</div>
            {field('email', 'email', 'email')}
            {field('phone', 'phone', 'tel')}
            <div className="sm:col-span-2">{field('address', 'address')}</div>
            {field('city', 'city')}
            {field('state', 'state')}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-navy-900">
              {t('payment_method')}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  ['bank_transfer', 'bank_transfer'],
                  ['online', 'online_payment'],
                ] as const
              ).map(([value, labelKey]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPaymentMethod(value)}
                  className={[
                    'rounded-xl border px-4 py-4 text-start transition',
                    paymentMethod === value
                      ? 'border-navy-900 bg-navy-50 ring-2 ring-navy-100'
                      : 'border-slate-200 hover:border-slate-300',
                  ].join(' ')}
                >
                  <p className="font-semibold text-navy-900">{t(labelKey)}</p>
                  <p className="mt-1 text-xs text-slate-500">{t('simulated_for_demo')}</p>
                </button>
              ))}
            </div>
            {errors.paymentMethod ? (
              <p className="mt-2 text-xs text-red-600">{errors.paymentMethod}</p>
            ) : null}
          </div>

          <Button type="submit" size="lg" fullWidth disabled={submitting}>
            {submitting ? t('placing_order') : t('place_demo_order')}
          </Button>
        </div>

        <CartSummary subtotal={subtotal} showCheckout={false} />
      </form>
    </div>
  )
}
