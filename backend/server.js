// import des packages
const http = require("http");

// importer mon application
const app = require("./app");

//indication du port sur lequel express va tourner
app.set("port", process.env.PORT || 3000);

//creation du serveur avec fonction qui renvoie la reponse du serveur
const server = http.createServer(app);

// ecoute de la requette- checker la reponse sur localhost:3000
server.listen(process.env.PORT || 3000);
