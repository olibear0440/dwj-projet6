//import packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Sauce = require("./models/thing");
//console.log(Sauce)

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

//transformer le json en objet javascript pour tte les routes
app.use(bodyParser.json());

//envois de tte les sauces
app.post("/api/sauces", (req, res, next) => {
  delete req.body.userId; //retirer le id car il va etre creé par mongo
  const sauce = new Sauce({
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

//
app.post("/api/sauces", (req, res, next) => {

  
})







//Renvoie la sauce avec l'ID fourni
app.get("/api/sauces/:id", (req, res, next) => {
  Sauce.findOne({ userId: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
});

//Met à jour la sauce avec l'identifiant fourni
app.put("/api/sauces/:id", (req, res, next) => {
  Sauce.updateOne(
    { UserId: req.params.id },
    { ...req.body, userId: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});


//Supprime la sauce avec l'ID fourni
app.delete("/api/sauces/:id", (req, res, next) => {
  Sauce.deleteOne({ UserId: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

//Renvoie le tableau de toutes les sauces dans la base de données
app.use("/api/sauces", (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json({ sauces }))
    .catch((error) => res.status(400).json({ error }));
});

//export de l'appli vers les autres fichiers
module.exports = app;
