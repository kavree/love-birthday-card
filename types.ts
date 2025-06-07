
export interface BirthdayImage {
  id: string;
  name: string | null;
  image_url: string; // This should be the full public URL from Supabase Storage
  created_at: string;
}
