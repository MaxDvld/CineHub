import { getAllUsers, getUserById, updateUserById, deleteUserById, } from '../Models/users.model.js'


export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers()
        res.json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" })
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await getUserById(id)
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" })
        }
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" })
    }
}

export const getMe = async (req, res) => {
    try {
        const id = req.user.us_id
        const user = await getUserById(id)
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" })
        }
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" })
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        if (req.user.us_role !== "admin" && req.user.us_id !== Number(id)) {
            return res.status(403).json({ error: "Vous n'êtes pas autorisé à faire cela" })
        }
        const user = await getUserById(id)
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" })
        }

        const { username, email } = req.body

        await updateUserById(
            id,
            username ?? user.us_username,
            email ?? user.us_email,
        )

        const updated = await getUserById(id)
        res.json({ message: "L'utilisateur a bien été modifié", users: updated })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erreur lors de la modification de l'utilisateur" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await getUserById(id)
        if (!user) {
            return res.status(404).json({ error: "Veuillez entrer un utilisateur valide" })
        }
        await deleteUserById(id)
        res.json({ message: "L'utilisateur a été supprimé" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" })

    }
}