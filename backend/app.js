//import packages
const express = require("express");

//mon application
const app = express();

//tester si serveur Node gère correctement l'application Express
app.use((req, res) => {
  res.json({ message: "node gere bien l'appli express!" });
});

//export de l'appli vers les autres fichiers
module.exports = app;
