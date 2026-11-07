import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Smartphone,
  Users,
  LogOut,
} from 'lucide-react'
import { setAdminUnlocked } from '@/lib/storage'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/vtu', label: 'VTU Transactions', icon: Smartphone },
  { to: '/admin/customers', label: 'Customers', icon: Users },
]

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <aside className="flex w-full flex-col border-r border-slate-200 bg-navy-950 text-white lg:w-64">
      <div className="border-b border-white/10 px-5 py-5">
        <p className="font-display text-lg font-bold">Osuji Admin</p>
        <p className="mt-1 text-xs text-white/60">Demo dashboard</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white',
              ].join(' ')
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        className="m-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white"
        onClick={() => {
          setAdminUnlocked(false)
          onLogout()
        }}
      >
        <LogOut className="h-4 w-4" />
        Exit demo admin
      </button>
    </aside>
  )
}
