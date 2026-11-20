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

export const insertFilm = async (title, description, duration, genre, release_date, is_showing) => {
    const [results] = await db.query(
        "INSERT INTO films (fi_title, fi_description, fi_duration, fi_genre, fi_release_date, fi_is_showing) VALUES (?, ?, ?, ?, ?, ?)",  
        [title, description, duration, genre, release_date, is_showing]
    );
    return results;
}

export const updateFilmById = async (id, title, description, duration, genre, release_date, is_showing) => {
    const [results] = await db.query(
        "UPDATE films SET fi_title = ?, fi_description = ?, fi_duration = ?, fi_genre = ?, fi_release_date = ?, fi_is_showing = ? WHERE fi_id = ?",  
        [title, description, duration, genre, release_date, is_showing, id]
    );
    return results;
}

export const deleteFilmById = async (id) => {
    const [results] = await db.query(
        "DELETE FROM films WHERE fi_id = ?",  
        [id]
    );
    return results;
}
