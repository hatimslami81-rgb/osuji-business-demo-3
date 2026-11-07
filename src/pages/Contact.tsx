import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useLanguage } from '@/context/LanguageContext'

export function Contact() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(t('complete_fields'))
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow={t('contact_eyebrow')}
        title={t('contact_title')}
        description={t('contact_desc')}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {sent ? (
            <div className="py-10 text-center">
              <h2 className="text-xl font-semibold text-navy-900">
                {t('demo_message_recorded')}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{t('demo_message_note')}</p>
              <Button className="mt-6" onClick={() => setSent(false)}>
                {t('send_another')}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={t('full_name')}
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label={t('email')}
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-navy-900">{t('message')}</span>
                <textarea
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-navy-700 focus:ring-2 focus:ring-navy-100"
                />
              </label>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <Button type="submit" fullWidth>
                {t('send_demo_message')}
              </Button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-navy-50 p-6">
            <h2 className="font-semibold text-navy-900">{t('placeholder_contact')}</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>Email: hello@osujibusiness.demo</li>
              <li>{t('phone_on_request')}</li>
              <li>{t('location')}</li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">{t('contact_placeholder_note')}</p>
          </div>
          <Link
            to="/whatsapp-assistant"
            className="block rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 p-6 transition hover:bg-[#25D366]/15"
          >
            <h3 className="font-semibold text-navy-900">{t('wa_eyebrow')}</h3>
            <p className="mt-2 text-sm text-slate-600">{t('try_wa')}</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
