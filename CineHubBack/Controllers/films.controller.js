import { getAllFilms, getShowingFilms, getFilmById, getUpcomingScreeningsByFilm, insertFilm, updateFilmById, deleteFilmById } from "../Models/films.model.js";

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

export const createFilm = async (req, res) => {
    try {
        const { title, description, duration, genre, release_date, is_showing } = req.body;                             // le numéro écrit dans l'URL
        if (!title || !duration){
            return res.status(403).json({error : "Veuillez rentrez le film et sa durée"})                          // on renvoie les deux ensemble
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

// PATCH /films/:id → modifier un film (admin), seulement les champs envoyés
export const updateFilm = async (req, res) => {
    try {
        const id = req.params.id;                    // le numéro du film dans l'URL

        // 1. On cherche le film actuel
        const film = await getFilmById(id);
        if (!film) {
            return res.status(404).json({ error: "Film introuvable" });
        }

        // 2. Ce que l'admin envoie (certains champs peuvent manquer)
        const { title, description, duration, genre, release_date, is_showing } = req.body;

        // 3. Nouvelle valeur si envoyée (??), sinon on garde l'ancienne
        await updateFilmById(
            id,
            title ?? film.fi_title,
            description ?? film.fi_description,
            duration ?? film.fi_duration,
            genre ?? film.fi_genre,
            release_date ?? film.fi_release_date,
            is_showing ?? film.fi_is_showing
        );

        // 4. On relit le film pour renvoyer sa version à jour
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
