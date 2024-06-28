const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Helper function to validate that a value is a string and not a number
function isStringNotNumber(value) {
  return typeof value === 'string' && isNaN(value);
}

const ClubParticipantsSchema = new mongoose.Schema({
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClubsListing", // Assuming your club model is named ClubsListing
    required: true
  },
  name: {
    type: String,
    required: true,
    validate: {
      validator: isStringNotNumber,
      message: props => `${props.value} is not a valid name! It should be a string and not a number.`
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: isStringNotNumber,
      message: props => `${props.value} is not a valid email! It should be a string and not a number.`
    }
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }]
 
});

const ClubParticipant = mongoose.model("ClubParticipants", ClubParticipantsSchema);

module.exports = ClubParticipant;
