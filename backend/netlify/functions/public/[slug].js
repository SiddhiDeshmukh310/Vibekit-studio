// netlify/functions/public/[slug].js
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  try {
    const { slug } = event.params || event.queryStringParameters || {};

    const { data: page, error } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error || !page) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Page not found or not published" })
      };
    }

    // Increment view count
    await supabase
      .from("pages")
      .update({ views: (page.views || 0) + 1 })
      .eq("id", page.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        data: page 
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};