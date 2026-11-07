import type { CartItem, Order, VtuTransaction } from '@/types'

const KEYS = {
  cart: 'osuji_cart',
  orders: 'osuji_orders',
  vtu: 'osuji_vtu_transactions',
  admin: 'osuji_admin_demo',
} as const

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getCart(): CartItem[] {
  return readJson<CartItem[]>(KEYS.cart, [])
}

export function setCart(items: CartItem[]): void {
  writeJson(KEYS.cart, items)
}

export function getOrders(): Order[] {
  return readJson<Order[]>(KEYS.orders, [])
}

export function saveOrder(order: Order): void {
  const orders = getOrders()
  orders.unshift(order)
  writeJson(KEYS.orders, orders)
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id)
}

export function getVtuTransactions(): VtuTransaction[] {
  return readJson<VtuTransaction[]>(KEYS.vtu, [])
}

export function saveVtuTransaction(txn: VtuTransaction): void {
  const list = getVtuTransactions()
  list.unshift(txn)
  writeJson(KEYS.vtu, list)
}

export function isAdminUnlocked(): boolean {
  return localStorage.getItem(KEYS.admin) === '1'
}

export function setAdminUnlocked(value: boolean): void {
  if (value) localStorage.setItem(KEYS.admin, '1')
  else localStorage.removeItem(KEYS.admin)
}
