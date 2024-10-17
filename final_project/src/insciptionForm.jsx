import {Form, Button} from 'react-bootstrap';
import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';


function InscriptionForm({isAuthenticated}) {
    return (<>
    {isAuthenticated ? (<NavbarLoged/>):(<NavbarUnLoged/>)}
    <Form>
        <Form.Group className="mb-3" controlId="Surname">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" placeholder="your surname" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="LastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" placeholder="your Last name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="adhesion">
            <Form.Label>are you a member of the BDE?"</Form.Label>
            <Form.Select >
            <option>Yes</option>
            <option>No</option>
            
        </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
    </>
    )
};

export default InscriptionForm;