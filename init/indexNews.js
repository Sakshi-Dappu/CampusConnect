const mongoose = require("mongoose");
const initNewsData = require("./NewsData.js"); 
const NewsListing = require("../models/NewsListing.js");

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
  await initNewsDB(); // Call the function to initialize data after connecting to the database
}

const initNewsDB = async () => {
  await NewsListing.deleteMany({});
  initNewsData.data = initNewsData.data.map((obj) => ({ ...obj, owner: "6671c81cdb58dd27f9be7f93"}));
  await NewsListing.insertMany(initNewsData.data); 
  console.log("News data was initialized");
console.log(initNewsData.data);
};
