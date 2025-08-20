const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://loweygreruilntauxlxw.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxvd2V5Z3JlcnVpbG50YXV4bHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NTc1NTYsImV4cCI6MjA3MTIzMzU1Nn0.lQ9Ynv7Fpmy_RYvlGsAYHZkg6P3c7t3YKO8bNe60r8g";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
