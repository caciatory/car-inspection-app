'use server'

// Server Actions para inspeções — implementadas no Plano 2
// Este ficheiro existe agora para que imports do Plano 2 não quebrem o TypeScript

export async function createInspection(_formData: FormData): Promise<{ inspectionId: string }> {
  throw new Error('Not implemented — ver Plano 2')
}

export async function updateInspectionMeta(_id: string, _data: Record<string, unknown>): Promise<void> {
  throw new Error('Not implemented — ver Plano 2')
}
