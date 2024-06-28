const { SchoolListingSchema } = require("../schema.js");
const SchoolsListing = require("../models/SchoolsListing");
const Listing = require("../models/Listing");
const listing = Listing;
const ExpressError = require("../utils/ExpressError.js");

module.exports.addschool = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be Logged in to create 'New School' !");
    return res.redirect("/login");
  }
  // if (!req.isAuthenticated()) {
  //   req.flash("error", "You must be logged in to create new School!");
  //   return res.redirect("/login");            
  // } 
  await res.render("Listings/newSchool.ejs");
};

module.exports.addschoolpost = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be Logged in to create 'New Club' !");
    return res.redirect("/login");
  }
  const { name, dean, location, description, website } = req.body;
  const newSchool = new SchoolsListing({
    name,
    dean,
    location,
    description,
    website,
    owner: req.user._id,
  });
  let url = req.file.path;
  let filename = req.file.filename;

  newSchool.owner = req.user._id;
  newSchool.image = { url, filename };

  await newSchool.save();
  req.flash("success", " New School added !");
  res.redirect("/listings");
};

module.exports.showschool = async (req, res) => {
  let { id } = req.params;
  const schoollisting = await SchoolsListing.findById(id).populate("owner");
  console.log(schoollisting);
  if (!schoollisting) {
    req.flash("error", "School Details you requested does not exist !");
    res.redirect("/Listings");
  }
  res.render("Listings/shows.ejs", { schoollisting, listing, id });
};

module.exports.editSchool = async (req, res) => {
  let { id } = req.params;
  const schoollisting = await SchoolsListing.findById(id);
  res.render("Listings/editSchool.ejs", { schoollisting });
};

module.exports.editschoolPut = async (req, res) => {
  let { id } = req.params;
  let schoollisting = await SchoolsListing.findByIdAndUpdate(id, { ...req.body.schoollisting });
  
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    schoollisting.image = { url, filename };
    await schoollisting.save();
  }
  req.flash("success", " School details updated !");
  res.redirect(`/school/${id}`);
};

module.exports.deleteSchool = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be Logged in to delete  !");
    return res.redirect("/login");
  }
  let { id } = req.params;
  await SchoolsListing.findByIdAndDelete(id);
  req.flash("success", " School deleted !");
  res.redirect("/Listings");
};
