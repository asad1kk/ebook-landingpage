-- Create subscribers table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Add row level security policies
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone with the anon key to insert
CREATE POLICY "Allow anonymous inserts" ON public.subscribers
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Allow authenticated users to view all subscribers
CREATE POLICY "Allow authenticated users to view all subscribers" ON public.subscribers
    FOR SELECT 
    TO authenticated
    USING (true); 