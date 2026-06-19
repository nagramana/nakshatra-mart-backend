require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const uploadRoutes = require("./routes/uploadRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-admin-vercel.vercel.app",
      "https://your-user-vercel.vercel.app",
    ],
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });

// Routes
app.use("/api", uploadRoutes);
app.use("/api/products", productRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Nakshatra Backend Running");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});