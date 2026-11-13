   import bcrypt from "bcrypt";
   import { createUser } from "../Models/users.model.js";

   // INSCRIPTION : POST /auth/register
   export const register = async (req, res) => {
     try {
       // 1. Récupérer ce que l'utilisateur a envoyé (le "corps" de la requête)
       const { username, email, password } = req.body;

       if (!username || !email || !password) {
        return res.status(403).json({error:"Veuillez entrer toute les informations"})
       }

       // 3. Hacher le mot de passe (le "mixeur")
       const hashedPassword = bcrypt.hashSync(password, 10);

       // 4. Demander au Model d'enregistrer l'utilisateur
       const result = await createUser(username, email, hashedPassword);

       // 5. Répondre 201 (créé) SANS renvoyer le mot de passe
       res.status(201).json({ message: "Utilisateur créé", result });
     } catch (error) {
      console.error(error)
       // En cas de problème (ex : username déjà pris) → 500
       res.status(500).json({ error: "Erreur lors de l'inscription" });
     }
   };