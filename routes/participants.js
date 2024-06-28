const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const Participant = require("../models/Participant.js");

const wrapAsync = require("../utils/wrapAsync.js");
const { ClubListingSchema } = require("../schema.js");
const { SchoolListingSchema } = require("../schema.js");
const ClubsListing = require("../models/ClubsListing.js");
const SchoolsListing = require("../models/SchoolsListing.js");
const Listing = require("../models/Listing.js");
const listing = Listing;
const ClubParticipant = require("../models/ClubParticipant.js");
const club = ClubsListing;
const schoollisting = SchoolsListing;

router.get(
    "/ParticipantsList",
    wrapAsync(async (req, res) => {
      if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be Logged in to view the List!");
        return res.redirect("/login");
      }
  
      const userEmail = req.user.email;
      const username = req.user.username;
  
      try {
        // Fetch event participants
        const participantsData = await Participant.find({ email: userEmail });
        const eventDetails = await Promise.all(
          participantsData.map(async (participant) => {
            const event = await Listing.findById(participant.eventId);
            return {
              ...participant._doc, // Spread participant data
              eventName: event ? event.name : "N/A",
              eventdate: event ? event.date : "N/A",
              eventdescription: event ? event.description : "N/A",
              eventlocation: event ? event.location : "N/A",
              eventorganizer: event ? event.organizer : "N/A",
              eventimage: event ? event.eventimage : { url: "", filename: "" },
              eventtime: event ? event.eventtime : "N/A",
            };
          })
        );
  
        // Fetch club participants
        const clubparticipantsData = await ClubParticipant.find({ email: userEmail });
        const clubDetails = await Promise.all(
          clubparticipantsData.map(async (clubparticipant) => {
            const club = await ClubsListing.findById(clubparticipant.clubId);
            return {
              ...clubparticipant._doc, // Spread clubparticipant data
              clubName: club ? club.name : "N/A",
            };
          })
        );
  
        res.render("Listings/Participants.ejs", {
          eventDetails,
          clubDetails,
          userEmail,
          username,
        });
      } catch (error) {
        console.error("Error fetching participants:", error);
        res.status(500).send("Error fetching participants");
      }
    })
  );
  
  module.exports = router;