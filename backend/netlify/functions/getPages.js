// netlify/functions/getPages.js
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY   // ← Use Service Role Key
);

exports.handler = async (event) => {
  try {
    const token = event.headers.authorization?.split(" ")[1];
    if (!token) return { statusCode: 401, body: JSON.stringify({ error: "No token" }) };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("user_id", decoded.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};