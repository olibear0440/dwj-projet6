//import package http de node
const http = require("http");

//import de l'application express
const app = require("./app");

//port utilisé par l'application express
app.set("port", process.env.PORT || 3000);

//creation du serveur
const server = http.createServer(app);

//port utilisé par le serveur
server.listen(process.env.PORT || 3000);
