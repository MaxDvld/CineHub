   // 1. Charger dotenv : lit le fichier .env et met ses valeurs dans process.env
   import "dotenv/config";
   // 2. Importer Express et créer l'application (le serveur)
   import express from "express";
   const app = express();
   import db from "./Config/db.js"; // connexion à la base

   // 3. Permet au serveur de lire le JSON envoyé par Postman
   app.use(express.json());

   // 4. Les routes (films, auth...) seront ajoutées ici plus tard

   // 5. Route de santé : vérifie que l'API fonctionne
   app.get("/", (req, res) => {
     res.json({ status: "OK" }); // on répond toujours en JSON
   });

   // 6. Démarrer le serveur sur le port du .env
   const PORT = process.env.SERVER_PORT;

   app.listen(PORT, () => {
     // 7. Afficher l'adresse locale dans le terminal
     console.log(`Serveur lancé sur http://127.0.0.1:${PORT}`);
   });
