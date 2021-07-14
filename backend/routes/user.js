//import package
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

/*---routes d'envoi de l'adresse mail et du mot de passe------------------------------*/
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

//export du router
module.exports = router;
