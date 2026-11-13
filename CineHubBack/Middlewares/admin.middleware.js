// Vigile n°2 : vérifie que l'utilisateur est admin
// (il passe toujours APRÈS checkToken, donc req.user existe déjà)
export const checkAdmin = (req, res, next) => {

    // Si le rôle n'est PAS 'admin' → on bloque
    if (req.user.us_role !== "admin") {
        return res.status(403).json({ error: "Accès réservé aux administrateurs" });
    }

    // Sinon → on laisse passer
    next();
};