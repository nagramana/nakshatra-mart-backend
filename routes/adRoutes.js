const express =
  require("express");

const router =
  express.Router();

const Ad =
  require("../models/Ad");

// Get All Ads
router.get(
  "/",
  async (req, res) => {
    try {
      const ads =
        await Ad.find().sort({
          createdAt: -1,
        });

      res.json(ads);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// Add Ad
router.post(
  "/",
  async (req, res) => {
    try {
      const ad =
        await Ad.create(
          req.body
        );

      res.json(ad);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// Delete Ad
router.delete(
  "/:id",
  async (req, res) => {
    try {
      await Ad.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Ad Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// Update Ad
router.put(
  "/:id",
  async (req, res) => {
    try {
      const ad =
        await Ad.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(ad);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;