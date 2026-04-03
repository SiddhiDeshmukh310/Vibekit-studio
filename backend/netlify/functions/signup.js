require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

    const hashed = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("users").insert([
      {
        email: email.trim().toLowerCase(),
        password: hashed,
      },
    ]);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User created" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};