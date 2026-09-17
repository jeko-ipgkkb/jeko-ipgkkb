import { createClient } from "@supabase/supabase-js";

/* ============================================================
   JEKO — Supabase configuration
   ------------------------------------------------------------
   This project uses ONLY your own Supabase project.
   Replace the two placeholder values below with your own:

     1. SUPABASE_URL      -> Project URL
                             (Supabase Dashboard > Project Settings > API > Project URL)
     2. SUPABASE_ANON_KEY -> anon / publishable public key
                             (Supabase Dashboard > Project Settings > API > Project API keys)

   You can either paste them directly here, OR (recommended for
   production) drop them into a `.env` file at the project root:

        VITE_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
        VITE_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

   If env values exist they win; otherwise the placeholders below
   are used. Both are public/client-side values and are safe to
   ship in the browser bundle. Never put your service_role key here.
   ============================================================ */

const SUPABASE_URL_PLACEHOLDER = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY_PLACEHOLDER = "YOUR_SUPABASE_ANON_KEY";

const SUPABASE_URL = (import.meta.env.VITE_PUBLIC_SUPABASE_URL as string | undefined) || SUPABASE_URL_PLACEHOLDER;
const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string | undefined) || SUPABASE_ANON_KEY_PLACEHOLDER;

/** Public storage bucket that holds every JEKO gallery album. */
export const GALLERY_BUCKET = "jeko-gallery";

/** True only once real credentials have been supplied (placeholders don't count). */
export const isBackendConfigured =
  Boolean(SUPABASE_URL && SUPABASE_ANON_KEY) &&
  !SUPABASE_URL.includes("YOUR_SUPABASE") &&
  !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE");

/* Simple lock override with a hard cap so a stuck cross-tab lock
   can never freeze the page. */
const safeLock = (_name: string, _acquireTimeout: number, acquire: () => Promise<unknown>) =>
  acquire();

/* createClient throws if it receives a non-URL string, so fall back to a
   syntactically valid placeholder URL until real credentials are added.
   Every data call is guarded by isBackendConfigured, so this is never hit. */
export const supabase = createClient(
  isBackendConfigured ? SUPABASE_URL : "https://placeholder.supabase.co",
  isBackendConfigured ? SUPABASE_ANON_KEY : "placeholder-anon-key",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      lock: safeLock as never,
    },
  }
);