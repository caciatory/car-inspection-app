// ============================================================
// ENUMS
// ============================================================
export type UserRole = 'super_admin' | 'technician'
export type InspectionStatus = 'draft' | 'in_progress' | 'completed'
export type ServiceType = 'compra' | 'venda'
export type SatisfactionLevel = 'not_satisfied' | 'somewhat_satisfied' | 'satisfied'
export type EvaluationLevel = 'muito_ruim' | 'ruim' | 'bom' | 'muito_bom' | 'nao_tem' | 'sim' | 'nao'

// ============================================================
// DB ROWS (refletem exatamente as tabelas)
// ============================================================
export interface Profile {
  id: string
  full_name: string
  username: string
  role: UserRole
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Inspection {
  id: string
  public_token: string
  technician_id: string
  status: InspectionStatus
  service_type: ServiceType
  vehicle_plate: string
  client_full_name: string
  client_email: string
  client_phone: string
  vehicle_brand: string | null
  vehicle_model: string | null
  vehicle_version: string | null
  vehicle_manufacture_year: string | null
  vehicle_model_year: string | null
  vehicle_chassis: string | null
  vehicle_engine_number: string | null
  current_mileage: string | null
  mileage_tampering: string | null
  previous_owners: string | null
  accident_history: string | null
  maintenance_history: string | null
  inspection_history: string | null
  tax_status: string | null
  doors: string | null
  fuel_type: string | null
  transmission_type: string | null
  drive_type: string | null
  engine_power: string | null
  engine_torque: string | null
  created_at: string
  updated_at: string
}

export interface Section {
  id: string
  inspection_id: string
  name: string
  sort_order: number
  created_at: string
}

export interface Subsection {
  id: string
  section_id: string
  name: string
  sort_order: number
  created_at: string
}

export interface InspectionItem {
  id: string
  subsection_id: string
  name: string
  satisfaction: SatisfactionLevel | null
  evaluation: EvaluationLevel | null
  comments: string | null
  photo_url: string | null
  photo_path: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export interface VehicleEquipment {
  id: string
  inspection_id: string
  equipment_section: string
  item_name: string
  is_present: boolean
  rating: number | null
  comment: string | null
  is_custom: boolean
}

// ============================================================
// NESTED / VIEW TYPES (para uso nas pages)
// ============================================================
export interface SubsectionWithItems extends Subsection {
  items: InspectionItem[]
}

export interface SectionWithSubsections extends Section {
  subsections: SubsectionWithItems[]
}

export interface InspectionWithSections extends Inspection {
  sections: SectionWithSubsections[]
  profile?: Pick<Profile, 'full_name' | 'username'>
}

// ============================================================
// SEED DATA
// ============================================================
export const DEFAULT_INSPECTION_SECTIONS = [
  {
    name: 'Pintura',
    subsections: [
      {
        name: 'Exterior',
        items: ['Estado Geral', 'Riscos', 'Oxidação'],
      },
    ],
  },
  {
    name: 'Rodas',
    subsections: [
      {
        name: 'Pneus e Jantes',
        items: ['Pneus', 'Alinhamento', 'Balanceamento'],
      },
    ],
  },
  {
    name: 'Motor',
    subsections: [
      {
        name: 'Funcionamento',
        items: ['Funcionamento', 'Ruídos', 'Fugas'],
      },
    ],
  },
  {
    name: 'Interior',
    subsections: [
      {
        name: 'Habitáculo',
        items: ['Estofos', 'Painel', 'Ar Condicionado'],
      },
    ],
  },
] as const
