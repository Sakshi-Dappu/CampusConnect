


const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const ListingSchema = Joi.object({
  listing: Joi.object({
    name: Joi.string().required(),
    date: Joi.when(Joi.ref("$type"), {
      is: "event",
      then: Joi.number().required(),
      otherwise: Joi.string().required()
    }),
    description: Joi.string().required(),
    time: Joi.required(),
    location: Joi.string().required(),
    organizer: Joi.string().required(),
    image: Joi.string().allow("", null),
  }).required(),
}).required();

const ClubsListingSchema = Joi.object({
  listing: Joi.object({
    name: Joi.string().required(),
    meetingTime: Joi.number().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    organizer: Joi.string().required(),
    image: Joi.string().allow("", null),
  }).required(),
}).required();

const SchoolListingSchema = Joi.object({
  listing: Joi.object({
    name: Joi.string().required(),
    dean: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    website: Joi.string().required(),
  }),
});

module.exports = { ListingSchema, ClubsListingSchema, SchoolListingSchema };


