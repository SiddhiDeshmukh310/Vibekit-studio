// netlify/functions/createPage.js
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

    const { title, content } = JSON.parse(event.body || "{}");

    if (!title) {
      return { statusCode: 400, body: JSON.stringify({ error: "Title is required" }) };
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const { data, error } = await supabase
      .from("pages")
      .insert([{
        title: title.trim(),
        slug,
        content: content || { sections: [] },
        user_id: decoded.id,
        status: "draft"
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      statusCode: 201,
      body: JSON.stringify({ success: true, data })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};