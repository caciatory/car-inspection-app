import { z } from 'zod'

const plateRegex = /^[A-Z0-9]{2}-[A-Z0-9]{2}-[A-Z0-9]{2}$/

export const createInspectionSchema = z.object({
  service_type: z.enum(['compra', 'venda']),
  vehicle_plate: z.string().regex(plateRegex, 'Matrícula inválida. Use o formato XX-XX-XX'),
  client_full_name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  client_email: z.string().email('Email inválido'),
  client_phone: z.string().min(9, 'Telefone inválido'),
})

export type CreateInspectionInput = z.infer<typeof createInspectionSchema>

export const updateItemSchema = z.object({
  satisfaction: z.enum(['not_satisfied', 'somewhat_satisfied', 'satisfied']).nullable().optional(),
  evaluation: z.enum(['muito_ruim', 'ruim', 'bom', 'muito_bom', 'nao_tem', 'sim', 'nao']).nullable().optional(),
  comments: z.string().max(500).nullable().optional(),
  photo_url: z.string().url().nullable().optional(),
  photo_path: z.string().nullable().optional(),
})

export type UpdateItemInput = z.infer<typeof updateItemSchema>
