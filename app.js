require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const Product = require("./models/product");

const app = express();

// --- Middleware ---
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://e-commercewebsite-git-main-ahana-awasthis-projects.vercel.app",
      "https://e-commerce-website-backend-d84m.onrender.com",
      "https://e-commercewebsite-cvqm2ba55-ahana-awasthis-projects.vercel.app",
      "https://e-commercewebsite-wheat.vercel.app",

    ],
    credentials: true,
  }),
);
// --- Serve Images ---
app.use("/images", express.static(path.join(__dirname, "public/images")));

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    checkProductCategories(); // move here
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- API Routes (users/auth/wishlist) ---
app.use("/api", usersRouter);

// --- API ROUTE TO GET PRODUCTS ---
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// --- Other API routes (category products) ---
app.use("/", indexRouter);

// --- Serve React Frontend ---
const clientBuildPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(clientBuildPath));

// --- Catch-all for SPA routes (React) ---
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  }
});

// --- Catch 404 ---
app.use(function (req, res, next) {
  next(createError(404));
});

// --- Error handler ---
app.use((req, res, next) => {
  res.status(404).json({ msg: "Route not found" });
});

// general error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // logs full error in server console
  res.status(err.status || 500).json({ msg: err.message || "Server error" });
});


const categories = [
  { name: "Men", query: { category: /men/i } },
  { name: "Women", query: { category: /women/i } },
  { name: "Kids", query: { category: /kids/i } },
  { name: "Beauty", query: { category: "Beauty" } },
  { name: "Home", query: { category: "Home" } },
  { name: "Electronics", query: { category: "Electronics" } },
];

async function checkProductCategories() {
  console.log("🔍 Checking product categories...");
  for (const cat of categories) {
    try {
      const products = await Product.find(cat.query);
      if (products.length > 0) {
        console.log(`✅ ${cat.name}: ${products.length} products fetched`);
      } else {
        console.log(`⚠️ ${cat.name}: No products found`);
      }
    } catch (err) {
      console.log(`❌ ${cat.name}: Error fetching products`, err.message);
    }
  }
}

// Run check after MongoDB connection
module.exports = app;
