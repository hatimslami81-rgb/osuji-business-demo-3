import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { useLanguage } from '@/context/LanguageContext'

export function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="container-page py-16">
      <EmptyState
        title={t('page_not_found')}
        description={t('page_not_found_desc')}
        action={
          <Link to="/">
            <Button>{t('return_home')}</Button>
          </Link>
        }
      />
    </div>
  )
}
