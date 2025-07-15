DROP TABLE IF EXISTS birthdayrsvps CASCADE;
DROP VIEW IF EXISTS birthday_rsvp_summary;

CREATE TABLE birthdayrsvps (
  id SERIAL PRIMARY KEY,
  guest_name VARCHAR(255) NOT NULL,
  is_attending BOOLEAN NOT NULL,
  adult_count INTEGER NOT NULL DEFAULT 1,
  child_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE VIEW birthday_rsvp_summary AS
SELECT 
  COUNT(*) as total_responses,
  SUM(CASE WHEN is_attending = true THEN 1 ELSE 0 END) as attending_responses,
  SUM(CASE WHEN is_attending = false THEN 1 ELSE 0 END) as not_attending_responses,
  SUM(CASE WHEN is_attending = true THEN adult_count ELSE 0 END) as total_adults,
  SUM(CASE WHEN is_attending = true THEN child_count ELSE 0 END) as total_children,
  SUM(CASE WHEN is_attending = true THEN (adult_count + child_count) ELSE 0 END) as total_guests
FROM birthdayrsvps;