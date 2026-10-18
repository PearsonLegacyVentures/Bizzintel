-- BizzIntel Release 1 and 2: owner-isolated persisted records.
-- Run on a DEDICATED BizzIntel Supabase project, never on an unrelated production database.
create extension if not exists pgcrypto;

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 160),
  stage text not null default 'idea' check (stage in ('idea','planning','setup','launch','operating','scaling')),
  industry text not null default 'service',
  location text not null default 'The Bahamas',
  goal text not null default '',
  summary text not null default '',
  customer text not null default '',
  problem text not null default '',
  solution text not null default '',
  evidence text not null default '',
  tasks jsonb not null default '{}'::jsonb check (jsonb_typeof(tasks)='object'),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index if not exists businesses_owner_update on public.businesses(owner_id,updated_at desc);

create table if not exists public.business_notes (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  category text not null default 'research' check(category in ('research','customer','competitor','decision','risk')),
  title text not null check(char_length(title) between 1 and 160),
  content text not null default '',
  source_url text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists business_notes_owner_business on public.business_notes(owner_id,business_id);

create table if not exists public.business_artifacts (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  kind text not null default 'plan',
  title text not null check(char_length(title) between 1 and 160),
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists business_artifacts_owner_business on public.business_artifacts(owner_id,business_id);

alter table public.businesses enable row level security;
alter table public.business_notes enable row level security;
alter table public.business_artifacts enable row level security;
revoke all on public.businesses,public.business_notes,public.business_artifacts from anon,authenticated;
grant select,insert,update,delete on public.businesses,public.business_notes,public.business_artifacts to authenticated;
create policy businesses_read on public.businesses for select to authenticated using ((select auth.uid())=owner_id);
create policy businesses_insert on public.businesses for insert to authenticated with check ((select auth.uid())=owner_id);
create policy businesses_update on public.businesses for update to authenticated using ((select auth.uid())=owner_id) with check ((select auth.uid())=owner_id);
create policy businesses_delete on public.businesses for delete to authenticated using ((select auth.uid())=owner_id);

create policy notes_read on public.business_notes for select to authenticated
using (owner_id=(select auth.uid()) and exists(select 1 from public.businesses b where b.id=business_id and b.owner_id=(select auth.uid())));
create policy notes_insert on public.business_notes for insert to authenticated
with check(owner_id=(select auth.uid()) and exists(select 1 from public.businesses b where b.id=business_id and b.owner_id=(select auth.uid())));
create policy notes_update on public.business_notes for update to authenticated
using(owner_id=(select auth.uid()) and exists(select 1 from public.businesses b where b.id=business_id and b.owner_id=(select auth.uid())))
with check(owner_id=(select auth.uid()) and exists(select 1 from public.businesses b where b.id=business_id and b.owner_id=(select auth.uid())));
create policy notes_delete on public.business_notes for delete to authenticated
using(owner_id=(select auth.uid()) and exists(select 1 from public.businesses b where b.id=business_id and b.owner_id=(select auth.uid())));

create policy artifacts_read on public.business_artifacts for select to authenticated
using(owner_id=(select auth.uid()) and exists(select 1 from public.businesses b where b.id=business_id and b.owner_id=(select auth.uid())));
create policy artifacts_insert on public.business_artifacts for insert to authenticated
with check(owner_id=(select auth.uid()) and exists(select 1 from public.businesses b where b.id=business_id and b.owner_id=(select auth.uid())));
create policy artifacts_update on public.business_artifacts for update to authenticated
using(owner_id=(select auth.uid()) and exists(select 1 from public.businesses b where b.id=business_id and b.owner_id=(select auth.uid())))
with check(owner_id=(select auth.uid()) and exists(select 1 from public.businesses b where b.id=business_id and b.owner_id=(select auth.uid())));
create policy artifacts_delete on public.business_artifacts for delete to authenticated
using(owner_id=(select auth.uid()) and exists(select 1 from public.businesses b where b.id=business_id and b.owner_id=(select auth.uid())));
