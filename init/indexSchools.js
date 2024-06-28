const mongoose = require("mongoose");
const initSchoolsData = require("./SchoolsData.js"); // Corrected import statement
const SchoolsListing = require("../models/SchoolsListing.js");

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
  await initSchoolsDB(); // Call the function to initialize schools data after connecting to the database
}

const initSchoolsDB = async () => {
  await SchoolsListing.deleteMany({});
  initSchoolsData.data = initSchoolsData.data.map((obj) => ({ ...obj, owner: "6671c81cdb58dd27f9be7f93"}));
  await SchoolsListing.insertMany(initSchoolsData.data); 
  console.log("Schools data was initialized");
console.log(initSchoolsData.data);
};
 