import { getCapacityByScreening, getReservedSeats, createReservation, getReservationsByUser, getAllReservations, getAllReservationsByScreening, getReservationById, deleteReservationById } from '../Models/reservations.model.js'

export const insertReservation = async (req, res) => {
    try {
        const { screening, seats } = req.body
        const userId = req.user.us_id
        if (!screening) {
            return res.status(403).json({ error: "La séance est obligatoire" })
        }
        const nbSeats = seats ?? 1
        if (!Number.isInteger(nbSeats) || nbSeats < 1) {
            return res.status(403).json({ error: "Le nombre de places doit être de 1 minimum" })
        }

        // 🆕 6. Capacité de la salle → si rien trouvé, la séance n'existe pas
        const capacity = await getCapacityByScreening(screening)
        if (!capacity) {
            return res.status(404).json({ error: "Séance introuvable" })
        }

        // 🆕 7. Combien de places sont déjà prises ?
        const reserved = await getReservedSeats(screening)

        // 🆕 8. Déjà prises + demandées > capacité de la salle → refus
        if (reserved + nbSeats > capacity.ro_capacity) {
            return res.status(403).json({ error: "Plus assez de places disponibles" })
        }

        // 9. Tout est bon → on enregistre (qui, quelle séance, combien)
        const results = await createReservation(userId, screening, nbSeats)
        return res.status(201).json({ message: "La réservation a été effectuée", id: results })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erreur lors de la création de la réservation" })
    }
}

export const getMyReservations = async (req,res) => {
    try {
        const id = req.user.us_id
        const reservation = await getReservationsByUser(id)
        if (!reservation){
            return res.status(404).json({ error : "Reservation introuvable"})
        }
        return res.status(200).json(reservation)
    } catch (error) {
        console.error(error)
        res.status(500).json({error : "Erreur lors de la récupération des événements"})
    }
}

export const getReservations  = async (req,res) =>{
    try {
        const reservations = await getAllReservations()
        return res.status(200).json(reservations)
    } catch (error) {
        console.error(error)
        res.status(500).json({error : "Erreur lors de la récupération des reservations"})
    }
}

export const getScreeningReservations = async (req,res) =>{
    try {
        const screeningID = req.params.screeningID
        const reservations = await getAllReservationsByScreening(screeningID)
        return res.status(200).json(reservations)
    } catch (error) {
        console.error(error)
        res.status(500).json({error : "Erreur lors de la recupération des résérvations par séance"})
    }
}

export const cancelReservation = async (req, res) => {
    try {
        // 1. Le numéro de la RÉSERVATION, écrit dans l'adresse (/reservations/1)
        const id = req.params.id

        // 2. On lit CETTE réservation → si elle n'existe pas → 404
        const reservation = await getReservationById(id)
        if (!reservation) {
            return res.status(404).json({ error: "Réservation introuvable" })
        }

        // 3. Ni le propriétaire, ni un admin → refus
        if (reservation.re_user !== req.user.us_id && req.user.us_role !== "admin") {
            return res.status(403).json({ error: "Vous ne pouvez annuler que vos propres réservations" })
        }

        // 4. On supprime, puis 5. on confirme
        await deleteReservationById(id)
        return res.status(200).json({ message: "Réservation annulée" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erreur lors de l'annulation de la réservation" })
    }
}