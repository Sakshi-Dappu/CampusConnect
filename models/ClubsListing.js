

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Helper function to validate that a value is a string and not a number
function isStringNotNumber(value) {
  return typeof value === 'string' && isNaN(value);
}

const ClubsListingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: isStringNotNumber,
      message: props => `${props.value} is not a valid name! It should be a string and not a number.`
    }
  },
  meetingTime: {
    type: String,
    required: true,
    validate: {
      validator: isStringNotNumber,
      message: props => `${props.value} is not a valid meeting time! It should be a string and not a number.`
    }
  },
  location: {
    type: String,
    required: true,
    validate: {
      validator: isStringNotNumber,
      message: props => `${props.value} is not a valid location! It should be a string and not a number.`
    }
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: isStringNotNumber,
      message: props => `${props.value} is not a valid description! It should be a string and not a number.`
    }
  },
  organizer: {
    type: String,
    required: true,
    validate: {
      validator: isStringNotNumber,
      message: props => `${props.value} is not a valid organizer name! It should be a string and not a number.`
    }
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

const ClubsListing = mongoose.model('ClubsListing', ClubsListingSchema);

module.exports = ClubsListing;