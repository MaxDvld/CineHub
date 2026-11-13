import db from '../Config/db.js'

export const getAllFilms = async () => {
    const [rows] = await db.query(
        "SELECT * FROM films",
    )
    return rows
}

export const getFilmById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM films WHERE fi_id = ?",
        [id]
    )
    return rows [0]
}

// Séances À VENIR d'un film, avec le nom de la salle (jointure)
export const getUpcomingScreeningsByFilm = async (id) => {
    const [rows] = await db.query(
        `SELECT sc_id, sc_datetime, sc_price, ro_name
         FROM screenings
         JOIN rooms ON screenings.sc_room = rooms.ro_id   -- on relie chaque séance à sa salle
         WHERE sc_film = ?                                 -- seulement les séances de CE film
         AND sc_datetime > NOW()                         -- seulement celles à venir
         ORDER BY sc_datetime`,                            
        [id]
    );
    return rows;
};
export const getShowingFilms = async () => {
    const [rows] = await db.query(
        "SELECT * FROM films WHERE fi_is_showing = 1",
    )
    return rows 
}
