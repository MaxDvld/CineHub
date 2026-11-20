import { getAllFilms, getShowingFilms, getFilmById, getUpcomingScreeningsByFilm, insertFilm, updateFilmById, deleteFilmById } from "../Models/films.model.js";

export const getFilms = async (req, res) => {
    try {
        const films = await getAllFilms();
        res.json(films);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des films" });
    }
};

export const getShowing = async (req, res) => {
    try {
        const films = await getShowingFilms();
        res.json(films);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des films en cours de projection" });
    }
};

export const getFilm = async (req, res) => {
    try {
        const id = req.params.id;
        const film = await getFilmById(id);
        if (!film) {
            return res.status(404).json({ error: "Film introuvable" });
        }
        const screenings = await getUpcomingScreeningsByFilm(id);
        res.json({ film, screenings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération du film" });
    }
};

export const createFilm = async (req, res) => {
    try {
        const { title, description, duration, genre, release_date, is_showing } = req.body;
        if (!title || !duration){
            return res.status(403).json({error : "Veuillez rentrez le film et sa durée"})
        } 
        const result = await insertFilm (
            title,
            description ?? null,
            duration, 
            genre ?? null,
            release_date ?? null,
            is_showing ?? 1
        )
        res.status(201).json({ message: "film créé", id: result.insertId})
        
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création du film" });
    }
};

export const updateFilm = async (req, res) => {
    try {
        const id = req.params.id;

        const film = await getFilmById(id);
        if (!film) {
            return res.status(404).json({ error: "Film introuvable" });
        }

        const { title, description, duration, genre, release_date, is_showing } = req.body;

        await updateFilmById(
            id,
            title ?? film.fi_title,
            description ?? film.fi_description,
            duration ?? film.fi_duration,
            genre ?? film.fi_genre,
            release_date ?? film.fi_release_date,
            is_showing ?? film.fi_is_showing
        );

        const updated = await getFilmById(id);
        res.json({ message: "Film modifié", film: updated });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la modification du film" });
    }
};

export const deleteFilm = async (req,res) => {
    try {
        const id = req.params.id
        const film = await getFilmById (id)
        if (!film){
            return res.status(404).json({error : "Film introuvable"})
        }
        await deleteFilmById (id)
        return res.status(200).json({message : "Le film a été supprimé"})
    } catch (error) {
        console.error(error)
        res.status(500).json({error : "Erreur lors de la suppression du film"})
    }
}
