import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import {Form, Button} from 'react-bootstrap';
import React, { useRef} from "react";
import FormLabel from 'react-bootstrap/FormLabel'

function Login({isAuthenticated,setAuthenticated}) {
    const usernameRef = useRef(); // Créez une référence pour l'input du nom d'utilisateur
    const passwordRef = useRef(); // Créez une référence pour l'input du mot de passe
    const handleSubmit = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const username1 = usernameRef.current.value;
        const password1 = passwordRef.current.value;
    
        console.log("Username:", username);
        console.log("Password:", password);
        if (username==username1 && password1==password){
            setAuthenticated(true)
        }       
      };
    return (<>
    {isAuthenticated ? (<NavbarLoged/>):(<NavbarUnLoged/>)}
    <p>login</p>

    <Form  onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="your username"  ref={usernameRef}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
            <Form.Label >Password</Form.Label>
            <Form.Control type="text" aria-describedby="passwordHelpBlock" placeholder="your password" ref={passwordRef} />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>    
    </>
    )
};

export default Login;