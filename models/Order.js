const mongoose = require("mongoose");

const OrderSchema =
  new mongoose.Schema(
    {
      orderId: String,

      customer: {
        name: String,
        phone: String,
        address: String,
      },

      items: Array,

      total: Number,

      orderStatus: {
        type: String,
        default: "Order Placed",
      },

      returnRequested: {
        type: Boolean,
        default: false,
      },

      returnStatus: {
        type: String,
        default: null,
      },

      returnReason: String,
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Order",
    OrderSchema
  );