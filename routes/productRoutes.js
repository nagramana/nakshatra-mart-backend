const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// ==========================
// Add Product
// ==========================
router.post("/", async (req, res) => {
  try {
    console.log("NEW PRODUCT:", req.body);

    const product = new Product({
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      initialStock:
        req.body.initialStock ||
        req.body.stock,
      category: req.body.category,
      gender:
        req.body.gender || "All",
      description:
        req.body.description || "",
      discount:
        req.body.discount || "0% OFF",
      image: req.body.image,
    });

    await product.save();

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
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

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
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
        success: false,
        message:
          "Product Not Found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
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
        {
          name: req.body.name,
          price: req.body.price,
          stock: req.body.stock,
          category: req.body.category,
          gender:
            req.body.gender,
          description:
            req.body.description,
          discount:
            req.body.discount,
          image: req.body.image,
        },
        {
          new: true,
        }
      );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message:
          "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      product:
        updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
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
        success: false,
        message:
          "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;