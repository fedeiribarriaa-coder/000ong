-- Ejecutar DESPUÉS del esquema base que ya creamos.
-- Habilitar RLS
alter table public.animales enable row level security;
alter table public.animal_fotos enable row level security;
alter table public.solicitudes_adopcion enable row level security;
alter table public.historial_solicitudes enable row level security;
alter table public.notas_solicitudes enable row level security;
alter table public.campanias_donacion enable row level security;

-- Limpiar políticas si se vuelve a ejecutar
 drop policy if exists "public_read_animales" on public.animales;
drop policy if exists "public_insert_solicitudes" on public.solicitudes_adopcion;
drop policy if exists "public_read_campanias" on public.campanias_donacion;
drop policy if exists "admin_all_animales" on public.animales;
drop policy if exists "admin_all_fotos" on public.animal_fotos;
drop policy if exists "admin_all_solicitudes" on public.solicitudes_adopcion;
drop policy if exists "admin_all_historial" on public.historial_solicitudes;
drop policy if exists "admin_all_notas" on public.notas_solicitudes;
drop policy if exists "admin_all_campanias" on public.campanias_donacion;

create policy "public_read_animales" on public.animales for select using (estado in ('disponible','en_proceso'));
create policy "public_insert_solicitudes" on public.solicitudes_adopcion for insert to anon, authenticated with check (true);
create policy "public_read_campanias" on public.campanias_donacion for select using (activa=true);

-- Para la primera versión del panel, cualquier usuario autenticado de Supabase actúa como miembro del equipo.
create policy "admin_all_animales" on public.animales for all to authenticated using (true) with check (true);
create policy "admin_all_fotos" on public.animal_fotos for all to authenticated using (true) with check (true);
create policy "admin_all_solicitudes" on public.solicitudes_adopcion for all to authenticated using (true) with check (true);
create policy "admin_all_historial" on public.historial_solicitudes for all to authenticated using (true) with check (true);
create policy "admin_all_notas" on public.notas_solicitudes for all to authenticated using (true) with check (true);
create policy "admin_all_campanias" on public.campanias_donacion for all to authenticated using (true) with check (true);
