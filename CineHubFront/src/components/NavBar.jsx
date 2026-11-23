import { Navbar, Nav, Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="md">
            <Container>
                <Navbar.Brand as={NavLink} to="/">CineHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="menu" />
                <Navbar.Collapse id="menu">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/register">Inscription</Nav.Link>
                        <Nav.Link as={NavLink} to="/login">Connexion</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar