import { Link } from 'react-router-dom'
import { formatNgn } from '@/lib/formatCurrency'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

export function CartSummary({
  subtotal,
  showCheckout = true,
}: {
  subtotal: number
  showCheckout?: boolean
}) {
  const { t } = useLanguage()

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-navy-900">{t('order_summary')}</h2>
      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>{t('subtotal')}</span>
          <span className="font-medium text-navy-900">{formatNgn(subtotal)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>{t('delivery')}</span>
          <span className="text-xs font-medium text-slate-500">
            {t('calculated_checkout')}
          </span>
        </div>
        <div className="border-t border-slate-100 pt-3">
          <div className="flex justify-between text-base font-bold text-navy-900">
            <span>{t('total')}</span>
            <span>{formatNgn(subtotal)}</span>
          </div>
        </div>
      </div>
      <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
        {t('checkout_payment_note')}
      </p>
      {showCheckout ? (
        <div className="mt-5 space-y-3">
          <Link to="/checkout">
            <Button fullWidth>{t('proceed_checkout')}</Button>
          </Link>
          <Link to="/shop">
            <Button variant="secondary" fullWidth>
              {t('continue_shopping')}
            </Button>
          </Link>
        </div>
      ) : null}
    </aside>
  )
}
