# Projet_TSPark
Projet TSPark - Back-end d'une appli de salle de gym

Le projet est constitué d'une API et d'un début de mini FrontEnd

Les deux sont hébergés sur Render.com

URL API: https://projet-tspark.onrender.com
URL FRONT: https://fronttspark.onrender.com

/!\ Il faut patienter pour l'API en ligne, le temps qu'elle se lance (environ 30 secondes) /!\

Dans ce projet on retrouve également la collection Postman avec toutes les routes et le SQL exporté complet (tspark_terminal.sql).

On recommende dumoins de tester en local pour vérifier les créations, modifications et suppréssion des données
Pour cela, tout d'abord, pour l'api, faire un npm install, et ensuite un npm run build
Pour le front, faire un npm install, et ensuite un npm run dev, et pour lire depuis l'api locale, changer dans le fichier client.js dans /src/api, l'URL vers le local

Le postman contient une route pour générer les tokens de chaque niveau d'autorisation (User, Owner, Admin)
Pour tester le front rapidement du côté hébergé sur Render, il faut se connecter avec un compte avec les identifiants: *admin@gmail.com* et mdp *admin*