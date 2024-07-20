const Listing = require("../models/Listing.js");
const ClubsListing = require("../models/ClubsListing");
const SchoolsListing = require("../models/SchoolsListing");
const NewsListing = require("../models/NewsListing.js");
const { ListingSchema } = require("../schema.js");
const Participant = require("../models/Participant");
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  const allClubsListings = await ClubsListing.find({});
  const allSchoolsListings = await SchoolsListing.find({});
  const allNewsListings = await NewsListing.find({});
// const allWorkshops = await Workshops
  res.render("Listings/index.ejs", {
    allListings,
    allClubsListings,
    allSchoolsListings, 
    allNewsListings,
  });
};

module.exports.AddEvent = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be Logged in to add 'New Event' !");
    return res.redirect("/login");
  }
  await res.render("Listings/newEvents.ejs");
};



module.exports.showListing = async (req, res) => {
  
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("owner");
 
  if (!listing) {
    req.flash("error", "Events Details you requested does not exist !");
    res.redirect("/Listings");
  }
  // console.log(listing);
  const participants = await Participant.find({ eventId: id});
  const currUser = req.user;
  const userIsParticipant = currUser
  ? participants.some(participant => participant.email === currUser.email)
  :false;
  res.render("Listings/show.ejs", { listing,  currUser, userIsParticipant});
};

module.exports.AddEventPostRoute = async (req, res, next) => {
  let result = ListingSchema.validate(req.body);
  console.log(result);
  if (result.error) {
    throw new ExpressError(400, result.error);
  }
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing); 
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", " New Event added !");
  res.redirect("/listings");
};

module.exports.EditListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("Listings/editEvent.ejs", { listing });
};

module.exports.UpdateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing, Updated_at: new Date().toLocaleString() });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", " Event details updated !");
  res.redirect(`/Listings/${id}`);
};




module.exports.destroyListing = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be Logged in to delete !");
    return res.redirect("/login");
  }
  let { id } = req.params;
  let data = await Listing.findByIdAndDelete(id);
  console.log(data);
  req.flash("success", " Event deleted !");
  res.redirect("/Listings");
};
