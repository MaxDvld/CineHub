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

export const insertRoom = async (name, capacity) => {
    const [results] = await db.query(
        "INSERT INTO rooms (ro_name, ro_capacity) VALUES (?,?)",
        [name, capacity]
    )
    return results
}

export const updateRoomById = async (id, name, capacity) => {
    const [results] = await db.query(
        "UPDATE rooms SET ro_name = ?, ro_capacity = ? WHERE ro_id = ?",  
        [name, capacity, id]
    );
    return results;
}

export const deleteRoomById = async (id) => {
    const [results] = await db.query(
        "DELETE FROM rooms WHERE ro_id = ?",  
        [id]
    );
    return results;
}