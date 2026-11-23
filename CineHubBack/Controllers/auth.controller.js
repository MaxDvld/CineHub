import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByUsername } from "../Models/users.model.js";


export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(403).json({ error: "Veuillez entrer toutes les informations" });
        }

        const hash = bcrypt.hashSync(password, 10);

        const result = await createUser(username, email, hash);

        res.status(201).json({ message: "Utilisateur créé", result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'inscription" })
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(403).json({ error: "Veuillez entrer toutes les informations" });
        }

        const user = await getUserByUsername(username);

        if (!user || !bcrypt.compareSync(password, user.us_password)) {
            return res.status(403).json({ error: "Identifiants incorrects" });
        }

        const token = jwt.sign(
            {
                us_id: user.us_id,
                us_username: user.us_username,
                us_email: user.us_email,
                us_role: user.us_role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Connexion réussie", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
};