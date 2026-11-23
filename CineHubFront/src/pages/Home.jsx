import { useEffect, useState } from "react"
import { Alert, Row, Col, Card, Button } from "react-bootstrap"
import { apiFetch } from "../services/api.js"
import { Link } from "react-router-dom"
function Home() {
    const [films, setFilms] = useState([]) 
    const [error, setError] = useState("") 

    
    useEffect(() => {
        async function loadFilms() {
            try {
                const data = await apiFetch("/films/showing")
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
            <p>Bienvenue sur le site du cinéma !</p>

            
            {error && <Alert variant="danger">{error}</Alert>}

            
            <Row>
                {films.map((film) => (
                    <Col key={film.fi_id} md={4} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>{film.fi_title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {film.fi_genre} · {film.fi_duration} min
                                </Card.Subtitle>
                                <Card.Text>{film.fi_description}</Card.Text>
                                <Button as={Link} to={"/films/" + film.fi_id}>Détails</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Home