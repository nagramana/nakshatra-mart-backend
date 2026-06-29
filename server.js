require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const uploadRoutes = require("./routes/uploadRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

// ✅ NEW
const adRoutes = require("./routes/adRoutes");

// ✅ REVIEW ROUTE
const reviewRoutes = require("./routes/reviewRoutes");
console.log("✅ reviewRoutes imported");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// ==========================
// Middleware
// ==========================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ==========================
// MongoDB Connection
// ==========================

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



  // ==========================
// SOCKET CONNECTION
// ==========================

io.on("connection", (socket) => {

  console.log("✅ Client Connected:", socket.id);

  socket.on("disconnect", () => {

    console.log("❌ Client Disconnected:", socket.id);

  });

});

// ==========================
// Root Route
// ==========================

app.get("/", (req, res) => {
  res.send(
    "Nakshatra Backend Running"
  );
});

// ==========================
// Health Check Route
// ==========================

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

// ==========================
// API Routes
// ==========================

app.set("io", io);

app.use(
  "/api",
  uploadRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

// ✅ REVIEW ROUTE
app.use(
  "/api/reviews",
  reviewRoutes
);

// ✅ ADS ROUTE
app.use(
  "/api/ads",
  adRoutes
);

// ==========================
// 404 Route
// ==========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ==========================
// Start Server
// ==========================

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});