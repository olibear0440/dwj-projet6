//import packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//mon application
const app = express();

mongoose
  .connect(
    "mongodb+srv://OlivierBenoit:Tigerwood0440@clustertest.i1tkd.mongodb.net/OlivierOPCR?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//evite erreur CORS (securite de requette malveillante)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//route post

//transformer le json en objet javascript pour tte les routes
app.use(bodyParser.json());

/*
//tester si serveur Node gère correctement l'application Express
app.use((req, res) => {
  res.json({ message: "node gere bien l'appli express!" });
});
*/

//export de l'appli vers les autres fichiers
module.exports = app;
