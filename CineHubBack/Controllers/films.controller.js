import { getAllFilms, getShowingFilms, getFilmById, getUpcomingScreeningsByFilm } from "../Models/films.model.js";

// GET /films → liste de tous les films
export const getFilms = async (req, res) => {
    try {
        const films = await getAllFilms();
        res.json(films);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des films" });
    }
};

// GET /films/showing → films à l'affiche
export const getShowing = async (req, res) => {
    try {
        const films = await getShowingFilms();
        res.json(films);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des films en cours de projection" });
    }
};

// GET /films/:id → un film + ses prochaines séances
export const getFilm = async (req, res) => {
    try {
        const id = req.params.id;                                  // le numéro écrit dans l'URL
        const film = await getFilmById(id);                        // on cherche le film
        if (!film) {
            return res.status(404).json({ error: "Film introuvable" });
        }
        const screenings = await getUpcomingScreeningsByFilm(id);  // puis ses séances à venir
        res.json({ film, screenings });                            // on renvoie les deux ensemble
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération du film" });
    }
};