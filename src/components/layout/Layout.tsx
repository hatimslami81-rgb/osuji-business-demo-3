import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { DemoBanner } from '@/components/ui/DemoBanner'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <DemoBanner />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
