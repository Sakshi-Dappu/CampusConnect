const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function isStringNotNumber(value) {
  return typeof value === "string" && isNaN(value);
}

const participateSchema = new mongoose.Schema({
  eventId: String,
  name: String,
  email: String,
  eventtime: Date,
  eventdate: Date,
  eventdescription: String,
  eventlocation: String,
  eventorganizer: String,
  eventimage: {
    url: String,
    filename: String,
  },
});

const Participant = mongoose.model("Participant", participateSchema);

module.exports = Participant;
const clubParticipantSchema = new mongoose.Schema({
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClubsListing",
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }]
});
const ClubParticipant = mongoose.model(
  "ClubParticipant",
  clubParticipantSchema
);
