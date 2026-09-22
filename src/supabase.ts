import { createClient } from '@supabase/supabase-js';

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobWdkbXNseXBlemtpdmtxdGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NTU0NDUsImV4cCI6MjEwNDUzMTQ0NX0.uNYyVeRBB-HBSo9ZVzSvpMCiKC29ANMiCnrUN7wbDF4";
const supabaseUrl = `https://lhmgdmslypezkivkqtgo.supabase.co`;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;