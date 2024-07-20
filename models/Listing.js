const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Updated_at = new Date().toLocaleString();
function isStringNotNumber(value) {
  return typeof value === "string" && isNaN(value);
}
let schemaDefinition = 
({
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

if(Updated_at.length > 0) {
  schemaDefinition.Updated_at =  {
    type: String
  }
}


const ListingSchema = new Schema(schemaDefinition);
const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
