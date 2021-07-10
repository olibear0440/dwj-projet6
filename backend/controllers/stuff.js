const Sauce = require("../models/thing");
const fs = require("fs");

//creation sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id; //retirer le id car il va etre creé par mongo
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce est enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

//modification sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "La sauce est modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

//suppression sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOneAndDelete({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//afficher ttes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json({ sauces }))
    .catch((error) => res.status(400).json({ error }));
};

//afficher une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

//like et dislike
exports.likeSauce = (req, res, next) => {
  if (req.body.like == 1) {
    Sauce.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: +1 },
        $push: { usersLiked: req.body.userId },
      }
    )
      .then(() => res.status(200).json({ message: "Vous aimez cette sauce !" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (req.body.like == -1) {
    Sauce.updateOne(
      { _id: req.params.id },
      {
        $inc: { dislikes: +1 },
        $push: { usersDisliked: req.body.userId },
      }
    )
      .then(() =>
        res.status(200).json({ message: "Vous n'aimez pas cette sauce !" })
      )
      .catch((error) => res.status(400).json({ error }));
  } else if (req.body.like == 0) {
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      if (sauce.usersLiked.includes(req.body.userId)) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
          }
        )
          .then(() =>
            res
              .status(200)
              .json({ message: "Vous annulez votre like pour cette sauce !" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
      if (sauce.usersDisliked.includes(req.body.userId)) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
          }
        )
          .then(() =>
            res.status(200).json({
              message: "Vous annulez votre dislike pour cette sauce !",
            })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    });
  }
};
