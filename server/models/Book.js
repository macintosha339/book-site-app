const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  year: {
    type: Number,
  },
  genre: {
    type: String,
  },
  author: {
    type: String,
  },
});

module.exports = mongoose.model("Book", BookSchema);
