const mongoose = require("mongoose");
// const { sampleListings } = require("./EventsData.js");
const Listing = require("../models/Listing.js");
const initData = require("./EventsData.js");

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

const initDB = async () => {
   
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "6671c81cdb58dd27f9be7f93"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
  console.log(initData);
};

initDB();





// const initDB = async () => {
//   try {
    // Delete all documents from the collection
    // await Listing.deleteMany({});

    // Check if initData and initData.sampleListings are defined and are arrays
//     if (initData && Array.isArray(initData.sampleListings)) {
//       initData.sampleListings = initData.sampleListings.map((obj) => ({ ...obj, owner: "66681e3af61691cb79f5d4e3" }));
//       await Listing.insertMany(initData.sampleListings);
//       console.log("Data was initialized");
//     } else {
//       console.error("initData.sampleListings is not defined or not an array");
//     }
//   } catch (error) {
//     console.error("Error initializing data:", error);
//   }
// };

// initDB();
