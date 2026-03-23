import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/auth/LogoutButton'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm flex flex-col">
        <div className="p-6 bg-gradient-to-br from-brand-purple to-brand-green">
          <h1 className="text-white font-bold text-lg">Inspeção Auto</h1>
          <p className="text-white/70 text-sm mt-1">{profile?.full_name}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <a href="/dashboard" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors min-h-[44px]">
            Dashboard
          </a>
          <a href="/inspections" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors min-h-[44px]">
            Inspeções
          </a>
          {profile?.role === 'super_admin' && (
            <>
              <div className="pt-4 pb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase px-3">Admin</p>
              </div>
              <a href="/admin" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors min-h-[44px]">
                Dashboard Admin
              </a>
              <a href="/admin/employees" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors min-h-[44px]">
                Funcionários
              </a>
            </>
          )}
        </nav>
        <div className="p-4 border-t">
          <LogoutButton />
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
