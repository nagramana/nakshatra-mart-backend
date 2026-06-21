
const express = require("express");
const router = express.Router();

const Category = require("../models/Category");


// ======================
// GET ALL CATEGORIES
// ======================
router.get("/", async (req, res) => {
  try {
    const categories =
      await Category.find()
      .sort({ createdAt: -1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ======================
// ADD CATEGORY
// ======================
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name required",
      });
    }

    const exists =
      await Category.findOne({
        name,
      });

    if (exists) {
      return res.status(400).json({
        success: false,
        message:
          "Category already exists",
      });
    }

    const category =
      new Category({
        name,
      });

    await category.save();

    res.status(201).json({
      success: true,
      message:
        "Category added successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ======================
// UPDATE CATEGORY
// ======================
router.put("/:id", async (req, res) => {
  try {
    const category =
      await Category.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
        },
        {
          new: true,
        }
      );

    res.json({
      success: true,
      message:
        "Category updated",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ======================
// DELETE CATEGORY
// ======================
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Category deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;