const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const Participant = require("../models/Participant");
const wrapAsync = require("../utils/wrapAsync.js");
const { ClubListingSchema } = require("../schema.js");
const { SchoolListingSchema } = require("../schema.js");
const ClubsListing = require("../models/ClubsListing");
const SchoolsListing = require("../models/SchoolsListing");
const Listing = require("../models/Listing");
const listing = Listing;
const ClubParticipant = require("../models/ClubParticipant");
const club = ClubsListing;
const schoollisting = SchoolsListing;

//event participation form
router.get(
  "/event/:id",
  wrapAsync(async (req, res) => {
    if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;
      req.flash("error", "You must be Logged in to participate in Events !");
      return res.redirect("/login");
    }
    let { id } = req.params;
    const listing = await Listing.findById(id);

    res.render("Listings/EParticipationform.ejs", { listing });
  })
);

router.post(
  "/event/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const newParticipant = new Participant({
      eventId: id,
      name,
      email,
    });

    //Add user to the participants array in the listing
    

    await newParticipant.save();
    req.flash("success", " Successfully Enrolled! Check Profile Section");
    res.redirect("/Listings");
    
  })
);

//Club Participation form
router.get(
  "/club/:id",
  wrapAsync(async (req, res) => {
    if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;
      req.flash("error", "You must be Logged in to join Club !");
      return res.redirect("/login");
    }
    const { id } = req.params;
    const club = await ClubsListing.findById(id);
    res.render("Listings/CParticipationform.ejs", { club });
  })
);

router.post(
  "/club/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const newClubParticipant = new ClubParticipant({
      clubId: id,
      name,
      email,
    });
    await newClubParticipant.save();
    req.flash("success", " Successfully Joined the Club !");
    res.redirect("/Listings");
  })
);

//fetching participants
router.get(
  "/student/:email/participation",
  wrapAsync(async (req, res) => {
    if (!req.isAuthenticated()) {
      req.flash("error", "You must be Logged in to participate !");
      return res.redirect("/login");
    }
    const { email } = req.params;
    try {
      // Fetch the participation list for the given email
      const participationRecord = await ParticipationList.findOne({ email })
        .populate("participatedEvents")
        .populate("participatedClubs");

      // Check if records exist
      if (!participationRecord) {
        return res.status(404).send("No participation records found.");
      }

      // Render the EJS template with the combined data
      res.render("Listings/participationList", {
        participatedEvents: participationRecord.participatedEvents,
        participatedClubs: participationRecord.participatedClubs,
      });
    } catch (error) {
      console.error("Error fetching participation list:", error);
      res.status(500).send("Error fetching participation list");
    }
  })
);

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
      const clubparticipantsData = await ClubParticipant.find({
        email: userEmail,
      });
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
