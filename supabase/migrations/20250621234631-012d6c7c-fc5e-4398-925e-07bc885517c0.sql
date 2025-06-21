
-- Add Tornelo and Zoom integration fields to tournaments table
ALTER TABLE public.events 
ADD COLUMN zoom_link TEXT,
ADD COLUMN tornelo_link TEXT,
ADD COLUMN setup_instructions TEXT;

-- Create a tournament registrations table to track player signups
CREATE TABLE public.tournament_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tournament_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  platform VARCHAR(20) NOT NULL CHECK (platform IN ('chess.com', 'lichess')),
  platform_username TEXT NOT NULL,
  uscf_id TEXT,
  current_rating INTEGER,
  email TEXT NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  setup_completed BOOLEAN DEFAULT FALSE,
  zoom_joined BOOLEAN DEFAULT FALSE,
  UNIQUE(tournament_id, user_id)
);

-- Enable RLS on tournament registrations
ALTER TABLE public.tournament_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for tournament registrations
CREATE POLICY "Users can view their own registrations" 
  ON public.tournament_registrations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own registrations" 
  ON public.tournament_registrations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own registrations" 
  ON public.tournament_registrations 
  FOR UPDATE 
  USING (auth.uid() = user_id);
