const ClubsListing = require("../models/ClubsListing");
const Listing = require("../models/Listing");
const listing = Listing;
const club = ClubsListing;
const ClubParticipant = require("../models/ClubParticipant");
module.exports.addClub = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;

    req.flash("error", "You must be Logged in to create 'New Club' !");
    return res.redirect("/login");
  }
  res.render("Listings/newClub.ejs");
};

module.exports.addClubPost = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be Logged in to create 'New Club' !");
    return res.redirect("/login");
  }
  const { name, meetingTime, location, description, organizer } = req.body;
  const newClub = new ClubsListing({
    name,
    meetingTime,
    location,
    description,
    organizer,
    owner: req.user._id,
  });
  let url = req.file.path;
  let filename = req.file.filename;

  newClub.owner = req.user._id;
  newClub.image = { url, filename };

  await newClub.save();
  req.flash("success", " New Club added !");
  res.redirect("/listings");
};



module.exports.showClub = async (req, res) => {
  let { id } = req.params;
  const clublisting = await ClubsListing.findById(id).populate("owner");
  const clubparticipants = await ClubParticipant.find({ clubId : id});
 const currUser = req.user;
  const userIsClubParticipant = currUser
 ? clubparticipants.some(clubparticipant => clubparticipant.email === currUser.email)
  :false;
  if (!clublisting) {
    req.flash("error", "Club Details you requested does not exist !");
    return res.redirect("/Listings");
  }
  res.render("Listings/showc.ejs", { club: clublisting, listing, currUser,userIsClubParticipant });
};

module.exports.editClub = async (req, res) => {
  let { id } = req.params;
  const club = await ClubsListing.findById(id);


  res.render("Listings/editClub.ejs", { club });
};

module.exports.puteditClub = async (req, res) => {
  let { id } = req.params;
  let club =  await ClubsListing.findByIdAndUpdate(id, { ...req.body.club });
  
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    club.image = { url, filename };
    await club.save();
  }

  req.flash("success", " Club details updated!");
  res.redirect(`/club/${id}`);

};

 // let { id } = req.params; 
  // await ClubsListing.findByIdAndUpdate(id, { ...req.body });
  // if (typeof req.file !== "undefined") {
  //   let url = req.file.path;
  //   let filename = req.file.filename;
  //   club.image = { url, filename };
  //   // await club.save();
  // }
  // console.log(ClubsListing);
  // req.flash("success", " Club details updated !");
  // res.redirect(`/club/${id}`);


module.exports.deleteClub = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be Logged in to delete !");
    return res.redirect("/login");
  }
  let { id } = req.params;
  await ClubsListing.findByIdAndDelete(id);
  req.flash("success", " Club deleted !");
  res.redirect("/Listings");
};
