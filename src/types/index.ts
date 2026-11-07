export type CategoryId =
  | 'oil-gas'
  | 'solid-minerals'
  | 'laboratory'
  | 'electronics'
  | 'chemicals'

export type NetworkId = 'mtn' | 'airtel' | 'glo'

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'
export type PaymentMethod = 'bank_transfer' | 'online'

export interface Category {
  id: CategoryId
  name: string
  slug: string
  description: string
  imageUrl: string
}

export interface Product {
  id: string
  name: string
  slug: string
  categoryId: CategoryId
  priceNgn: number
  shortDescription: string
  description: string
  imageUrl: string
  featured?: boolean
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface CustomerInfo {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
}

export interface OrderItem {
  productId: string
  name: string
  priceNgn: number
  quantity: number
  imageUrl: string
}

export interface Order {
  id: string
  createdAt: string
  customer: CustomerInfo
  items: OrderItem[]
  paymentMethod: PaymentMethod
  status: OrderStatus
  totalNgn: number
  demo: true
}

export interface DataPlan {
  id: string
  network: NetworkId
  label: string
  size: string
  validity: string
  priceNgn: number
}

export interface VtuTransaction {
  id: string
  ref: string
  network: NetworkId
  type: 'airtime' | 'data'
  phone: string
  amountNgn: number
  planLabel?: string
  createdAt: string
  status: 'demo'
}

export interface DemoCustomer {
  id: string
  name: string
  email: string
  phone: string
  orders: number
  totalSpentNgn: number
}

export interface SalesPoint {
  month: string
  amountNgn: number
}
