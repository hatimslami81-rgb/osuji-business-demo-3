import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingBag,
  Smartphone,
  Users,
} from 'lucide-react'
import { isAdminUnlocked, setAdminUnlocked } from '@/lib/storage'
import { Badge } from '@/components/ui/Badge'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { DemoBanner } from '@/components/ui/DemoBanner'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { useLanguage } from '@/context/LanguageContext'

const mobileLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/vtu', label: 'VTU', icon: Smartphone },
  { to: '/admin/customers', label: 'Customers', icon: Users },
]

export function AdminLayout() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  if (!isAdminUnlocked()) {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy-50">
      <DemoBanner />
      <div className="flex min-h-0 flex-1">
        <div className="hidden lg:flex">
          <AdminSidebar
            onLogout={() => {
              setAdminUnlocked(false)
              navigate('/admin')
            }}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-slate-200 bg-white px-4 py-3 lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-lg font-bold text-navy-900 lg:hidden">
                Osuji Admin
              </p>
              <div className="ms-auto flex items-center gap-2">
                <LanguageToggle />
                <Badge tone="demo">{t('demo_mode_badge')}</Badge>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-50 lg:hidden"
                  onClick={() => {
                    setAdminUnlocked(false)
                    navigate('/admin')
                  }}
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Exit
                </button>
              </div>
            </div>
            <nav className="mt-3 flex gap-1 overflow-x-auto pb-1 lg:hidden">
              {mobileLinks.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    [
                      'inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold',
                      isActive
                        ? 'bg-navy-900 text-white'
                        : 'bg-navy-50 text-navy-800',
                    ].join(' ')
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
