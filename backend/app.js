const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const tmdbRoutes = require("./routes/tmdb");
const cors = require("cors");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

// Load environment variables
dotenv.config();

const app = express();

// parse application/json
app.use(express.json());
// cors
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow these HTTP methods
    credentials: true,
  })
);
// cookie parser
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/", tmdbRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message });
});

module.exports = app;
