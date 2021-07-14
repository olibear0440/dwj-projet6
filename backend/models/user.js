// import packages
const mongoose = require("mongoose");

//import du plugin qui facilite la tache d'avoir un seul utilisateur par adresse mail
const uniqueValidator = require("mongoose-unique-validator");

/*---schema de donnée user-------------------------------------------*/
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//validateur appliqué au schema
userSchema.plugin(uniqueValidator);

//export du modele de ce schema
module.exports = mongoose.model("User", userSchema);
