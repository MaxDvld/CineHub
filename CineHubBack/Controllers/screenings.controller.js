import { getAllScreenings, getScreeningById, getScreeningByFilmId } from "../Models/screenings.models.js";

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

export const getScreeningByfilm = async (req,res) =>{
    try {
        const filmID = req.params.filmID
        const screening = await getScreeningByFilmId(filmID)
        return res.status(200).json(screening)
    } catch (error) {
        console.error(error)
        res.status(500).json({error : "Erreur lors de la récupération de la séance et du film"})
    }
}