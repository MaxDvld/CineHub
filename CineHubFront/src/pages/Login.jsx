import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button, Alert } from "react-bootstrap"
import { apiFetch } from "../services/api.js"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        try {

            const data = await apiFetch("/auth/login", "POST", { username, password })
            localStorage.setItem("token", data.token)
            navigate("/")
        } catch (err) {
            setError(err.message)
        }
    }
    return (

        <div>
            <h1>Connexion</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Pseudo</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group>
                <Button type="submit">Connexion</Button>
            </Form>
        </div>
    )
}

export default Login