import { Link, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { getOrderById } from '@/lib/storage'
import { formatNgn } from '@/lib/formatCurrency'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'

export function OrderSuccess() {
  const { orderId } = useParams()
  const order = orderId ? getOrderById(orderId) : undefined
  const { t } = useLanguage()

  if (!order) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title={t('order_not_found')}
          description={t('order_not_found_desc')}
          action={
            <Link to="/shop">
              <Button>{t('back_to_shop')}</Button>
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="container-page py-14">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-14 w-14 text-accent-600" />
        <div className="mt-4 flex justify-center">
          <Badge tone="demo">{t('simulated_payment')}</Badge>
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold text-navy-900">
          {t('order_success_title')}
        </h1>
        <p className="mt-3 text-sm text-slate-600">{t('order_success_desc')}</p>
        <p className="mt-6 rounded-xl bg-navy-50 px-4 py-3 font-mono text-sm font-semibold text-navy-900">
          {order.id}
        </p>
        <dl className="mt-8 space-y-3 text-start text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">{t('customer')}</dt>
            <dd className="font-medium text-navy-900">{order.customer.fullName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">{t('items')}</dt>
            <dd className="font-medium text-navy-900">
              {order.items.reduce((n, i) => n + i.quantity, 0)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">{t('payment')}</dt>
            <dd className="font-medium capitalize text-navy-900">
              {order.paymentMethod.replace('_', ' ')}
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
            <dt className="text-slate-500">{t('total')}</dt>
            <dd className="text-lg font-bold text-navy-900">
              {formatNgn(order.totalNgn)}
            </dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/account">
            <Button>{t('view_demo_account')}</Button>
          </Link>
          <Link to="/shop">
            <Button variant="secondary">{t('continue_shopping')}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
