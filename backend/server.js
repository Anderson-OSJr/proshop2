import express from "express";
import products from "./data/products.js";

// Iniciar o .env
import dotenv from "dotenv";
dotenv.config();

// Iniciar a conexão com o MongoDB
import connectDB from "./config/db.js";
connectDB();

// Iniciar o servidor de backend
const app = express();
const port = process.env.PORT || 5000;

// Iniciar as routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

// Iniciar o listener
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
