require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async (event) => {
  try {
    const token = event.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id, content } = JSON.parse(event.body);

    const { error } = await supabase
      .from("pages")
      .update({ content })
      .eq("id", id)
      .eq("user_id", decoded.id);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Updated" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};