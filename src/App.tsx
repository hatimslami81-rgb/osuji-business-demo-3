import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { Shop } from '@/pages/Shop'
import { ProductDetail } from '@/pages/ProductDetail'
import { Cart } from '@/pages/Cart'
import { Checkout } from '@/pages/Checkout'
import { OrderSuccess } from '@/pages/OrderSuccess'
import { AirtimeData } from '@/pages/AirtimeData'
import { WhatsAppAssistant } from '@/pages/WhatsAppAssistant'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'
import { Account } from '@/pages/Account'
import { NotFound } from '@/pages/NotFound'
import { AdminGate } from '@/pages/admin/AdminGate'
import { AdminLayout } from '@/pages/admin/AdminLayout'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { AdminProducts } from '@/pages/admin/AdminProducts'
import { AdminOrders } from '@/pages/admin/AdminOrders'
import { AdminVtu } from '@/pages/admin/AdminVtu'
import { AdminCustomers } from '@/pages/admin/AdminCustomers'

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-success/:orderId" element={<OrderSuccess />} />
            <Route path="airtime-data" element={<AirtimeData />} />
            <Route path="whatsapp-assistant" element={<WhatsAppAssistant />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/admin">
            <Route index element={<AdminGate />} />
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="vtu" element={<AdminVtu />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Route>
          </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </LanguageProvider>
  )
}
