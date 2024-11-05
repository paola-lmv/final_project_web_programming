import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import React, { useState, useEffect } from 'react';

function InscriptionManagement({isAuthenticated}) { 
  const [inscriptions , setInscription] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const getData = async () => {
      try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/672923f7ad19ca34f8c42069/latest`, {
          method: 'GET',
          headers: {'X-Access-Key': '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  }
        });
    
        const json = await res.json();
        setInscription(json.record.inscriptions)
        setLoading(false);
      } catch(e) {
        console.error(e);
        setInscription([])
        setLoading(false);
      }
    }
    useEffect(()=> {
      getData()}, []);

  const saveInscription = async (inscription) => {
      try{
        const res = await fetch(`https://api.jsonbin.io/v3/b/672923f7ad19ca34f8c42069`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key':  '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  // Use Access Key
          },
          body: JSON.stringify({ inscriptions: inscription })
        });
      } catch(e) {
        console.error(e);
        setShow(true);
      }
    }
  
  
    // Fonction pour gérer la modification des cellules
    const handleChange = (index, field, value) => {
      const updatedInscription = [...inscriptions];
      updatedInscription[index][field] = value;
      setInscription(updatedInscription);
      saveInscription(updatedInscription)     
    };
  
    // Fonction pour supprimer une ligne
    const handleDelete = (index) => {
      const updatedInscription = inscriptions.filter((_, i) => i !== index);
      saveInscription(updatedInscription)
      setInscription(updatedInscription)
    };
  
    return (<>
    {isAuthenticated ? (<NavbarLoged/>):(<NavbarUnLoged/>)}
    <p>InscriptionManagement</p>

    <div>
      <h2>Tableau Interactif</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Surname</th>
            <th>Last Name</th>
            <th>Adhesion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inscriptions.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.surname}
                  onChange={(e) => handleChange(index, 'surname', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.lastName}
                  onChange={(e) => handleChange(index, 'lastName', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={item.adhesion}
                  onChange={(e) => handleChange(index, 'adhesion', e.target.value)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
    )
};

export default InscriptionManagement;