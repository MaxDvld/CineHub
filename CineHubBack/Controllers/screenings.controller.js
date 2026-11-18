import { getAllScreenings, getScreeningById, getScreeningByFilmId, createScreening, updateScreeningById, deleteScreeningById } from "../Models/screenings.models.js";

export const getScreenings = async (req, res) => {
    try {
        const screenings = await getAllScreenings()
        return res.status(200).json(screenings)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erreur lors de la récupération des séances" })
    }
}

export const getScreening = async (req, res) => {
    try {
        const id = req.params.id
        const screening = await getScreeningById(id)
        if (!screening) {
            return res.status(404).json({ error: "Séance introuvable" })
        }
        return res.status(200).json(screening)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erreur lors de la récupération de la séance" })
    }
}

export const getScreeningByfilm = async (req, res) => {
    try {
        const filmID = req.params.filmID
        const screening = await getScreeningByFilmId(filmID)
        return res.status(200).json(screening)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erreur lors de la récupération de la séance et du film" })
    }
}

export const insertScreening = async (req, res) => {
    try {
        const { film, room, datetime, price } = req.body
        if (!film || !room || !datetime || !price) {
            return res.status(403).json({ error: "Veuillez remplir tout les champs" })
        }
        const result = await createScreening(film, room, datetime, price)
        return res.status(201).json({ message: "La séance a bien été créée", id: result })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erreur lors de la création du film" })
    }

}

export const patchScreening = async (req, res) => {
    try {
        const id = req.params.id

        // ① LIRE la séance actuelle (pour avoir les anciennes valeurs)
        const screening = await getScreeningById(id)
        if (!screening) {
            return res.status(404).json({ error: "Séance introuvable" })
        }

        const { film, room, datetime, price } = req.body

        // ② MODIFIER : nouvelle valeur si envoyée, sinon l'ancienne
        await updateScreeningById(
            id,
            film ?? screening.sc_film,
            room ?? screening.sc_room,
            datetime ?? screening.sc_datetime,
            price ?? screening.sc_price
        )

        // ③ RELIRE la séance pour l'afficher après la modification
        const updated = await getScreeningById(id)
        return res.status(200).json({ message: "Séance modifiée", screening: updated })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erreur lors de la modification de la séance" })
    }
}

export const removeScreening = async (req, res) => {
    try {
        const id = req.params.id
        const screening = await getScreeningById(id)
        if (!screening){
            return res.status(404).json({error : "Séance introuvable"})
        }
        await deleteScreeningById (id)
        return res.status(200).json("La séance a bien été supprimé")
    } catch (error) {
        console.error(error)
        res.status(500).json({error : "Erreur lors de la supression de la séance"})
    }
}