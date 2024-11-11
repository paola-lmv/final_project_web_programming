import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import React, { useState, useEffect } from 'react';
import { BinIdInscription } from './acessCode'
import { getData,saveInscription } from './dataFunction';

function InscriptionManagement({isAuthenticated}) { 
  const [inscriptions , setInscription] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchInscription = async () => {
      const allInscription = await getData(BinIdInscription); // Appel à la fonction importée
      setInscription(allInscription.inscriptions);
      setLoading(false);
    };
    fetchInscription(inscriptions);
  }, []);
    
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
      saveInscription(updatedInscription,BinIdInscription,setInscription, setShow)(updatedInscriptions); // Enregistre les nouvelles données sur l'API
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