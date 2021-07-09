//import packages
const express = require("express");
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");
const path = require("path");

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

//mon application
const app = express();

//connexion mongoDB
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

//transformer le json en objet javascript pour tte les routes
//app.use(bodyParser.json());
app.use(express.json());

//middleware pour les images
app.use("/images", express.static(path.join(__dirname, "images")));

//enregistrement des routeurs
app.use("/api/auth", userRoutes);
app.use("/api/sauces", stuffRoutes);

//export de l'appli vers les autres fichiers
module.exports = app;
