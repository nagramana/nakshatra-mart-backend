const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// ==========================
// ADD PRODUCT
// ==========================

router.post("/", async (req, res) => {
  try {
    const product = new Product({
      id: req.body.id,

      name: req.body.name,

      price: req.body.price,

      stock: req.body.stock,

      initialStock:
        req.body.initialStock || req.body.stock,

      sold: 0,

      active: true,

      category: req.body.category,

      gender:
        req.body.gender || "All",

      color:
        req.body.color || "",

      fabric:
        req.body.fabric || "",

      size:
        req.body.size || "",

      rating:
        req.body.rating || 4.3,

      occasion:
        req.body.occasion || "",

      material:
        req.body.material || "",

      combo:
        req.body.combo || "",

      fitShape:
        req.body.fitShape || "",

      bottomLength:
        req.body.bottomLength || "",

      description:
        req.body.description || "",

      discount:
  req.body.discount || "0% OFF",

image: req.body.image,

images:
  req.body.images || [],
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==========================
// GET ALL PRODUCTS
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
// GET SINGLE PRODUCT
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
// UPDATE PRODUCT
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
// DELETE PRODUCT
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