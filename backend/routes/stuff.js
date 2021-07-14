//import package
const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/stuff");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

/*---debut de logique de routing-----------------------------------------------------*/

//route de creation de sauce
router.post("/", auth, multer, stuffCtrl.createSauce);

//route du like et dislike d'une sauce
router.post("/:id/like", auth, multer, stuffCtrl.likeSauce);

//route de mise à jour la sauce avec l'identifiant fourni
router.put("/:id", auth, multer, stuffCtrl.modifySauce);

//route de suppression de la sauce avec l'ID fourni
router.delete("/:id", auth, stuffCtrl.deleteSauce);

//route du tableau de toutes les sauces 
router.get("/", auth, stuffCtrl.getAllSauces);

//route du renvoie la sauce avec l'ID fourni
router.get("/:id", auth, stuffCtrl.getOneSauce);

/*---fin de logique de routing------------------------------------------------------*/

//export des routes
module.exports = router;
