//import packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

//l'application express
const app = express();

//logique de connexion à mongoDB (base de donnée et hebergement gratuit)
mongoose
  .connect(
    "mongodb+srv://OlivierBenoit:Tigerwood0440@clustertest.i1tkd.mongodb.net/OlivierOPCR?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


//middleware qui evite l'erreur CORS (securite de requette malveillante)
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


app.use(express.json());

//enregistrement des routeurs
app.use("/api/sauces", stuffRoutes);
app.use("/api/auth", userRoutes);

//middleware pour les images
app.use("/images", express.static(path.join(__dirname, "images")));

//export de l'application express vers les autres fichiers
module.exports = app;
