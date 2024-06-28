const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { SchoolListingSchema } = require("../schema.js");
const SchoolsListing = require("../models/SchoolsListing");
const Listing = require("../models/Listing");
const listing = Listing;
const ExpressError = require("../utils/ExpressError.js");
const schoolController = require("../controllers/schoollistings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//Add new school GET & POST
//render form
router.get(
  "/AddSchool",
  wrapAsync(schoolController.addschool)
);

//handle for submission
router.post(
  "/AddSchool",
  upload.single('schoollisting[image]'),
  wrapAsync(schoolController.addschoolpost)
);

//show route school
router.get(
  "/:id",
  wrapAsync(schoolController.showschool)
);

//edit route for school

router.get(
  "/:id/editSchool",
  wrapAsync(schoolController.editSchool)
);

router.put(
  "/:id", upload.single('schoollisting[image]'),
  wrapAsync(schoolController.editschoolPut)
);

//delete route for schools
 
router.get(
  "/:id/deleteSchool",
  wrapAsync(schoolController.deleteSchool)
);

module.exports = router;
