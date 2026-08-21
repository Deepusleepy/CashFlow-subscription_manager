-- CashFlow live transaction schema.
-- Run this once in Supabase Dashboard → SQL Editor.
-- RLS ensures each signed-in user can only read/write their own rows.

create extension if not exists pgcrypto;

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  merchant text not null,
  amount numeric(12,2) not null check (amount >= 0),
  category text not null,
  kind text not null default 'debit' check (kind in ('debit', 'credit')),
  engagement_days integer,
  created_at timestamptz not null default now()
);

create index if not exists transactions_user_date_idx on public.transactions(user_id, date desc);

create table if not exists public.subscription_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subscription_key text not null,
  action text not null check (action in ('keep', 'review', 'cancel', 'classify')),
  classification text,
  created_at timestamptz not null default now()
);

alter table public.transactions enable row level security;
alter table public.subscription_reviews enable row level security;

drop policy if exists "Users can read their own transactions" on public.transactions;
create policy "Users can read their own transactions" on public.transactions for select using (auth.uid() = user_id);
drop policy if exists "Users can insert their own transactions" on public.transactions;
create policy "Users can insert their own transactions" on public.transactions for insert with check (auth.uid() = user_id);
drop policy if exists "Users can update their own transactions" on public.transactions;
create policy "Users can update their own transactions" on public.transactions for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can read their own subscription reviews" on public.subscription_reviews;
create policy "Users can read their own subscription reviews" on public.subscription_reviews for select using (auth.uid() = user_id);
drop policy if exists "Users can write their own subscription reviews" on public.subscription_reviews;
create policy "Users can write their own subscription reviews" on public.subscription_reviews for insert with check (auth.uid() = user_id);

-- Enable realtime updates for the transaction table. Safe to run repeatedly.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'transactions'
  ) then
    alter publication supabase_realtime add table public.transactions;
  end if;
end $$;
