import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'TU_URL_SUPABASE'
const supabaseKey = 'TU_API_KEY_PUBLICA'

export const supabase = createClient(supabaseUrl, supabaseKey);