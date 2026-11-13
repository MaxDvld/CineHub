   // Importe la version "promise" de mysql2 (permet d'utiliser await)
   import mysql from "mysql2/promise";

   // Crée un "pool" de connexions à la base, avec les infos du .env
   const db = mysql.createPool({
     host: process.env.DB_HOST,
     port: process.env.DB_PORT,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     dateStrings: true, // ← AJOUT : renvoie les dates comme du texte ("2010-07-21"), sans décalage horaire
   });

   // On exporte db pour pouvoir l'utiliser dans les Models
   export default db;