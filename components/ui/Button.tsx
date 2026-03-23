import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-gradient-to-r from-[#5e17eb] to-[#108f52] text-white hover:shadow-md',
  secondary: 'bg-white text-[#5e17eb] border border-[#5e17eb] hover:bg-[#5e17eb]/5',
  ghost: 'text-gray-600 hover:bg-gray-100',
  danger: 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100',
}

// All sizes guarantee ≥ 44px height (WCAG touch target)
const sizeClasses: Record<Size, string> = {
  sm: 'min-h-[44px] px-3 text-sm font-medium rounded-lg',
  md: 'min-h-[44px] px-4 text-sm font-medium rounded-xl',
  lg: 'min-h-[48px] px-6 text-base font-medium rounded-xl',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[
          'inline-flex items-center justify-center transition-all duration-200',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          'focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:ring-offset-2',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(' ')}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
