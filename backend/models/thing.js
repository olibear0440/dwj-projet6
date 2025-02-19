//import packages
const mongoose = require("mongoose");


/*---creation schema de base de donnée------------------------------------*/
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true }, 
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true, default: 0},
  dislikes: { type: Number, required: true,  default: 0},
  usersLiked: { type: [String], required: true},
  usersDisliked: { type: [String], required: true},
});

//export du modele
module.exports = mongoose.model("Sauce", sauceSchema);
