# backend
pour mettre à jour le serveur lors du developpement executer dans la console **npm install -g nodemon** puis **nodemon server**


## Database MongoDB
Pour acceder à la base de donnée, creer un compte **Mongodb**
Dans le backend, creer un fichier **.env**
Copier les informations du fichier **.env.exemple** dans votre fichier **.env**
Remplacer **Mon lien de connexion Mongo** par votre **lien de connection (string)** 


### database collection name
Ci dessous un exemple 
users:
{
    "_id":{"$oid":"60eedf49395afc2eecf7ac42"},
    "email":"jeanlouis@gmail.com",
    "password":"$2b$10$QU34c70mY3.Z/snP2Fixy.r3MseEbjLt4Qg.eK3sCYxWWkteG2//S",
    "__v":{
        "$numberInt":"0"
    }
}

products:
{
    "_id":{"$oid":"60e0bfb3cdda691fa841f457"},
    "name":"My test product",
    "description":"Some stuff",
    "price":{"$numberInt":"40000"},
    "inStock":true,
    "__v":{
        "$numberInt":"0"
    }
}

sauces:
{
    "_id": {"$oid": "60f3f27c7ec2b5be83afc898"},
    "likes": {"$numberInt": "4"},
    "dislikes": {"$numberInt": "2"},
    "usersLiked": ["60eedea6395afc2eecf7ac29", "60eedf77395afc2eecf7ac55", "60eedf49395afc2eecf7ac42", "60f17cb585125d1f44a08b71"],
    "usersDisliked": ["60e9946305591c08106afc60", "60ec157b4d4b652500d87692"],
    "name": "Sauce piquante africaine",
    "manufacturer": "Fait maison",
    "description": "Sauce pimenté africaine à base de piment antillais à la tomate",
    "mainPepper": "piment antillais",
    "heat": {"$numberInt": "8"},
    "userId": "60e94a927670ee2098bc0bf9",
    "imageUrl": "http://localhost:3000/images/sauce-piquante-africaine.jpg1625901998023.jpg",
    "__v": {
        "$numberInt": "0"
    }
}

