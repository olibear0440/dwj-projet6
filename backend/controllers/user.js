//import package
const bcrypt = require("bcrypt"); //package de cryptage
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");

//parametre de mot de passe attendu
const newPassword = new passwordValidator();
newPassword
  .is()
  .min(8)
  .is()
  .max(20)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .symbols(1)
  .has()
  .not()
  .spaces();

/*---fonction d'enregistrement d'un nouvel utilisateur-----------------------------------*/
exports.signup = (req, res, next) => {
  if (newPassword.validate(req.body.password)) {
    bcrypt
      .hash(req.body.password, 10) //hashage (cryptage) du mot de passe/ algorithme passé 10 fois
      .then((hash) => {
        const user = new User({
          //enregistrement du hash dans un new user
          email: req.body.email,
          password: hash,
        });
        user
          .save() //enregistrement dans la base de donnée
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    throw "Le mot de passe doit contenir entre 8 et 20 caracteres dont une majuscule, une minuscule, un chiffre et un symbole";
  }
};

/*---fonction de connexion d'un utilisateur existant------------------------------------*/
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // trouver l'user de la base de donnée
    .then((user) => {
      if (!user) {
        //si pas de user
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt // utilisation de bcrypt pour comparer le mdp utilisé avec le user reçu
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            //si mdp incorrect entré
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            //renvoi de requette ok, objet json (user id) et token
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error })); //pb de connexion mongodb
};
