import db from '../Config/db.js'

export const getAllRooms = async () => {
    const [rows] = await db.query(
        "SELECT * FROM rooms",
    )
    return rows
}

export const getRoomById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM rooms WHERE ro_id = ?",
        [id]
    )
    return rows [0]
}