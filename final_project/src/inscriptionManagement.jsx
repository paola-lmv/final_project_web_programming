import NavbarUnLoged from './navbar_unloged'; 
import NavbarLoged from './navbar_loged';
import React, { useState, useEffect } from 'react';
import { BinIdInscription } from './acessCode'
import { getData, saveInscription,handleChange } from './dataFunction';
import {useTranslation} from  "react-i18next";

function InscriptionManagement({ isAuthenticated }) { 
  // State to hold the list of inscriptions and is loading
  const [inscriptionList, setInscriptionList] = useState([]);  
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();

  // Fetch inscription data from the API when the component mounts
  useEffect(() => {
    const fetchInscriptions = async () => {
      const allInscriptions = await getData(BinIdInscription); // Fetch the inscription data
      setInscriptionList(allInscriptions.inscriptions); // Store the inscriptions data in the state
      setIsLoading(false); // Set loading state to false when data is fetched
    };
    fetchInscriptions(); // Trigger the fetch operation
  }, []);
  
  // Function to delete a row from the table
  const handleDelete = (index) => {
    const updatedInscriptions = inscriptionList.filter((_, i) => i !== index); // Filter out the item at the specified index
    saveInscription(updatedInscriptions, BinIdInscription, setInscriptionList); // Save the new list without the deleted item
  };

  return (
    <>
      {isAuthenticated ? (<NavbarLoged />) : (<NavbarUnLoged />)}

      <div>
        <h2>Interactive Table of Inscriptions</h2>
        <table border="1">
          <thead>
            <tr>
              <th>{t("Surname")}</th>
              <th>{t("LastName")}</th>
              <th>{t("Adhesion")}</th>
              <th>{t("Actions")}</th>
            </tr>
          </thead>
          <tbody>
          {isLoading ? (
              <tr><td colSpan="6">{t("Loading")}...</td></tr>):(
            inscriptionList.map((inscription, index) => (
              <tr key={index}>
                {/* Editable input fields for surname, last name, and adhesion */}
                <td>
                  <input
                    type="text"
                    value={inscription.Surname}
                    onChange={(e) => handleChange = (index, 'surname', e.target.value, inscriptionList, saveInscription, BinIdInscription, setInscriptionList)} // Update surname on change
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={inscription.LastName}
                    onChange={(e) => handleChange = (index, 'lastName', e.target.value, inscriptionList, saveInscription, BinIdInscription, setInscriptionList)}  // Update last name on change
                  />
                </td>
                <td>
                  <select
                    value={inscription.adhesion}
                    onChange={(e) => handleChange = (index, 'adhesion', e.target.value, inscriptionList, saveInscription, BinIdInscription, setInscriptionList)} // Update adhesion status on change
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button> 
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default InscriptionManagement;
