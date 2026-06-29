const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },

  customer: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },

  items: [
    {
      id: String,
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],

  total: {
    type: Number,
    required: true,
  },

  // ===========================
  // PAYMENT DETAILS
  // ===========================

  paymentMethod: {
    type: String,
    default: "UPI",
  },

  paymentStatus: {
    type: String,
    enum: [
      "Pending Verification",
      "Paid",
      "Rejected",
    ],
    default: "Pending Verification",
  },

  utrNumber: {
    type: String,
    default: "",
  },

  paymentScreenshot: {
    type: String,
    default: "",
  },

  paymentVerifiedBy: {
    type: String,
    default: "",
  },

  paymentVerifiedAt: {
    type: Date,
    default: null,
  },

  rejectionReason: {
    type: String,
    default: "",
  },

  paymentLogs: [
    {
      action: {
        type: String,
      },

      admin: {
        type: String,
      },

      note: {
        type: String,
      },

      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  // ===========================
  // ORDER STATUS
  // ===========================

  orderStatus: {
    type: String,
    enum: [
      "Payment Verification Pending",
      "Order Placed",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ],
    default: "Payment Verification Pending",
  },

  progress: {
    type: Number,
    default: 25,
  },

  deliveredAt: {
    type: Date,
    default: null,
  },

  trackingSteps: {
    type: [String],
    default: [],
  },

  // ===========================
  // RETURN DETAILS
  // ===========================

  returnEligible: {
    type: Boolean,
    default: true,
  },

  returnRequested: {
    type: Boolean,
    default: false,
  },

  returnStatus: {
    type: String,
    default: null,
  },

  returnReason: {
    type: String,
    default: "",
  },

  returnRequestedAt: {
    type: Date,
    default: null,
  },

  returnActionAt: {
    type: Date,
    default: null,
  },

  // ===========================
  // REVIEW
  // ===========================

  rating: {
    type: Number,
    default: 0,
  },

  review: {
    type: String,
    default: "",
  },

  // ===========================
  // CREATED DATE
  // ===========================

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);