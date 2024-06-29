const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { ListingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/Listing");
const { ClubListingSchema } = require("../schema.js");
const { SchoolListingSchema } = require("../schema.js");
const ClubsListing = require("../models/ClubsListing");
const SchoolsListing = require("../models/SchoolsListing");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
  
router.get("/", wrapAsync(listingController.index));
// router.route("/").get(wrapAsync(listingController.index));

//Add new event 

router.get("/AddEvent", wrapAsync(listingController.AddEvent));

router
 // .post("/AddEvent", wrapAsync(listingController.AddEventPostRoute));
  .post("/AddEvent",upload.single('listing[image]'),wrapAsync(listingController.AddEventPostRoute));

//Show route for events 
router.get("/:id", wrapAsync(listingController.showListing));

//edit route for event
router.get("/:id/editEvent", wrapAsync(listingController.EditListing));

//update route
router
.put("/:id",upload.single('listing[image]'), wrapAsync(listingController.UpdateListing));

//delete route for events
router.get("/:id/deleteEvent", wrapAsync(listingController.destroyListing));

module.exports = router;
