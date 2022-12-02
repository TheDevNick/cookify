const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const ProfileSchema = new mongoose.Schema({
  userBio: { type: String },
  userCity: { type: String },
  userState: { type: String },
  userAge: { type: String },
  image: { type: String, require: true },
  cloudinaryId: { type: String, require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
})

module.exports = mongoose.model("Profile", ProfileSchema)
