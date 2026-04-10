var express = require("express");
var router = express.Router();
const Product = require("../models/product");

// --- API Endpoints ---
// GET all products
router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// GET Men products
router.get("/api/men", async (req, res) => {
  try {
    const allProducts = await Product.find({}); // fetch all products

    // Filter only names starting with "Men", "Men's", or "Mens"
    const menProducts = allProducts.filter((p) => {
      const name = (p.name || "").trim().toLowerCase();

      return (
        name.startsWith("men ") || // Men T-Shirt
        name.startsWith("men's ") || // Men's Kurta
        name.startsWith("mens ") // Mens Pants
      );
    });

    // Assign subCategory if missing
    const enriched = menProducts.map((p) => {
      const obj = p.toObject ? p.toObject() : p;

      if (!obj.subCategory) {
        const name = (obj.name || "").toLowerCase();
        const desc = (obj.description || "").toLowerCase();

        if (name.includes("t-shirt") || desc.includes("t-shirt"))
          obj.subCategory = "T-Shirt";
        else if (name.includes("jeans") || desc.includes("jeans"))
          obj.subCategory = "Jeans";
        else if (name.includes("shorts") || desc.includes("shorts"))
          obj.subCategory = "Shorts";
        else if (name.includes("shirt") || desc.includes("shirt"))
          obj.subCategory = "Shirt";
        else if (name.includes("pant") || desc.includes("pant"))
          obj.subCategory = "Pants";
        else obj.subCategory = "Shirts"; // fallback
      }

      return obj;
    });

    res.json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// GET Women products
router.get("/api/women", async (req, res) => {
  try {
    const womenProducts = await Product.find({ category: /Women/i });
    const enriched = womenProducts.map((p) => {
      const obj = p.toObject ? p.toObject() : p;
      if (!obj.subCategory) {
        const name = obj.name.toLowerCase();
        const desc = (obj.description || "").toLowerCase();
        if (name.includes("t-shirt") || desc.includes("t-shirt"))
          obj.subCategory = "T-Shirts";
        else if (name.includes("jeans") || desc.includes("jeans"))
          obj.subCategory = "Jeans";
        else if (name.includes("shorts") || desc.includes("shorts"))
          obj.subCategory = "Shorts";
        else if (name.includes("dress") || desc.includes("dress"))
          obj.subCategory = "Dresses";
        else if (name.includes("pants") || desc.includes("pants"))
          obj.subCategory = "Pants";
        else if (name.includes("shirt") || desc.includes("shirt"))
          obj.subCategory = "Shirts";
        else obj.subCategory = "Shirts";
      }
      return obj;
    });
    res.json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// GET Kids products
router.get("/api/kids", async (req, res) => {
  try {
    const kidsProducts = await Product.find({ category: /Kids/i });
    const enriched = kidsProducts.map((p) => {
      const obj = p.toObject ? p.toObject() : p;
      if (!obj.subCategory) {
        const name = obj.name.toLowerCase();
        const desc = (obj.description || "").toLowerCase();
        if (name.includes("t-shirt") || desc.includes("t-shirt"))
          obj.subCategory = "T-Shirts";
        else if (name.includes("shorts") || desc.includes("shorts"))
          obj.subCategory = "Shorts";
        else if (name.includes("pants") || desc.includes("pants"))
          obj.subCategory = "Pants";
        else if (name.includes("shirt") || desc.includes("shirt"))
          obj.subCategory = "Shirts";
        else obj.subCategory = "Shirts";
      }
      return obj;
    });
    res.json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// GET Beauty products
router.get("/api/beauty", async (req, res) => {
  try {
    const beautyProducts = await Product.find({ category: "Beauty" });
    res.json(beautyProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// GET Home products
router.get("/api/home", async (req, res) => {
  try {
    const homeProducts = await Product.find({ category: "Home" });
    res.json(homeProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// GET Electronics products
router.get("/api/electronics", async (req, res) => {
  try {
    const electronics = await Product.find({ category: "Electronics" });
    res.json(electronics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
});

module.exports = router;
