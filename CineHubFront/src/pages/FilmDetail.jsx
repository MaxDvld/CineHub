import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Alert } from "react-bootstrap"
import { apiFetch } from "../services/api.js"

function FilmDetail() {
    const { id } = useParams()
    const [film, setFilm] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        async function loadFilm() {
            try {
                const data = await apiFetch("/films/" + id)
                setFilm(data)
            } catch (err) {
                setError(err.message)
            }
        }
        loadFilm()
    }, [id])
    if (error) return <Alert variant="danger">{error}</Alert>
    if (!film) return <p>Chargement ...</p>
    return (
        <div>
            <h1>{film.fi_title}</h1>
            <p>{film.fi_description}</p>
            <pre>{JSON.stringify(film, null, 2)}</pre>
        </div>
    )
}
export default FilmDetail