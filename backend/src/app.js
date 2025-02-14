const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://your-frontend-url.vercel.app",
      "https://your-custom-domain.com", // if you have one
    ],
    credentials: true,
  })
);

// ... rest of your code ...
