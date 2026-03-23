import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg'
}

export default function Card({ padding = 'md', className = '', children, ...props }: CardProps) {
  const paddingClasses = {
    sm: 'p-3 tablet:p-4',
    md: 'p-4 tablet:p-6',
    lg: 'p-5 tablet:p-8',
  }

  return (
    <div
      className={[
        'bg-white rounded-xl border border-gray-200 shadow-sm',
        paddingClasses[padding],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
