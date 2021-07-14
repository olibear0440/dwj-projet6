//import packages
const jwt = require("jsonwebtoken");

/*---middleware de protection des routes et de verification du user-------------- */
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // recuperation du token du tableau [bearer, token]
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");// verification du token
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {// si user id et different du user id 
      throw "Utilisateur non valide !";
    } else {
      next(); // si verification ok passer la requette au prochain middleware
    }
  } catch (error) {
    res.status(401).json({
      error: error | "Requette non valide !",
    });
  }
};
