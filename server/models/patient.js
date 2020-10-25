const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

// Patient model inheriting from base User and adding new requisite fields
const Patient = User.discriminator(
  "Patient",
  Schema({
    gender: { type: String, required: true, enum: ["Female", "Male", "Other"] },
    height: { type: Number, required: true, max: 300, min: 60 },
    weight: { type: Number, required: true, max: 650, min: 3 },
  })
);

Patient.schema.virtual("url").get(() => {
  return "/patients/" + this._id;
});

module.exports = mongoose.model("Patient");
