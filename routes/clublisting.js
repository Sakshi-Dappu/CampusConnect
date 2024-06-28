const ClubsListing = require("../models/ClubsListing");
const Listing = require("../models/Listing");
const listing = Listing;
const club = ClubsListing;
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const clublistingsController = require("../controllers/clublistings.js");

// Add new club
router.get("/AddClub", wrapAsync(clublistingsController.addClub));

// Handle new club form submission
router.post("/AddClub", upload.single('club[image]'),wrapAsync(clublistingsController.addClubPost));
  // wrapAsync(clublistingsController.addClubPost));

// Show route for clubs
router.get("/:id", wrapAsync(clublistingsController.showClub));

//edit route for clubs
router.get("/:id/editClub", wrapAsync(clublistingsController.editClub));

router.put(
  "/:id",upload.single('club[image]'), 
  wrapAsync(clublistingsController.puteditClub)
); 

// Delete route for clubs
router.get(
  "/:id/deleteClub",
  wrapAsync(clublistingsController.deleteClub)
);
module.exports = router;