
-- Add zoom_ready and camera_overlay_confirmed fields to tournament_registrations table
ALTER TABLE public.tournament_registrations 
ADD COLUMN zoom_ready BOOLEAN DEFAULT false,
ADD COLUMN camera_overlay_confirmed BOOLEAN DEFAULT false;
