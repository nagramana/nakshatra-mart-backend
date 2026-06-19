const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// ==========================
// Create Order
// ==========================
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);

    await order.save();

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================
// Get All Orders
// ==========================
router.get("/", async (req, res) => {
  try {
    const orders =
      await Order.find().sort({
        createdAt: -1,
      });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==========================
// Get Single Order
// ==========================
router.get("/:id", async (req, res) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      );

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==========================
// Update Status
// ==========================
router.put(
  "/status/:id",
  async (req, res) => {
    try {
      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            orderStatus:
              req.body.orderStatus,
          },
          {
            new: true,
          }
        );

      res.json(order);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// ==========================
// Request Return
// ==========================
router.put(
  "/return/:id",
  async (req, res) => {
    try {
      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            returnRequested: true,
            returnStatus:
              "Pending",
            returnReason:
              req.body.reason,
          },
          {
            new: true,
          }
        );

      res.json(order);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// ==========================
// Approve Return
// ==========================
router.put(
  "/approve-return/:id",
  async (req, res) => {
    try {
      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            returnStatus:
              "Approved",
            orderStatus:
              "Order Returned",
          },
          {
            new: true,
          }
        );

      res.json(order);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// ==========================
// Reject Return
// ==========================
router.put(
  "/reject-return/:id",
  async (req, res) => {
    try {
      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            returnStatus:
              "Rejected",
          },
          {
            new: true,
          }
        );

      res.json(order);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;