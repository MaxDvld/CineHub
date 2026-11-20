# Cinehub - API REST gestion de cinéma

API Node.js / Express / Mysql / pour gérer des films, des salles, des séances, des réservations.
Authentification par token JWT, avec des routes réservées aux administrateurs.

## Installation 

1. Cloner le dépôt puis aller dans le dossier `CineHubBack`
2. Installer les librairies : 

npm install 

3. Démarrer MySQL
4. Importer bdd.sql
5. Copier `.env.example`, le renommer `.env`et remplir les valeurs (mot de passe MySQL, JWT_SECRET)

## LANCEMENT 

npm start 

L'API démarre sur http://127.0.0.1:3000

## Compte de test

rôle : admin
{
    "username" : "admin",
    "password": "Admin1234"
}

rôle : user
{
    "username" : "maxime",
    "password": "1234"
}

## Exemple d'appels 

Toutes les routes sauf `/`et `/auth` demandent un header : 
`Authorization : Bearer <token>`

| Méthode | URL | Qui | DESCRIPTION
|---|---|---|---|
| POST | /auth/register | Public | Inscription
| POST | /auth/login | Public | Connexion, renvoie un token 
| GET | /films/showing | Connecté | films à l'affiche 
| GET | /films/1 | Connecté | Détail d'un film et de ses séances 
| POST | /films | Admin | Créer un film 
| POST | /reservations | Connecté | Réserver une séance 
| GET | /reservations/me | Connecté | Mes réservations
| DELETE | /reservations/1 | Propriétaire ou Admin | Annuler une réservation

Exemple de body pour la connexion : 
{ "username" : "maxime", "password" : "1234" }

Exemple de body pour la réservation : 
{ "screening" : 1, "seats" : 2}

## Tests Postman

Importer le fichier `CineHub.postman_collection.json` dans Postman.