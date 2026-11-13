import { getAllRooms, getRoomById } from "../Models/rooms.model.js";

export const getRooms = async (req, res) => {
    try {
        const rooms = await getAllRooms();
        res.json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des salles" });
    }
};
export const getRoom = async (req, res) => {
    try {
        const id = req.params.id;                                  // le numéro écrit dans l'URL
        const room = await getRoomById(id);  
        if (!room) {
            return res.status(404).json({ error: "Salle introuvable" });
        }  
        res.json(room)                  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération de la salle" });
    }
};