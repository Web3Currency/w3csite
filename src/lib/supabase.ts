import { createClient } from '@supabase/supabase-js';

// Robust, self-healing environment variables selector for client-side Supabase client
const getSupabaseUrl = () => {
  // Candidate variables to search for a valid https:// URL
  const candidates = [
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_DATABASE_URL,
    import.meta.env.DATABASE_URL,
    import.meta.env.SUPABASE_URL,
    // Include fallback to global process.env in case of Vite define injection
    typeof process !== 'undefined' && process.env ? process.env.VITE_SUPABASE_URL : undefined,
    typeof process !== 'undefined' && process.env ? process.env.DATABASE_URL : undefined,
    typeof process !== 'undefined' && process.env ? process.env.SUPABASE_URL : undefined,
  ].filter((val): val is string => typeof val === 'string' && val.trim() !== '');

  console.log('[Supabase Diagnostic] Inspecting candidate URLs:', candidates.map(c => {
    const isHTTPS = c.startsWith('https://');
    return {
      prefix: c.substring(0, 25) + (c.length > 25 ? '...' : ''),
      length: c.length,
      isHTTPS
    };
  }));

  // Select the first one that starts with https://
  const validUrl = candidates.find(c => c.startsWith('https://'));
  if (validUrl) {
    console.log('[Supabase Diagnostic] Selected valid URL endpoint:', validUrl);
    return validUrl;
  }

  // If no valid URL starts with https://, try returning the first candidate as fallback
  if (candidates.length > 0) {
    console.warn('[Supabase Diagnostic] No candidate started with https://. Falling back to first candidate:', candidates[0]);
    return candidates[0];
  }

  return '';
};

const getSupabaseAnonKey = () => {
  // Candidate variables for the anon key
  const candidates = [
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    import.meta.env.SUPABASE_ANON_KEY,
    typeof process !== 'undefined' && process.env ? process.env.VITE_SUPABASE_ANON_KEY : undefined,
    typeof process !== 'undefined' && process.env ? process.env.SUPABASE_ANON_KEY : undefined,
  ].filter((val): val is string => typeof val === 'string' && val.trim() !== '');

  console.log('[Supabase Diagnostic] Found candidate key count:', candidates.length);

  // Supabase keys are standard JWTs that typically start with 'eyJ'
  const jwtKey = candidates.find(k => k.startsWith('eyJ'));
  if (jwtKey) {
    console.log('[Supabase Diagnostic] Selected key starting with eyJ... (length:', jwtKey.length, ')');
    return jwtKey;
  }

  if (candidates.length > 0) {
    console.log('[Supabase Diagnostic] Selected fallback key starting with:', candidates[0].substring(0, 10), '... (length:', candidates[0].length, ')');
    return candidates[0];
  }

  return '';
};

const supabaseUrl = getSupabaseUrl();
const supabaseAnonKey = getSupabaseAnonKey();

const createSafeClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('[Supabase Diagnostic] Client creation aborted: missing URL or Anon Key.');
    return null;
  }
  
  try {
    const url = new URL(supabaseUrl);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      console.log('[Supabase Diagnostic] Initializing client with endpoint:', url.href);
      return createClient(supabaseUrl, supabaseAnonKey);
    } else {
      console.error('[Supabase Diagnostic] Client creation aborted: URL protocol must be http or https.');
    }
  } catch (e: any) {
    console.error('[Supabase Diagnostic] Client creation aborted: Invalid URL format exception:', e.message);
  }
  return null;
};

// Only initialize if we have valid credentials
export const supabase = createSafeClient();

if (!supabase) {
  console.warn('[Supabase Diagnostic] Database operations are DISABLED because client failed to initialize.');
} else {
  console.log('[Supabase Diagnostic] Client successfully initialized and exported.');
}
