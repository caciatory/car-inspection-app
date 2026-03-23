-- ============================================================
-- ENABLE RLS
-- ============================================================
ALTER TABLE profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspections      ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections         ENABLE ROW LEVEL SECURITY;
ALTER TABLE subsections      ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_equipment ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- HELPER FUNCTION: verificar se utilizador é super_admin
-- ============================================================
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'super_admin' AND is_active = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================================
-- PROFILES
-- ============================================================
CREATE POLICY "profiles_read_own"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_admin_all"
  ON profiles FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());

-- ============================================================
-- INSPECTIONS
-- ============================================================
CREATE POLICY "inspections_technician_own"
  ON inspections FOR ALL
  USING (technician_id = auth.uid())
  WITH CHECK (technician_id = auth.uid());

CREATE POLICY "inspections_admin_all"
  ON inspections FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());

-- NOTE: Client public access is done server-side via service role key.
-- No public RLS policy is needed.

-- ============================================================
-- SECTIONS — herda permissão da inspeção pai
-- ============================================================
CREATE POLICY "sections_via_inspection"
  ON sections FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM inspections i
      WHERE i.id = sections.inspection_id
        AND (i.technician_id = auth.uid() OR is_super_admin())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM inspections i
      WHERE i.id = sections.inspection_id
        AND (i.technician_id = auth.uid() OR is_super_admin())
    )
  );

-- ============================================================
-- SUBSECTIONS
-- ============================================================
CREATE POLICY "subsections_via_section"
  ON subsections FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM sections s
      JOIN inspections i ON i.id = s.inspection_id
      WHERE s.id = subsections.section_id
        AND (i.technician_id = auth.uid() OR is_super_admin())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM sections s
      JOIN inspections i ON i.id = s.inspection_id
      WHERE s.id = subsections.section_id
        AND (i.technician_id = auth.uid() OR is_super_admin())
    )
  );

-- ============================================================
-- INSPECTION_ITEMS
-- ============================================================
CREATE POLICY "items_via_subsection"
  ON inspection_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM subsections sub
      JOIN sections s ON s.id = sub.section_id
      JOIN inspections i ON i.id = s.inspection_id
      WHERE sub.id = inspection_items.subsection_id
        AND (i.technician_id = auth.uid() OR is_super_admin())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM subsections sub
      JOIN sections s ON s.id = sub.section_id
      JOIN inspections i ON i.id = s.inspection_id
      WHERE sub.id = inspection_items.subsection_id
        AND (i.technician_id = auth.uid() OR is_super_admin())
    )
  );

-- ============================================================
-- VEHICLE_EQUIPMENT
-- ============================================================
CREATE POLICY "equipment_via_inspection"
  ON vehicle_equipment FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM inspections i
      WHERE i.id = vehicle_equipment.inspection_id
        AND (i.technician_id = auth.uid() OR is_super_admin())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM inspections i
      WHERE i.id = vehicle_equipment.inspection_id
        AND (i.technician_id = auth.uid() OR is_super_admin())
    )
  );
