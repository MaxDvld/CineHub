import db from '../Config/db.js'

export const getAllFilms = async () => {
    const [rows] = await db.query(
        "SELECT * FROM films",
    )
    return rows
}