import express from "express";
import cors from "cors";
const app = express();

// CORS configuration
const corsOptions = {
  origin: ["https://dashboard-silk-seven.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

// Apply CORS before any routes
app.use(cors(corsOptions));
