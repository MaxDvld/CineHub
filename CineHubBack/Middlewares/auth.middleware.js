import jwt from "jsonwebtoken";

// Un middleware reçoit 3 choses : la demande (req), la réponse (res) et next ("laisse passer")
export const checkToken = (req, res, next) => {

    // 1. On lit le header Authorization
    //    Postman l'enverra sous la forme : "Bearer eyJhbGciOi..."
    const authHeader = req.headers.authorization;

    // 2. On garde seulement le token : on coupe au niveau de l'espace et on prend la 2e partie
    //    "Bearer eyJ..." → ["Bearer", "eyJ..."] → "eyJ..."
    const token = authHeader && authHeader.split(" ")[1];

    // 3. Pas de token → 401 "Unauthorized" (pas de bracelet du tout)
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        // 4. On vérifie le token avec la clé secrète
        //    Si le token est faux, modifié ou expiré, jwt.verify déclenche une erreur → on va dans le catch
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 5. Token valide : on range les infos de l'utilisateur dans req.user
        //    (le Controller pourra savoir QUI fait la demande : req.user.us_id, req.user.us_role…)
        req.user = decoded;

        // 6. On laisse passer vers la suite (le Controller ou un autre middleware)
        next();

    } catch (error) {
        // Token invalide ou expiré → 403
        return res.status(403).json({ error: "Token incorrect" });
    }
};