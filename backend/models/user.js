// import packages
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//schema de donnée user
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
