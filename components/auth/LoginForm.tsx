'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Key, Globe, Share2, Mail, MessageCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Credenciais inválidas. Verifique o email e a palavra-passe.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple to-brand-green flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">

        {/* Painel esquerdo — branding */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-brand-purple to-brand-green p-8 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Olá,<br />bem-vindo!
            </h2>
            <p className="text-white/80 text-base md:text-lg">
              Sistema de Inspeção de Veículos
            </p>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 border-white/30 rounded-full hidden md:block" />
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 border-white/30 rounded-full hidden md:block" />
        </div>

        {/* Painel direito — formulário */}
        <div className="w-full md:w-3/5 p-6 md:p-12">
          <div className="mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ fontSize: '16px' }}
                  className="pl-10 w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                  placeholder="Introduza o seu email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Palavra-passe
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ fontSize: '16px' }}
                  className="pl-10 w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                  placeholder="Introduza a palavra-passe"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-brand-purple to-brand-green text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium text-lg disabled:opacity-60 min-h-[44px]"
            >
              {loading ? 'A entrar...' : 'Entrar'}
            </button>

            <div className="mt-6 flex justify-center space-x-6 text-gray-500">
              <a href="#" className="hover:text-brand-purple transition-colors"><Globe size={24} /></a>
              <a href="#" className="hover:text-brand-green transition-colors"><Share2 size={24} /></a>
              <a href="#" className="hover:text-brand-purple transition-colors"><MessageCircle size={24} /></a>
              <a href="#" className="hover:text-brand-green transition-colors"><Mail size={24} /></a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
