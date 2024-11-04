import {Form, Button} from 'react-bootstrap';
import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import React, { useState,useEffect } from 'react';

function InscriptionForm({isAuthenticated}) {
    const [formData , setFormData] = useState({
        surname: '',
        lastName: '',
        adhesion: ''
      });  
    const [inscriptions , setInscription] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    const saveInscriptions = async (inscription) => {
        try{
          const res = await fetch(`https://api.jsonbin.io/v3/b/672923f7ad19ca34f8c42069`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-Access-Key':  '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  // Use Access Key
            },
            body: JSON.stringify({ inscriptions: inscription })
          });
          if (res.ok) {
            setInscription(inscriptions)// Add new post to the array of posts
          }
        } catch(e) {
          console.error(e);
          setShow(true);
        }
      }
    // Fonction de gestion du changement de valeur des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log('Valeur actuelle du champ:', name, value);
    console.log('Données du formulaire:', formData);
  };

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const updatedInscriptions = [formData, ...inscriptions];
    setInscription(updatedInscriptions); // Met à jour l'état local avant l'appel API
    saveInscriptions(updatedInscriptions); // Enregistre les nouvelles données sur l'API

    console.log('Données du formulaire:', formData);
    // Réinitialise les champs du formulaire
    setFormData({
        surname: '',
        lastName: '',
        adhesion: ''
    });
  };
    return (<>
    {isAuthenticated ? (<NavbarLoged/>):(<NavbarUnLoged/>)}
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="Surname">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" placeholder="your surname"  value={formData.surname} onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="LastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" placeholder="your Last name" value={formData.lastName} onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="adhesion">
            <Form.Label>are you a member of the BDE?"</Form.Label>
            <Form.Select  name= "adhesion" value={formData.adhesion} onChange={handleChange} >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
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