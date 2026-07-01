-- The Neighbourhood — Waitlist schema
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).

create table if not exists waitlist (
  id bigint generated always as identity primary key,
  email text unique not null,
  referred_by bigint references waitlist(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table waitlist enable row level security;

-- Anyone can insert (join the waitlist) but cannot read the table directly,
-- keeping emails private. Position/referral counts are exposed only via the
-- RPC functions below, which run with definer rights.
create policy "public can insert" on waitlist
  for insert
  with check (true);

-- Returns this signup's rank in the queue (1 = first ever signup).
create or replace function get_queue_position(signup_id bigint)
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::int
  from waitlist
  where created_at <= (select created_at from waitlist where id = signup_id);
$$;

-- Returns how many people this signup has referred.
create or replace function get_referral_count(signup_id bigint)
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::int
  from waitlist
  where referred_by = signup_id;
$$;

-- Returns the total number of signups (for "N families in the village so far").
create or replace function get_total_signups()
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::int from waitlist;
$$;
