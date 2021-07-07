//import packages
const express = require("express");

//mon application
const app = express();

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

//tester si serveur Node gère correctement l'application Express
app.use((req, res) => {
  res.json({ message: "node gere bien l'appli express!" });
});

//export de l'appli vers les autres fichiers
module.exports = app;
