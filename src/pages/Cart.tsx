import { Link } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { CartItemRow } from '@/components/cart/CartItemRow'
import { CartSummary } from '@/components/cart/CartSummary'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Cart() {
  const { lines, subtotal } = useCart()
  const { t } = useLanguage()

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow={t('cart_eyebrow')}
        title={t('cart_title')}
        description={t('cart_desc')}
      />

      {lines.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title={t('cart_empty')}
            description={t('cart_empty_desc')}
            action={
              <Link to="/shop">
                <Button>{t('continue_shopping')}</Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white px-5 shadow-sm sm:px-6">
            {lines.map((line) => (
              <CartItemRow
                key={line.productId}
                product={line.product}
                quantity={line.quantity}
              />
            ))}
          </div>
          <CartSummary subtotal={subtotal} />
        </div>
      )}
    </div>
  )
}
