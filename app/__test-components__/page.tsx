// app/__test-components__/page.tsx
// TEMPORARY - apenas para testes Playwright. Guard em produção.
import { notFound } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export default function TestComponentsPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <div className="p-8 space-y-8">
      <section data-testid="buttons-section">
        <h2 className="text-lg font-bold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="sm" data-testid="btn-primary-sm">Primary SM</Button>
          <Button variant="primary" size="md" data-testid="btn-primary-md">Primary MD</Button>
          <Button variant="primary" size="lg" data-testid="btn-primary-lg">Primary LG</Button>
          <Button variant="secondary" size="md" data-testid="btn-secondary">Secondary</Button>
          <Button variant="ghost" size="md" data-testid="btn-ghost">Ghost</Button>
          <Button variant="danger" size="md" data-testid="btn-danger">Danger</Button>
        </div>
      </section>

      <section data-testid="inputs-section">
        <h2 className="text-lg font-bold mb-4">Inputs</h2>
        <div className="space-y-4 max-w-md">
          <Input label="Nome" name="nome" placeholder="João Silva" data-testid="input-default" />
          <Input label="Email" name="email" type="email" placeholder="joao@exemplo.com" data-testid="input-email" />
          <Input label="Com erro" name="erro" error="Campo obrigatório" data-testid="input-error" />
        </div>
      </section>

      <section data-testid="cards-section">
        <h2 className="text-lg font-bold mb-4">Cards</h2>
        <Card data-testid="card-default">
          <p>Conteúdo do card</p>
        </Card>
      </section>

      <section data-testid="badges-section">
        <h2 className="text-lg font-bold mb-4">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="draft" data-testid="badge-draft">Rascunho</Badge>
          <Badge variant="in_progress" data-testid="badge-in-progress">Em Progresso</Badge>
          <Badge variant="completed" data-testid="badge-completed">Concluída</Badge>
          <Badge variant="compra" data-testid="badge-compra">Compra</Badge>
          <Badge variant="venda" data-testid="badge-venda">Venda</Badge>
        </div>
      </section>
    </div>
  )
}
