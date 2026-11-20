import { getAllRooms, getRoomById, insertRoom, updateRoomById, deleteRoomById } from "../Models/rooms.model.js";

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
        const id = req.params.id;
        const room = await getRoomById(id);
        if (!room) {
            return res.status(404).json({ error: "Salle introuvable" });
        }
        res.json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération de la salle" });
    }
};

export const createRoom = async (req, res) => {
    try {
        const { name, capacity } = req.body;
        if (!name || !capacity) {
            return res.status(403).json({ error: "Veuillez renseigner le nom de la salle et sa capacité" });
        }
        const result = await insertRoom(name, capacity);
        res.status(201).json({ message: "Salle créée", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création de la salle" });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const id = req.params.id;
        const room = await getRoomById(id);
        if (!room) {
            return res.status(404).json({ error: "Salle introuvable" });
        }
        const { name, capacity } = req.body;
        await updateRoomById(
            id,
            name ?? room.ro_name,
            capacity ?? room.ro_capacity
        );
        const updated = await getRoomById(id);
        res.json({ message: "Salle modifiée", room: updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la modification de la salle" });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const id = req.params.id;
        const room = await getRoomById(id);
        if (!room) {
            return res.status(404).json({ error: "Salle introuvable" });
        }
        await deleteRoomById(id);
        res.json({ message: "La salle a été supprimée" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression de la salle" });
    }
};