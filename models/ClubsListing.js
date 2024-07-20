

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Updated_at = new Date().toLocaleString();

// Helper function to validate that a value is a string and not a number
function isStringNotNumber(value) {
  return typeof value === 'string' && isNaN(value);
}
 
let ClubSchemaDefinition = ({
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

if(Updated_at.length > 0) {
  ClubSchemaDefinition.Updated_at = {
    type: String
  }
}

const ClubsListingSchema = new mongoose.Schema(ClubSchemaDefinition);

const ClubsListing = mongoose.model('ClubsListing', ClubsListingSchema);

module.exports = ClubsListing;
