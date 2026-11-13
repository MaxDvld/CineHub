import bcrypt from "bcrypt";        // pour hacher et comparer les mots de passe
import jwt from "jsonwebtoken";     // pour créer le token de connexion
import { createUser, getUserByUsername } from "../Models/users.model.js"; // les fonctions du Model


export const register = async (req, res) => {
    try {
        // 1. On récupère ce que Postman envoie
        const { username, email, password } = req.body;

        // 2. Champs manquants → 403 (demandé par le cahier des charges)
        if (!username || !email || !password) {
            return res.status(403).json({ error: "Veuillez entrer toutes les informations" });
        }

        // 3. On hache le mot de passe (l'orange passée au mixeur 🍊)
        //    10 = le nombre de "tours de mixeur" : plus c'est haut, plus c'est sûr (et lent)
        const hash = bcrypt.hashSync(password, 10);

        // 4. On demande au Model d'enregistrer l'utilisateur (avec le hash, jamais le mot de passe en clair)
        const result = await createUser(username, email, hash);

        // 5. Tout s'est bien passé → 201 "Créé"
        res.status(201).json({ message: "Utilisateur créé", result });

    } catch (error) {
        console.error(error); // la vraie erreur, dans le terminal
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
};

export const login = async (req, res) => {
    try {
        // 1. On récupère ce que Postman envoie
        const { username, password } = req.body;

        // 2. Champs manquants → 403
        if (!username || !password) {
            return res.status(403).json({ error: "Veuillez entrer toutes les informations" });
        }

        // 3. On cherche l'utilisateur en base
        const user = await getUserByUsername(username);

        // 4. Utilisateur introuvable OU mauvais mot de passe → 403
        //    compareSync compare le mot de passe tapé avec le hash en base
        if (!user || !bcrypt.compareSync(password, user.us_password)) {
            return res.status(403).json({ error: "Identifiants incorrects" });
        }

        // 5. Tout est bon : on fabrique le "bracelet" (token)
        const token = jwt.sign(
            {
                us_id: user.us_id,
                us_username: user.us_username,
                us_email: user.us_email,
                us_role: user.us_role
            },                          // les infos rangées dans le token (jamais le mot de passe !)
            process.env.JWT_SECRET,     // la clé secrète pour signer
            { expiresIn: "1h" }         // expire au bout d'1 heure
        );

        // 6. On renvoie le message et le token
        res.json({ message: "Connexion réussie", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
};