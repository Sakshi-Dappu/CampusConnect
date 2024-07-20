if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router({ mergeParams: true });
const app = express();
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const multer = require("multer");
const upload = multer[{ destroyListing: "uploads/" }];
//routes
const listings = require("./routes/listing.js");
const clublistings = require("./routes/clublisting.js");
const schoollistings = require("./routes/schoollisting.js");
const participationForms = require("./routes/ParticipationForms.js");
const participantsRouter = require("./routes/participants");
//Mongoose Models
const Listing = require("./models/Listing");
const ClubsListing = require("./models/ClubsListing");
const SchoolsListing = require("./models/SchoolsListing");
const NewsListing = require("./models/NewsListing.js");
//participants
const Participant = require("./models/Participant");
//clubparticipants
const ClubParticipant = require("./models/ClubParticipant");
//error handling
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const { ListingSchema } = require("./schema.js");
const { ClubListingSchema } = require("./schema.js");
const { SchoolListingSchema } = require("./schema.js");

//sessions
const session = require("express-session");
//connect-flash
const flash = require("connect-flash");

//Authentication Login/signUp
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

//router
const userRouter = require("./routes/user.js");
const { Console } = require("console");

// const MONGO_URL = "mongodb://127.0.0.1:27017/CampusConnect";
const dbUrl = process.env.ATLASDB_URL;
async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error in Mongo session store", err);
});
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

//router

//to extract ID from url
app.use(express.urlencoded({ extended: true }));
//override to implement post method in forms
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
// sessions

//css
app.use(express.static(path.join(__dirname, "/public")));
//to views ejs files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session(sessionOptions));
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.listen(8080, () => {
  console.log("Active listening to port 8080");
});

// Routes
app.get("/demouser", async (req, res) => {
  let fakeUser = new User({
    email: "student@gmail.com",
    username: "delta-student",
  });

  let registeredUser = await User.register(fakeUser, "helloworld");
  res.send(registeredUser);
});

//search bar
app.get("/search", async (req, res) => {
  try {
    const query = req.query.query;
    const eventResults = await Listing.find({ name: new RegExp(query, "i") });
    const clubResults = await ClubsListing.find({
      name: new RegExp(query, "i"),
    });
    res.render("Listings/searchResults", {
      query,
      eventResults,
      clubResults, 
      Listing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while searching.");
  }
});

app.use("/", userRouter);
app.use("/listings", listings);
app.use("/club", clublistings);
app.use("/school", schoollistings);
app.use("/participate", participationForms);
app.use("/participants", participantsRouter);

// // Event Participation form
const listing = Listing;
const club = ClubsListing;
const schoollisting = SchoolsListing;

//  error handling

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  if (!res.headersSent) {
    res.status(statusCode).render("error.ejs", { message });
  } else {
    console.error("Headers already sent.");
  }
});
