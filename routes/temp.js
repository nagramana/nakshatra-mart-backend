const express = require("express");
const router = express.Router();

const Review = require("../models/Review");

/* =====================================
   GET ALL REVIEWS OF A PRODUCT
===================================== */

router.get("/:productId", async (req, res) => {
  try {

    const reviews = await Review.find({
      productId: req.params.productId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(reviews);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });

  }
});

/* =====================================
   ADD NEW REVIEW
===================================== */

router.post("/", async (req, res) => {

  console.log("========== REVIEW POST ==========");
console.log(req.body);

  try {

    const {
      productId,
      userId,
      userName,
      userImage,
      rating,
      comment,
    } = req.body;

    const review = new Review({

      productId,

      userId,

      userName,

      userImage,

      rating,

      comment,

    });

    await review.save();

    res.status(201).json({

      success: true,

      message: "Review Added",

      review,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Unable to add review",

    });

  }

});

/* =====================================
   DELETE REVIEW
===================================== */

router.delete("/:id", async (req, res) => {

  try {

    await Review.findByIdAndDelete(req.params.id);

    res.json({

      success: true,

      message: "Review Deleted",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Unable to delete review",

    });

  }

});

module.exports = router;