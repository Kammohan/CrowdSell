-- Initial schema (MVP subset)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orgs (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT NOT NULL,
	type TEXT,
	contact_email TEXT
);

CREATE TABLE events (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	org_id UUID NOT NULL REFERENCES orgs(id),
	name TEXT NOT NULL,
	start_at TIMESTAMPTZ NOT NULL,
	venue TEXT,
	capacity INT NOT NULL,
	base_price_cents INT NOT NULL,
	status TEXT CHECK (status IN ('draft','published','closed')),
	tz TEXT DEFAULT 'America/Chicago'
);

CREATE TABLE referrals (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	event_id UUID REFERENCES events(id),
	promoter_id UUID,
	ref_code TEXT UNIQUE,
	clicks INT DEFAULT 0,
	conversions INT DEFAULT 0,
	last_touch_at TIMESTAMPTZ
);

CREATE TABLE sms_contacts (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	phone TEXT UNIQUE NOT NULL,
	first_name TEXT,
	consent_bool BOOLEAN DEFAULT FALSE,
	consent_source TEXT,
	optd_out_at TIMESTAMPTZ
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_events_org_created ON events(org_id, start_at);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(ref_code);

