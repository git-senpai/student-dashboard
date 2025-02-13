const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/applications");
const notificationRoutes = require("./routes/notifications");

const app = express();

// Security middleware
app.use(helmet()); // Adds various HTTP headers for security
app.use(morgan("dev")); // Request logging

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/notifications", notificationRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to University Insights API" });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Something went wrong!",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
