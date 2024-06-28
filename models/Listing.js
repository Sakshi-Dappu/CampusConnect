const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function isStringNotNumber(value) {
  return typeof value === "string" && isNaN(value);
}

const ListingSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: isStringNotNumber,
      message: (props) =>
        `${props.value} is not a valid name! It should be a string and not a number.`,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    validate: {
      validator: isStringNotNumber,
      message: (props) =>
        `${props.value} is not a valid description! It should be a string and not a number.`,
    },
  },

  time: {
    type: String,
    required: true,
    validate: {
      validator: isStringNotNumber,
      message: (props) =>
        `${props.value} is not a valid meeting time! It should be a string and not a number.`,
    },
  },

  location: {
    type: String,
    validate: {
      validator: isStringNotNumber,
      message: (props) =>
        `${props.value} is not a valid location! It should be a string and not a number.`,
    },
  },
  organizer: {
    type: String,
    validate: {
      validator: isStringNotNumber,
      message: (props) =>
        `${props.value} is not a valid organizer name! It should be a string and not a number.`,
    },
  },
  image: {
    url: String,
    filename: String,
  }, 
  // owner must be a registered on this web so take type and ref as mentioned below
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
 
const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
