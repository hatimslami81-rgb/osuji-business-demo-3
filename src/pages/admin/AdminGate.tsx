import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { isAdminUnlocked, setAdminUnlocked } from '@/lib/storage'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { DemoBanner } from '@/components/ui/DemoBanner'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { useLanguage } from '@/context/LanguageContext'

export function AdminGate() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  useEffect(() => {
    if (isAdminUnlocked()) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [navigate])

  function enter() {
    setAdminUnlocked(true)
    navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-navy-50">
      <DemoBanner />
      <div className="container-page flex justify-end py-3">
        <LanguageToggle />
      </div>
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-white">
            <Shield className="h-7 w-7" />
          </div>
          <Badge tone="demo">{t('demo_access')}</Badge>
          <h1 className="mt-4 font-display text-2xl font-semibold text-navy-900">
            {t('admin_title')}
          </h1>
          <p className="mt-3 text-sm text-slate-600">{t('admin_desc')}</p>
          <Button className="mt-8" fullWidth size="lg" onClick={enter}>
            {t('enter_demo_admin')}
          </Button>
          <Link
            to="/"
            className="mt-4 inline-block text-sm font-medium text-navy-800 hover:text-navy-900"
          >
            {t('back_to_storefront')}
          </Link>
        </div>
      </div>
    </div>
  )
}
