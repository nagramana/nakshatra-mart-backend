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
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
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

    category: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      default: "All",
    },

    color: {
      type: String,
      default: "",
    },

    fabric: {
      type: String,
      default: "",
    },

    size: {
      type: String,
      default: "",
    },

    rating: {
      type: String,
      default: "4.3",
    },

    occasion: {
      type: String,
      default: "",
    },

    material: {
      type: String,
      default: "",
    },

    combo: {
      type: String,
      default: "",
    },

    fitShape: {
      type: String,
      default: "",
    },

    bottomLength: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    discount: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
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