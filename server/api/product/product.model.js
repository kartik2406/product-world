const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  /* Properties that are generic to a product type */
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "BOOK",
  },
  name: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },

  /* Properties specific to books*/
  authors: {
    type: String,
  },
  average_rating: {
    type: Number,
  },
  isbn: {
    type: Number,
  },
  language_code: {
    type: String,
  },
  ratings_count: {
    type: Number,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
