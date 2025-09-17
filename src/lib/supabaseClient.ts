

import { createClient } from '@supabase/supabase-js';

// Supabase project credentials have been set based on user input.
const supabaseUrl = 'https://snnwwmpbpgevkoafmjtw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNubnd3bXBicGdldmtvYWZtanR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwOTk1NzgsImV4cCI6MjA3MzY3NTU3OH0.HvRGSsOC-I6KKeCblklSh4jTnWRmQQeJ8bPedPskdMk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);