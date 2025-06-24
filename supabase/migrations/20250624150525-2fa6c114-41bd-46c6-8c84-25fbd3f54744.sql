
-- Update tournament_registrations table to include USCF membership and fee tracking
ALTER TABLE public.tournament_registrations 
ADD COLUMN uscf_membership_purchased BOOLEAN DEFAULT FALSE,
ADD COLUMN uscf_membership_fee NUMERIC(10,2) DEFAULT 0,
ADD COLUMN games_count INTEGER DEFAULT 0,
ADD COLUMN total_paid NUMERIC(10,2) DEFAULT 15.00,
ADD COLUMN rating_fee_owed NUMERIC(10,2) GENERATED ALWAYS AS (games_count * 0.25) STORED;

-- Add a comment to clarify the rating fee calculation
COMMENT ON COLUMN public.tournament_registrations.rating_fee_owed IS 'Calculated as games_count * $0.25 for USCF payment tracking';
