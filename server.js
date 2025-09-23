require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));

const app = express(); // <-- initialize app first

// Serve frontend static files
app.use(express.static(path.join(__dirname)));

app.use(cors());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.SPOONACULAR_KEY;

// Route: Find recipes by ingredients
app.get("/api/recipes", async (req, res) => {
  const { ingredients = "", number = 6 } = req.query;
  if (!ingredients) {
    return res.status(400).json({ error: "Missing ingredients" });
  }
  try {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
      ingredients
    )}&number=${number}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// Route: Get detailed recipe info
app.get("/api/recipeInfo", async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Missing recipe ID" });
  }
  try {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recipe info" });
  }
});

// Optional: ensure "/" serves index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
