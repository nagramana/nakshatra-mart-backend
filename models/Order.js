const mongoose = require("mongoose");

const OrderSchema =
  new mongoose.Schema({
    id: String,

    customer: {
      name: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
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

    total: Number,

    paymentMethod: String,

   orderStatus: {
  type: String,
  default: "Order Placed",
},

progress: {
  type: Number,
  default: 25,
},

deliveredAt: {
  type: Date,
  default: null,
},

trackingSteps: [String],

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

returnReason: String,

returnRequestedAt: {
  type: Date,
  default: null,
},

returnActionAt: {
  type: Date,
  default: null,
},

rating: {
  type: Number,
  default: 0,
},

review: {
  type: String,
  default: "",
},

createdAt: {
  type: Date,
  default: Date.now,
},
  });

module.exports =
  mongoose.model(
    "Order",
    OrderSchema
  );