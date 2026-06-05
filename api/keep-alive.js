import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Missing Supabase credentials' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // A simple lightweight query to keep the database active
    // We just select 1 row from a known table (e.g., contact_submissions)
    // Even if the table is empty, the connection itself registers as activity!
    const { data, error } = await supabase.from('contact_submissions').select('id').limit(1);

    if (error) {
      console.error("Keep-alive ping failed:", error.message);
      return res.status(500).json({ error: error.message });
    }

    console.log("Keep-alive ping successful at", new Date().toISOString());
    return res.status(200).json({ status: 'Database ping successful', timestamp: new Date().toISOString() });

  } catch (err) {
    console.error("Keep-alive function error:", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
