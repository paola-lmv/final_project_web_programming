import {Container, Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function NavbarLoged() {
    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                  <Navbar.Brand href="/">Log out</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link href="/#/menu">Menu Display</Nav.Link>
                    <Nav.Link href="/#/inscriptionManagement"> See inscriptions</Nav.Link>
                    <Nav.Link href="/#/menuCreate">Create a menu</Nav.Link>
                    <Nav.Link href="/#/forecast">The Forecast</Nav.Link>
                    <Nav.Link href="/#/recipeManagement">Manage the recipes</Nav.Link>
                   < Nav.Link href="/#/recipeOrderTable">Manage the order</Nav.Link>
                   < Nav.Link href="/#/database">Manage the database</Nav.Link>                
                  </Nav>
                </Container>
            </Navbar>
        </>
    )
};

export default NavbarLoged;