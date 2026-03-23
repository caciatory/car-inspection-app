import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  'data-testid'?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', 'data-testid': testId, id, name, ...props }, ref) => {
    const inputId = id ?? name

    return (
      <div data-testid={testId} className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          name={name}
          className={[
            'w-full min-h-[44px] px-3 py-2',
            'border rounded-lg bg-white text-gray-900',
            'focus:outline-none focus:ring-2 focus:ring-[#5e17eb] focus:border-transparent',
            'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
            'placeholder:text-gray-400',
            error ? 'border-red-400 focus:ring-red-400' : 'border-gray-200',
            className,
          ].join(' ')}
          style={{ fontSize: '16px' }}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
