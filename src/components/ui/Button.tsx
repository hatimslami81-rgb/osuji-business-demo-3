import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-navy-900 text-white hover:bg-navy-800 hover:text-white active:bg-navy-950 active:text-white focus-visible:ring-navy-700',
  secondary:
    'bg-white text-navy-900 border border-navy-100 hover:bg-navy-50 hover:text-navy-900 active:bg-navy-100 active:text-navy-900 focus-visible:ring-navy-700',
  accent:
    'bg-accent-600 text-white hover:bg-accent-700 hover:text-white active:bg-accent-700 active:text-white focus-visible:ring-accent-500',
  ghost:
    'bg-transparent text-navy-900 hover:bg-navy-100 hover:text-navy-900 active:bg-navy-100 focus-visible:ring-navy-700',
  danger:
    'bg-red-600 text-white hover:bg-red-700 hover:text-white active:bg-red-700 active:text-white focus-visible:ring-red-500',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
