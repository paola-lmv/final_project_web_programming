import {Container, Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function NavbarUnLoged() {
    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                  <Navbar.Brand href="/">Navbar</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link href="/#/menu">Menu Display</Nav.Link>
                    <Nav.Link href="/#/inscription">Inscription</Nav.Link>
                    <Nav.Link href="/#/login">Login</Nav.Link>
                  </Nav>
                </Container>
            </Navbar>
      </>
    )
};

export default NavbarUnLoged;