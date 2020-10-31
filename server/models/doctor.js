const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  specialization: {
    type: String,
    required: [false, "Please enter specialization"],
  },
  years_of_experience: {
    type: Number,
    required: [false, "Please enter years of experience"],
    min: [0, "Years of experience must be at least 0"],
  },
  verified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
});

DoctorSchema.pre("save", function (next) {
  this.rating = this.verified
    ? this.years_of_experience * 2
    : this.years_of_experience;
  next();
});

// Doctor model inheriting from base User and adding new requisite fields
const Doctor = User.discriminator("Doctor", DoctorSchema);

module.exports = mongoose.model("Doctor");
