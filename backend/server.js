require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// ✅ Correct imports
const signup = require("./netlify/functions/signup");
const login = require("./netlify/functions/login");
const createPage = require("./netlify/functions/createPage");
const getPages = require("./netlify/functions/getPages");
const updatePage = require("./netlify/functions/updatePage");
const getPage = require("./netlify/functions/getPage");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.get("/page", async (req, res) => {
  const result = await getPage.handler({
    queryStringParameters: req.query,
  });

  res.status(result.statusCode).send(JSON.parse(result.body));
});
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ================= AUTH =================

app.post("/signup", async (req, res) => {
  try {
    const result = await signup.handler({
      body: JSON.stringify(req.body),
    });

    res.status(result.statusCode).send(JSON.parse(result.body));
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).send("Signup failed");
  }
});

app.post("/login", async (req, res) => {
  try {
    const result = await login.handler({
      body: JSON.stringify(req.body),
    });

    res.status(result.statusCode).send(JSON.parse(result.body));
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).send("Login failed");
  }
});

// ================= PAGES =================

app.post("/create-page", async (req, res) => {
  try {
    const result = await createPage.handler({
      body: JSON.stringify(req.body),
      headers: req.headers,
    });

    res.status(result.statusCode).send(JSON.parse(result.body));
  } catch (err) {
    console.error("CREATE PAGE ERROR:", err);
    res.status(500).send("Create page failed");
  }
});

app.get("/pages", async (req, res) => {
  try {
    const result = await getPages.handler({
      headers: req.headers,
    });

    res.status(result.statusCode).send(JSON.parse(result.body));
  } catch (err) {
    console.error("GET PAGES ERROR:", err);
    res.status(500).send("Fetch failed");
  }
});

app.post("/update-page", async (req, res) => {
  try {
    const result = await updatePage.handler({
      body: JSON.stringify(req.body),
      headers: req.headers,
    });

    res.status(result.statusCode).send(JSON.parse(result.body));
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).send("Update failed");
  }
});

// ================= START =================

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});