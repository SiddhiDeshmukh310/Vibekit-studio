// netlify/functions/unpublishPage.js
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const token = event.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = JSON.parse(event.body);

    const { error } = await supabase
      .from("pages")
      .update({ 
        status: "draft",
        published_at: null 
      })
      .eq("id", id)
      .eq("user_id", decoded.id);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Page unpublished" })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};