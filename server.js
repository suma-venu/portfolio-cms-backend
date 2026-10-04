const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes");
const authenticateToken = require("./src/middleware/authMiddleware");



const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "You have access to the protected route!",
    user: req.user,
  });
});

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Portfolio CMS Backend is running!",
  });
});

// Database test route
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Database connected successfully!",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});