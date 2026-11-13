import db from '../Config/db.js'

export const getAllFilms = async () => {
    const [rows] = await db.query(
        "SELECT * FROM films",
    )
    return rows
}

export const getShowingFilms = async () => {
    const [rows] = await db.query(
        "SELECT * FROM films WHERE fi_is_showing = 1",
    )
    return rows 
}
