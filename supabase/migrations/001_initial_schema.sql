-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  username    TEXT UNIQUE NOT NULL,
  role        TEXT NOT NULL CHECK (role IN ('super_admin', 'technician')),
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INSPECTIONS
-- ============================================================
CREATE TABLE inspections (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_token          TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(12), 'hex'),
  technician_id         UUID NOT NULL REFERENCES profiles(id),
  status                TEXT NOT NULL DEFAULT 'draft'
                        CHECK (status IN ('draft', 'in_progress', 'completed')),
  service_type          TEXT NOT NULL CHECK (service_type IN ('compra', 'venda')),
  -- Client info
  vehicle_plate         TEXT NOT NULL,
  client_full_name      TEXT NOT NULL,
  client_email          TEXT NOT NULL,
  client_phone          TEXT NOT NULL,
  -- Vehicle identification
  vehicle_brand         TEXT,
  vehicle_model         TEXT,
  vehicle_version       TEXT,
  vehicle_manufacture_year TEXT,
  vehicle_model_year    TEXT,
  vehicle_chassis       TEXT,
  vehicle_engine_number TEXT,
  -- Vehicle history
  current_mileage       TEXT,
  mileage_tampering     TEXT,
  previous_owners       TEXT,
  accident_history      TEXT,
  maintenance_history   TEXT,
  inspection_history    TEXT,
  tax_status            TEXT,
  -- Technical specs
  doors                 TEXT,
  fuel_type             TEXT,
  transmission_type     TEXT,
  drive_type            TEXT,
  engine_power          TEXT,
  engine_torque         TEXT,
  -- Timestamps
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SECTIONS → SUBSECTIONS → ITEMS
-- ============================================================
CREATE TABLE sections (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inspection_id UUID NOT NULL REFERENCES inspections(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subsections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id  UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE inspection_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subsection_id UUID NOT NULL REFERENCES subsections(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  satisfaction  TEXT CHECK (satisfaction IN ('not_satisfied', 'somewhat_satisfied', 'satisfied')),
  evaluation    TEXT CHECK (evaluation IN ('muito_ruim', 'ruim', 'bom', 'muito_bom', 'nao_tem', 'sim', 'nao')),
  comments      TEXT,
  photo_url     TEXT,
  photo_path    TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- VEHICLE EQUIPMENT
-- ============================================================
CREATE TABLE vehicle_equipment (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inspection_id     UUID NOT NULL REFERENCES inspections(id) ON DELETE CASCADE,
  equipment_section TEXT NOT NULL,
  item_name         TEXT NOT NULL,
  is_present        BOOLEAN DEFAULT FALSE,
  rating            INTEGER CHECK (rating BETWEEN 0 AND 5),
  comment           TEXT,
  is_custom         BOOLEAN DEFAULT FALSE
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_inspections_technician ON inspections(technician_id);
CREATE INDEX idx_inspections_plate      ON inspections(vehicle_plate);
CREATE INDEX idx_inspections_status     ON inspections(status);
CREATE INDEX idx_inspections_created    ON inspections(created_at DESC);
CREATE INDEX idx_inspections_token      ON inspections(public_token);
CREATE INDEX idx_sections_inspection    ON sections(inspection_id, sort_order);
CREATE INDEX idx_subsections_section    ON subsections(section_id, sort_order);
CREATE INDEX idx_items_subsection       ON inspection_items(subsection_id, sort_order);
CREATE INDEX idx_profiles_id_role_active ON profiles(id, role, is_active);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_inspections_updated_at
  BEFORE UPDATE ON inspections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_items_updated_at
  BEFORE UPDATE ON inspection_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
