const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// 🔌 Connexion à la DB
const connectDB = require("./config/db");
connectDB();

// 📦 Middlewares globaux
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// 🛣️ Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const annonceRoutes = require("./routes/annonceRoutes"); 

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/annonces", annonceRoutes);
app.use("/api/favoris", require("./routes/favorisRoutes")); 

// 🧪 Test route
app.get("/", (req, res) => {
  res.send("🚀 API backend opérationnelle");
}); 

module.exports = app;
