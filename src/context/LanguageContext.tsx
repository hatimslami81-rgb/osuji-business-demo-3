import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  translations,
  type Locale,
  type TranslationKey,
} from '@/i18n/translations'

const STORAGE_KEY = 'osuji_locale'

interface LanguageContextValue {
  locale: Locale
  dir: 'ltr' | 'rtl'
  isRtl: boolean
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ar' || saved === 'en') return saved
  } catch {
    /* ignore */
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readLocale())

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'ar' : 'en')
  }, [locale, setLocale])

  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale])

  const t = useCallback(
    (key: TranslationKey) => translations[locale][key] ?? translations.en[key] ?? key,
    [locale],
  )

  const value = useMemo(
    () => ({
      locale,
      dir: (locale === 'ar' ? 'rtl' : 'ltr') as 'ltr' | 'rtl',
      isRtl: locale === 'ar',
      setLocale,
      toggleLocale,
      t,
    }),
    [locale, setLocale, toggleLocale, t],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
