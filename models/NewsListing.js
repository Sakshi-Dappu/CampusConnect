const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NewsListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }]
});

const NewsListing = mongoose.model("NewsListing", NewsListingSchema);

module.exports = NewsListing;
