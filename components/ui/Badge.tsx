import { HTMLAttributes } from 'react'

type BadgeVariant = 'draft' | 'in_progress' | 'completed' | 'compra' | 'venda' | 'super_admin' | 'technician'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  draft:       'bg-gray-100 text-gray-600',
  in_progress: 'bg-blue-100 text-blue-700',
  completed:   'bg-green-100 text-green-700',
  compra:      'bg-[#5e17eb]/10 text-[#5e17eb]',
  venda:       'bg-[#108f52]/10 text-[#108f52]',
  super_admin: 'bg-yellow-100 text-yellow-700',
  technician:  'bg-[#5e17eb]/10 text-[#5e17eb]',
}

export default function Badge({ variant, className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}
