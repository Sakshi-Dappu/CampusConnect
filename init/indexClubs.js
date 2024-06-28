
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { SampleClubsListings } = require("./ClubsData.js");
const ClubsListing = require("../models/ClubsListing.js");
const initClubsData = require("./ClubsData.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/CampusConnect";

main()
  .then(() => { 
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL); 
}

const initClubsDB = async () => {
  await ClubsListing.deleteMany({});
  initClubsData.data = initClubsData.data.map((obj) => ({ ...obj, owner: "6671c81cdb58dd27f9be7f93"}));
  await ClubsListing.insertMany( initClubsData.data);
  console.log("Clubs data was initialized");
  console.log(initClubsData);
};

initClubsDB();