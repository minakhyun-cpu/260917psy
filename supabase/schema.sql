-- Run this in the Supabase SQL editor (or via the CLI) to create the table
-- used by the counseling application form.

create extension if not exists "pgcrypto";

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  test_type text not null check (test_type in ('personality', 'career', 'stress', 'other')),
  consult_method text not null check (consult_method in ('online', 'offline')),
  preferred_date date not null,
  message text,
  privacy_consent boolean not null default false,
  status text not null default 'received' check (status in ('received', 'confirmed', 'completed')),
  created_at timestamptz not null default now()
);

create index if not exists applications_created_at_idx on applications (created_at desc);

-- Row Level Security is enabled with no public policies: the app only
-- reads/writes this table from server-side code using the service role key,
-- which bypasses RLS. This keeps the table inaccessible from the browser.
alter table applications enable row level security;
