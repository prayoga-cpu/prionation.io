import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const CV_BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? 'prionation-careers';
export const CV_MAX_BYTES = 5 * 1024 * 1024; // 5 MB hard limit per spec §15
