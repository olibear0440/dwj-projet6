const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/stuff");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//creation sauce
router.post("/", auth, multer, stuffCtrl.createSauce);

//tableau de toutes les sauces dans la base de données
router.get("/", auth, stuffCtrl.getAllSauces);

//Renvoie la sauce avec l'ID fourni
router.get("/:id", auth, stuffCtrl.getOneSauce);

//Met à jour la sauce avec l'identifiant fourni
router.put("/:id", auth, multer, stuffCtrl.modifySauce);

//Supprime la sauce avec l'ID fourni
router.delete("/:id", auth, stuffCtrl.deleteSauce);


module.exports = router;
