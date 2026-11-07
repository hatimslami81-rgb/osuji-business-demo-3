import { useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, MessageCircle, Search, ShoppingCart, User, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { DemoPill } from '@/components/ui/DemoBanner'
import { LanguageToggle } from '@/components/ui/LanguageToggle'

export function Header() {
  const { itemCount } = useCart()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const nav = [
    { to: '/', label: t('nav_home') },
    { to: '/shop', label: t('nav_shop') },
    { to: '/airtime-data', label: t('nav_vtu') },
    { to: '/about', label: t('nav_about') },
    { to: '/contact', label: t('nav_contact') },
  ]

  function submitSearch(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
    setOpen(false)
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'text-sm font-medium transition-colors',
      isActive ? 'text-accent-600' : 'text-navy-900/80 hover:text-navy-900',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100/80 bg-white/95 backdrop-blur">
      <div className="container-page">
        <div className="flex h-16 items-center gap-3 lg:h-[4.5rem] lg:gap-4">
          <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
            <span className="font-display text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
              Osuji <span className="text-accent-600">Business</span>
            </span>
          </Link>

          <nav className="ms-4 hidden items-center gap-5 lg:ms-6 lg:flex">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-1.5 sm:gap-2.5">
            <LanguageToggle />
            <DemoPill className="hidden sm:inline-flex" />

            <form onSubmit={submitSearch} className="relative hidden md:block">
              <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search_placeholder')}
                className="w-40 rounded-lg border border-slate-200 bg-navy-50 py-2 pe-3 ps-9 text-sm outline-none transition focus:border-navy-700 focus:bg-white focus:ring-2 focus:ring-navy-100 lg:w-52"
                aria-label={t('search_aria')}
              />
            </form>

            <Link
              to="/account"
              className="rounded-lg p-2 text-navy-900 transition hover:bg-navy-50"
              aria-label={t('account_aria')}
            >
              <User className="h-5 w-5" />
            </Link>

            <Link
              to="/cart"
              className="relative rounded-lg p-2 text-navy-900 transition hover:bg-navy-50"
              aria-label={`${t('cart_aria')}, ${itemCount}`}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 ? (
                <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-600 px-1 text-[10px] font-bold text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              ) : null}
            </Link>

            <Link
              to="/whatsapp-assistant"
              className="hidden items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#1ebe57] sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              {t('nav_whatsapp')}
            </Link>

            <button
              type="button"
              className="rounded-lg p-2 text-navy-900 hover:bg-navy-50 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t('close_menu') : t('open_menu')}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-navy-100 pb-4 pt-3 lg:hidden">
            <form onSubmit={submitSearch} className="relative mb-3 md:hidden">
              <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search_placeholder')}
                className="w-full rounded-lg border border-slate-200 bg-navy-50 py-2.5 pe-3 ps-9 text-sm outline-none focus:border-navy-700 focus:bg-white"
              />
            </form>
            <div className="flex flex-col gap-1">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    [
                      'rounded-lg px-3 py-2.5 text-sm font-medium',
                      isActive ? 'bg-navy-50 text-accent-700' : 'text-navy-900',
                    ].join(' ')
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/whatsapp-assistant"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2.5 text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                <MessageCircle className="h-4 w-4" />
                {t('nav_whatsapp_assistant')}
              </Link>
              <Link
                to="/admin"
                className="px-3 py-2 text-xs font-medium text-slate-500"
                onClick={() => setOpen(false)}
              >
                {t('nav_admin')}
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
