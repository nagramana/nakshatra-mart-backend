const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// ==========================
// Add Product
// ==========================
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==========================
// Get All Products
// ==========================
router.get("/", async (req, res) => {
  try {
    const products =
      await Product.find().sort({
        createdAt: -1,
      });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==========================
// Get Single Product
// ==========================
router.get("/:id", async (req, res) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==========================
// Update Product
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==========================
// Delete Product
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.json({
      success: true,
      message:
        "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;