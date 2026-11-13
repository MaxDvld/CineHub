import { getAllFilms } from "../Models/films.model.js"; // ← .js ajouté

export const getFilms = async (req, res) => {
    try {
        const films = await getAllFilms();
        res.json(films); // 200 par défaut = "OK"
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des films" });
    }
};