'use client'

import React from 'react'

interface PlateInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  required?: boolean
  className?: string
}

export function formatPlate(raw: string): string {
  const clean = raw.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 6)
  return clean.replace(/^(\w{2})(\w{2})(\w{2}).*/, '$1-$2-$3')
}

export default function PlateInput({ value, onChange, disabled, required, className }: PlateInputProps) {
  return (
    <div className={`flex items-center ${className ?? ''}`}>
      <div className="flex-shrink-0 bg-blue-600 h-12 w-10 flex items-center justify-center rounded-l-lg">
        <span className="text-white text-xs font-bold">P</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(formatPlate(e.target.value))}
        disabled={disabled}
        required={required}
        maxLength={8}
        placeholder="XX-XX-XX"
        style={{ fontSize: '16px' }}
        className="flex-grow h-12 p-2 bg-white text-black font-bold text-center border-t-2 border-b-2 border-gray-200 focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all tracking-wider"
      />
      <div className="flex-shrink-0 bg-yellow-500 h-12 w-10 rounded-r-lg flex items-center justify-center flex-col">
        <span className="text-black text-[11px] font-bold leading-none">XX</span>
        <div className="w-6 h-[1px] bg-black/50 my-1" />
        <span className="text-black text-[11px] font-bold leading-none">XX</span>
      </div>
    </div>
  )
}
