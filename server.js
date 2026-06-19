require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const uploadRoutes = require("./routes/uploadRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(
      "✅ MongoDB Connected Successfully"
    );
  })
  .catch((err) => {
    console.log(
      "❌ MongoDB Connection Error:",
      err
    );
  });

// Root Route
app.get("/", (req, res) => {
  res.send("Nakshatra Backend Running");
});

// Test Route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend Working",
    database:
      mongoose.connection.readyState === 1
        ? "Connected"
        : "Disconnected",
  });
});

// Routes
app.use("/api", uploadRoutes);

app.use(
  "/api/products",
  productRoutes
);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Start Server
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});