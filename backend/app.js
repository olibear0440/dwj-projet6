//import packages
const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const mongoLink = process.env.mongoLink;

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

//l'application express
const app = express();

//logique de connexion à mongoDB (base de donnée et hebergement gratuit)
mongoose
  .connect(process.env.mongoLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

//protection de l'application par configuration des en-tetes http
app.use(helmet());

//protection  contre l'injection de caractere interdit dans les entrées de données utilisateurs
app.use(mongoSanitize({ replaceWith: "_" }));

app.use(express.json());

//enregistrement des routeurs
app.use("/api/sauces", stuffRoutes);
app.use("/api/auth", userRoutes);

//middleware pour les images
app.use("/images", express.static(path.join(__dirname, "images")));

//export de l'application express vers les autres fichiers
module.exports = app;
