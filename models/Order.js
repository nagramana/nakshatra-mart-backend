const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

  // ===========================================
  // ORDER ID
  // ===========================================

  id: {
    type: String,
    required: true,
    unique: true,
  },

  // ===========================================
  // CUSTOMER DETAILS
  // ===========================================

  customer: {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },
  },

  // ===========================================
  // PRODUCTS
  // ===========================================

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

  // ===========================================
  // PAYMENT DETAILS
  // ===========================================

  paymentMethod: {
    type: String,
    enum: ["COD", "UPI"],
    required: true,
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
    trim: true,
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
        required: true,
      },

      admin: {
        type: String,
        required: true,
      },

      note: {
        type: String,
        default: "",
      },

      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  // ===========================================
  // ORDER STATUS
  // ===========================================

  orderStatus: {
  type: String,
  enum: [
    "Pending",
    "Ordered",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
    "Order Returned"
  ],
  default: "Processing"
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

  // ===========================================
  // RETURN DETAILS
  // ===========================================

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
    enum: [
      null,
      "Pending",
      "Approved",
      "Rejected",
    ],
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

  // ===========================================
  // REVIEW
  // ===========================================

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  review: {
    type: String,
    default: "",
  },

  // ===========================================
  // CREATED DATE
  // ===========================================

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model(
  "Order",
  OrderSchema
);