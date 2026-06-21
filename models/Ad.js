const mongoose = require("mongoose");

const AdSchema =
  new mongoose.Schema({
    title: String,

    description: String,

    image: String,

    buttonText: String,

    link: String,

    active: {
      type: Boolean,
      default: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports =
  mongoose.model(
    "Ad",
    AdSchema
  );