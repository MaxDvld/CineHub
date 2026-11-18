import { getCapacityByScreening, getReservedSeats, createReservation } from '../Models/reservations.model.js'

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