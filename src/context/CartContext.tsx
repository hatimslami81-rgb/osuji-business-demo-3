import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { products } from '@/data/products'
import { getCart, setCart as persistCart } from '@/lib/storage'
import type { CartItem, Product } from '@/types'

interface CartLine extends CartItem {
  product: Product
}

interface CartContextValue {
  items: CartItem[]
  lines: CartLine[]
  itemCount: number
  subtotal: number
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => getCart())

  useEffect(() => {
    persistCart(items)
  }, [items])

  const addItem = useCallback((productId: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId)
      if (existing) {
        return prev.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        )
      }
      return [...prev, { productId, quantity }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.productId !== productId)
      return prev.map((i) =>
        i.productId === productId ? { ...i, quantity } : i,
      )
    })
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((p) => p.id === item.productId)
          if (!product) return null
          return { ...item, product }
        })
        .filter((line): line is CartLine => line !== null),
    [items],
  )

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.priceNgn * l.quantity, 0),
    [lines],
  )

  const value = useMemo(
    () => ({
      items,
      lines,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    }),
    [items, lines, itemCount, subtotal, addItem, removeItem, setQuantity, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
