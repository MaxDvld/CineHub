import db from '../Config/db.js'

export const getCapacityByScreening = async (screeningId) => {
    const [rows] = await db.query(
        `SELECT ro_capacity
         FROM screenings
         JOIN rooms ON sc_room = ro_id   -- la séance connaît le n° de salle, on va lire sa capacité
         WHERE sc_id = ?`,
        [screeningId]
    );
    return rows[0];
};

export const getReservedSeats = async (screeningId) => {
    const [rows] = await db.query(
        `SELECT COALESCE(SUM(re_seats), 0) AS total
         FROM reservations
         WHERE re_screening = ?`,
        [screeningId]
    );
    return Number(rows[0].total);
};

export const createReservation = async (user, screening, seats) =>{
    const [results] = await db.query (
        `INSERT INTO reservations (re_user, re_screening, re_seats)
        VALUES (?,?,?)`,
        [user, screening, seats]
    )
    return results.insertId
}

export const getReservationsByUser = async (userId) => {
    const [rows] = await db.query(
        `SELECT re_id, re_seats, fi_title, sc_datetime, ro_name, sc_price
        FROM reservations 
        JOIN screenings ON re_screening = sc_id
        JOIN films ON sc_film = fi_id
        JOIN rooms ON sc_room = ro_id
        WHERE re_user = ?
        ORDER BY sc_datetime`,
        [userId]
    )
    return rows 
}

export const getAllReservations = async () => {
    const [rows] = await db.query(
        `SELECT re_id, us_username, re_seats, fi_title, sc_datetime, ro_name, sc_price
        FROM reservations 
        JOIN screenings ON re_screening = sc_id
        JOIN users ON re_user = us_id
        JOIN films ON sc_film = fi_id
        JOIN rooms ON sc_room = ro_id
        ORDER BY sc_datetime`,
    )
    return rows 
}

export const getAllReservationsByScreening = async (screeningId) => {
    const [rows] = await db.query(
        `SELECT re_id, us_username, re_seats, fi_title, sc_datetime, ro_name, sc_price
        FROM reservations 
        JOIN screenings ON re_screening = sc_id
        JOIN users ON re_user = us_id
        JOIN films ON sc_film = fi_id
        JOIN rooms ON sc_room = ro_id
        WHERE re_screening = ? 
        ORDER BY sc_datetime`,
        [screeningId]
    )
    return rows 
}

export const getReservationById = async (id) =>{
    const [rows] = await db.query(
        `SELECT * FROM reservations WHERE re_id = ?`,
        [id]
    )
    return rows[0]
}

export const deleteReservationById = async (id) => {
    const [results] = await db.query(
        `DELETE FROM reservations WHERE re_id = ?`,
        [id]
    )
    return results
}


