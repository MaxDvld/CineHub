import db from '../Config/db.js'

// Capacité de la salle où a lieu la séance (undefined si la séance n'existe pas)
export const getCapacityByScreening = async (screeningId) => {
    const [rows] = await db.query(
        `SELECT ro_capacity
         FROM screenings
         JOIN rooms ON sc_room = ro_id   -- la séance connaît le n° de salle, on va lire sa capacité
         WHERE sc_id = ?`,
        [screeningId]
    );
    return rows[0]; // une seule séance → rows[0]
};

// Nombre total de places déjà réservées pour une séance
export const getReservedSeats = async (screeningId) => {
    const [rows] = await db.query(
        `SELECT COALESCE(SUM(re_seats), 0) AS total
         FROM reservations
         WHERE re_screening = ?`,
        [screeningId]
    );
    return Number(rows[0].total); // on transforme en vrai nombre
};

export const createReservation = async (user, screening, seats) =>{
    const [results] = await db.query (
        `INSERT INTO reservations (re_user, re_screening, re_seats)
        VALUES (?,?,?)`,
        [user, screening, seats]
    )
    return results.insertId
}