// import des packages
const http = require("http");

//creation du serveur avec fonction qui renvoie la reponse du serveur
const server = http.createServer((req, res) => {
  res.end("test de reponse du serveur");
});


// ecoute de la requette- checker la reponse sur localhost:3000
server.listen(process.env.PORT || 3000);
