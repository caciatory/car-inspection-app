import { z } from 'zod'

export const createEmployeeSchema = z.object({
  email: z.string().email('Email inválido'),
  full_name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  username: z.string()
    .min(3, 'Username deve ter pelo menos 3 caracteres')
    .regex(/^[a-z0-9_]+$/, 'Username só pode conter letras minúsculas, números e _'),
  role: z.enum(['technician', 'super_admin']),
  password: z.string().min(8, 'Palavra-passe deve ter pelo menos 8 caracteres'),
})

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>
