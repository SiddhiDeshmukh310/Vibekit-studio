require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);
    const cleanEmail = email.trim().toLowerCase();

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", cleanEmail)
      .single();

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "User not found" }),
      };
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid password" }),
      };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};