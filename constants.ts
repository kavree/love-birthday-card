
// IMPORTANT: Replace these with your actual Supabase project URL and Anon Key.
// You can find these in your Supabase project settings > API.
export const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Example: 'https://your-project-id.supabase.co'
export const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

// Check if placeholders are still being used and show a warning if so.
if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn(
    `%c[Supabase Configuration Needed] %cPlease update SUPABASE_URL and SUPABASE_ANON_KEY in constants.ts with your project's credentials.`,
    'color: orange; font-weight: bold;',
    'color: black;'
  );
}
