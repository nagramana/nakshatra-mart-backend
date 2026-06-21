const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      default: "All",
      enum: [
        "All",
        "Men",
        "Women",
        "Boys",
        "Girls",
      ],
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    discount: {
      type: String,
      default: "0% OFF",
    },

    image: {
      type: String,
      required: true,
    },

    initialStock: {
      type: Number,
      default: 0,
    },

    sold: {
      type: Number,
      default: 0,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  ProductSchema
);