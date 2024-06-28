
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchoolsListingSchema = new mongoose.Schema({
  // Define schema fields here
  // For example:
  name: {
    type: String,
   
  },
  dean: {
    type: String,
   
  },
  location: {
    type: String,
   
  },
  description: {
    type: String,
   
  },
  website: {
    type: String,
   
  },
  image: {
    url: String,
    filename: String,
  },
  owner : {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }]

});



const SchoolsListing = mongoose.model('SchoolsListing', SchoolsListingSchema);

module.exports = SchoolsListing;
