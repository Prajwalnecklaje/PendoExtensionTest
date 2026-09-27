-- P4E production persistence for user-scoped application state.
-- Run this in Supabase SQL Editor after creating your project.
create table if not exists public.workspace_data (
  user_id uuid not null references auth.users(id) on delete cascade,
  key text not null check (char_length(key) between 1 and 120),
  value jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

alter table public.workspace_data enable row level security;

drop policy if exists "Users can read their workspace data" on public.workspace_data;
create policy "Users can read their workspace data"
  on public.workspace_data for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their workspace data" on public.workspace_data;
create policy "Users can insert their workspace data"
  on public.workspace_data for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their workspace data" on public.workspace_data;
create policy "Users can update their workspace data"
  on public.workspace_data for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their workspace data" on public.workspace_data;
create policy "Users can delete their workspace data"
  on public.workspace_data for delete
  using (auth.uid() = user_id);

create index if not exists workspace_data_updated_at_idx on public.workspace_data(updated_at);
