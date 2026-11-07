import { Link } from 'react-router-dom'
import { getOrders, getVtuTransactions } from '@/lib/storage'
import { formatNgn } from '@/lib/formatCurrency'
import { getNetworkName } from '@/data/dataPlans'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EmptyState } from '@/components/ui/EmptyState'
import { useLanguage } from '@/context/LanguageContext'

export function Account() {
  const { t } = useLanguage()
  const orders = getOrders()
  const vtu = getVtuTransactions()

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow={t('account_eyebrow')}
        title={t('account_title')}
        description={t('account_desc')}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-navy-900">{t('demo_orders')}</h2>
            <Badge tone="demo">{t('local_storage')}</Badge>
          </div>
          {orders.length === 0 ? (
            <EmptyState
              title={t('no_orders')}
              description={t('no_orders_desc')}
              action={
                <Link to="/shop">
                  <Button>{t('go_to_shop')}</Button>
                </Link>
              }
            />
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-navy-900">{order.id}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Badge tone="warning">{order.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {order.items.length}{' '}
                    {order.items.length === 1 ? t('line_item') : t('line_items')} ·{' '}
                    {formatNgn(order.totalNgn)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-navy-900">{t('demo_vtu_txns')}</h2>
            <Badge tone="demo">{t('not_delivered')}</Badge>
          </div>
          {vtu.length === 0 ? (
            <EmptyState
              title={t('no_vtu')}
              description={t('no_vtu_desc')}
              action={
                <Link to="/airtime-data">
                  <Button variant="accent">{t('buy_airtime_data')}</Button>
                </Link>
              }
            />
          ) : (
            <div className="space-y-3">
              {vtu.map((txn) => (
                <div
                  key={txn.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-navy-900">{txn.ref}</p>
                      <p className="text-xs text-slate-500">
                        {getNetworkName(txn.network)} · {txn.phone}
                      </p>
                    </div>
                    <Badge tone="demo">{t('demo')}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {txn.type === 'airtime' ? t('airtime') : t('data')}
                    {txn.planLabel ? ` · ${txn.planLabel}` : ''} ·{' '}
                    {formatNgn(txn.amountNgn)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
