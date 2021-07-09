//import packages
const http = require("http");

//importer mon application
const app = require("./app");

//port utilisé par l'application
app.set("port", process.env.PORT || 3000);

//creation du serveur
const server = http.createServer(app);

//port utilisé par le serveur
server.listen(process.env.PORT || 3000);
