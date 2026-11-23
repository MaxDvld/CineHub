import { Navbar, Nav, Container } from "react-bootstrap"
import { NavLink, useLocation, useNavigate } from "react-router-dom"

function NavBar() {
    useLocation()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    function handleLogout () {
        localStorage.removeItem("token")
        navigate("/login")
    }
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="md">
            <Container>
                <Navbar.Brand as={NavLink} to="/">CineHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="menu" />
                <Navbar.Collapse id="menu">
                    <Nav className="ms-auto">
                        {token ? (
                        <Nav.Link onClick={handleLogout}>Déconnexion</Nav.Link>
                        ) : (
                        <>
                        <Nav.Link as={NavLink} to="/register">Inscription</Nav.Link>
                        <Nav.Link as={NavLink} to="/login">Connexion</Nav.Link>
                        </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar