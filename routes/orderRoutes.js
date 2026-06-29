
const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const validateUTR = require("../utils/validateUTR");

// ===================================
// Create Order
// ===================================
// ===================================
// Create Order
// ===================================
router.post("/", async (req, res) => {
  try {
    console.log("Incoming Order:");
    console.log(req.body);

    // ===============================
    // Validate UTR only for UPI Payment
    // ===============================
    if (req.body.paymentMethod === "UPI") {
      const validation = validateUTR(req.body.utrNumber);

      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          message: validation.message,
        });
      }

      // ===============================
      // Check Duplicate UTR
      // ===============================
      const existingUTR = await Order.findOne({
        utrNumber: req.body.utrNumber,
        paymentStatus: {
          $in: ["Pending Verification", "Paid"],
        },
      });

      if (existingUTR) {
        return res.status(400).json({
          success: false,
          message: "This UTR Number has already been used.",
        });
      }
    }

    // Save Order
    const order = new Order(req.body);

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      order: savedOrder,
    });

  } catch (error) {
    console.error("Order Save Error:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

// ===================================
// Get All Orders
// ===================================
router.get("/", async (req, res) => {
  try {
    const orders =
      await Order.find().sort({
        createdAt: -1,
      });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
});



// router.delete("/:id", async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(
//       req.params.id
//     );

//     res.status(200).json({
//       success: true,
//       message: "Order deleted",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });
// ===================================
// Get Single Order
// ===================================
router.get("/:id", async (req, res) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      return res
        .status(404)
        .json({
          message:
            "Order not found",
        });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
});

// ===================================
// Update Order Status
// ===================================
router.put(
  "/return/:id",
  async (req, res) => {
    try {
      const existingOrder =
        await Order.findById(
          req.params.id
        );

      if (!existingOrder) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      if (
        !existingOrder.deliveredAt
      ) {
        return res.status(400).json({
          message:
            "Order not delivered yet",
        });
      }

      const days =
        (new Date() -
          new Date(
            existingOrder.deliveredAt
          )) /
        (1000 *
          60 *
          60 *
          24);

      if (days > 7) {
        return res.status(400).json({
          message:
            "Return period expired",
        });
      }

      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            returnRequested: true,

            returnStatus:
              "Pending",

            returnReason:
              req.body.reason,

            returnRequestedAt:
              new Date(),
          },
          {
            new: true,
          }
        );

      res.json(order);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// ===================================
// Request Return
// ===================================
// router.put(
//   "/return/:id",
//   async (req, res) => {
//     try {
//       const order =
//         await Order.findByIdAndUpdate(
//           req.params.id,
//           {
//             returnRequested: true,
//             returnStatus: "Pending",
//             returnReason: req.body.reason,
//             returnRequestedAt: new Date(),
//           },
//           {
//             new: true,
//           }
//         );

//       res.json(order);
//     } catch (error) {
//       res.status(500).json({
//         message:
//           error.message,
//       });
//     }
//   }
// );

// ===================================
// Approve Return
// ===================================
// router.put(
//   "/approve-return/:id",
//   async (req, res) => {
//     try {
//       const order =
//         await Order.findByIdAndUpdate(
//           req.params.id,
//           {
//   returnStatus: "Approved",
//   orderStatus: "Order Returned",
//   returnActionAt: new Date(),
// },
//           {
//   returnStatus: "Rejected",
//   returnActionAt: new Date(),
// }
//         );

//       res.json(order);
//     } catch (error) {
//       res.status(500).json({
//         message:
//           error.message,
//       });
//     }
//   }
// );

// ===================================
// Approve Return
// ===================================
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

            returnActionAt:
              new Date(),
          },
          {
            new: true,
          }
        );

      res.json(order);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// ===================================
// Reject Return
// ===================================
// router.put(
//   "/reject-return/:id",
//   async (req, res) => {
//     try {
//       const order =
//         await Order.findByIdAndUpdate(
//           req.params.id,
//           {
//             returnStatus:
//               "Rejected",
//           },
//           {
//             new: true,
//           }
//         );

//       res.json(order);
//     } catch (error) {
//       res.status(500).json({
//         message:
//           error.message,
//       });
//     }
//   }
// );
// ===================================
// Reject Return
// ===================================
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

            returnActionAt:
              new Date(),
          },
          {
            new: true,
          }
        );

      res.json(order);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// ===================================
// Update Order Status
// ===================================
router.put(
  "/status/:id",
  async (req, res) => {
    try {
      const { orderStatus } =
        req.body;

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      order.orderStatus =
        orderStatus;

      if (
        orderStatus ===
        "Delivered"
      ) {
        order.deliveredAt =
          new Date();
      }

      await order.save();

      res.json(order);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// ===================================
// Delete Order
// ===================================
router.delete(
  "/:id",
  async (req, res) => {
    try {
      await Order.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message: "Order deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);



// ===================================
// Approve Payment
// ===================================

router.put(
  "/approve-payment/:id",
  async (req, res) => {
    try {

      const order =
        await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      order.paymentStatus = "Paid";
      order.orderStatus = "Ordered";
      order.paymentVerifiedBy =
        req.body.admin || "Super Admin";
      order.paymentVerifiedAt = new Date();

      order.paymentLogs.push({
        action: "Approved",
        admin: req.body.admin || "Super Admin",
        note: "Payment Verified",
      });

      await order.save();

      res.json({
        success: true,
        message: "Payment Approved Successfully",
        order,
      });

    } catch (error) {

      console.error("APPROVE PAYMENT ERROR:");
      console.error(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }
);

// ===================================
// Reject Payment
// ===================================

router.put(
  "/reject-payment/:id",
  async (req, res) => {

    try {

      const order =
        await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      order.paymentStatus = "Rejected";

      order.rejectionReason =
        req.body.reason;

      order.paymentVerifiedBy =
        req.body.admin || "Super Admin";

      order.paymentVerifiedAt =
        new Date();

      order.paymentLogs.push({
        action: "Rejected",
        admin: req.body.admin || "Super Admin",
        note: req.body.reason,
      });

      await order.save();

      res.json({
        success: true,
        message: "Payment Rejected Successfully",
        order,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }
);

module.exports = router;

