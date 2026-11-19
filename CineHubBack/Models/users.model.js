// On récupère la connexion à la base
import db from "../Config/db.js";

// 1. Ajouter un utilisateur (le rôle est FORCÉ à 'user')
export const createUser = async (username, email, hashedPassword) => {
  const [result] = await db.query(
    "INSERT INTO users (us_username, us_email, us_password, us_role) VALUES (?, ?, ?, 'user')",
    [username, email, hashedPassword] // remplacent les ? dans l'ordre
  );
  return result; // infos sur l'insertion (dont le nouvel id)
};

// 2. Trouver un utilisateur grâce à son username
export const getUserByUsername = async (username) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE us_username = ?",
    [username]
  );
  return rows[0]; // le 1er résultat, ou undefined si personne
};

export const getAllUsers = async () => {
  const [rows] = await db.query(
    `SELECT us_id, us_username, us_email, us_role FROM users`,
  )
  return rows
}
  
export const getUserById = async (id) => {
  const [rows] = await db.query (
    `SELECT us_id, us_username, us_email, us_role FROM users WHERE us_id = ?`,
    [id]
  )
  return rows[0]
}

export const updateUserById = async (id, username, email) => {
  const [results] = await db.query(
    `UPDATE users SET us_username = ?, us_email = ? WHERE us_id = ?`,
    [username, email,id]
  )
  return results
}

export const deleteUserById = async (id) => {
  const [results] = await db.query(
    `DELETE FROM users WHERE us_id = ?`,
    [id]
  )
  return results
}