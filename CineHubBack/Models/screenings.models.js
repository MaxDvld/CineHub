import db from '../Config/db.js'

export const getAllScreenings = async () => {
    const [rows] = await db.query(
        `SELECT sc_id, sc_datetime, sc_price, fi_title, ro_name
        FROM screenings
        JOIN films ON sc_film = fi_id
        JOIN rooms ON sc_room = ro_id 
        ORDER BY sc_datetime`,
    )
    return rows
}

export const getScreeningById = async (id) => {
    const [rows] = await db.query(
        `SELECT sc_id, sc_datetime, sc_price, fi_title, ro_name
        FROM screenings 
        JOIN films ON sc_film = fi_id
        JOIN rooms ON sc_room = ro_id 
        WHERE sc_id = ?`,
        [id]
    )
    return rows [0]
}

export const getScreeningByFilmId = async (filmId) => {
    const [rows] = await db.query(
        `SELECT sc_id, sc_datetime, sc_price, fi_title, ro_name
        FROM screenings 
        JOIN films ON sc_film = fi_id
        JOIN rooms ON sc_room = ro_id 
        WHERE sc_film = ?
        ORDER BY sc_datetime`,
        [filmId]
    )
    return rows
}
