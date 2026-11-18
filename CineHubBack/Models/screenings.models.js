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
        `SELECT sc_id, sc_film, sc_room, sc_datetime, sc_price, fi_title, ro_name
        FROM screenings 
        JOIN films ON sc_film = fi_id
        JOIN rooms ON sc_room = ro_id 
        WHERE sc_id = ?`,
        [id]
    )
    return rows[0]
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

export const createScreening = async (film, room, datetime, price) => {
    const [result] = await db.query(
        `INSERT INTO screenings (sc_film, sc_room, sc_datetime, sc_price)
        VALUES (?,?,?,?),`
        [film, room, datetime, price]
    )
    return result.insertId
}

export const updateScreeningById = async (id, film, room, datetime,price) =>{
    const [results] = await db.query(
        `UPDATE screenings SET sc_film = ?, sc_room = ?, sc_datetime = ? ,sc_price = ? WHERE sc_id = ?`,
        [film, room, datetime, price, id]
    )
    return results
}

export const deleteScreeningById = async (id) =>{
    const [results] = await db.query(
        `DELETE FROM screenings WHERE sc_id = ?`,
        [id]
    )
    return results
}