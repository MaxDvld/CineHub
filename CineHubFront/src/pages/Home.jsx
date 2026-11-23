import { useEffect, useState } from "react"
import { Alert } from "react-bootstrap"
import { apiFetch } from "../services/api.js"


function Home() {
    const [films, setFilms] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        async function loadFilms() {
            try {
                const data = await apiFetch("/films/showing")
                console.log(data)
                setFilms(data)
            } catch (err) {
                setError(err.message)
            }
        }
        loadFilms()
    }, [])
    return (
        <div>
            <h1>CineHub</h1>
            <p>Bienvenue sur le site du cinéma ! </p>
            {error && <Alert variant="danger">{error}</Alert>}
            <p>{films.length} film(s) à l'affiche</p>
        </div>
    )
}

export default Home