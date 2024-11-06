import React, { useState, useEffect } from 'react';
import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import { getData } from './dataFunction'; // Importation de la fonction getData
import { BinIdRecipe } from './acessCode'

function DataBase({ isAuthenticated }) {
  const [data, setData] = useState([]);
  const [ingredients, setIngredient] = useState([]); // Initialize as an array, not an object
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getData(BinIdRecipe); // Appel à la fonction importée
      setData(allData.recipes);
      setLoading(false);
    };
    fetchData(data);
  }, []);

  useEffect(() => {
    if (!loading && data.length > 0) {
      const newIngredient = [];

      data.forEach(recipe => {
        if (recipe.ingredients) {
          recipe.ingredients.forEach(ingredient => {
            const exists = newIngredient.some(ing => ing.type === ingredient.type && ing.measure === ingredient.measure);
            if (!exists) {
              newIngredient.push({
                type: ingredient.type,
                quantity: ingredient.quantity,
                measure: ingredient.measure,
                fournisseur: "À définir",
                prix: "À définir",
                quantité: "À définir"
              });
            }
          });
        }
      });
      setIngredient(newIngredient); // Set the output as an array of ingredients
    }
  }, [data, loading]);

  const initialisationData = async () => {
    console.log("initialisationData")
    try{
      const res = await fetch(`https://api.jsonbin.io/v3/b/672b36ddacd3cb34a8a397ff`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key':  '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  
        },
        body: JSON.stringify({ingredients})
      });
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (!loading && ingredients.length > 0) {
      initialisationData();
      console.log("initialisation")
    }
  }, [loading, ingredients]);

  const saveIngredient = async (ingredient) => {
    try{
      const res = await fetch(`https://api.jsonbin.io/v3/b/672b36ddacd3cb34a8a397ff`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key':  '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  
        },
        body: JSON.stringify({ingredients: ingredient })
      });
    } catch(e) {
      console.error(e);
    }
  }

  const handleChange = (index, field, value) => {
    const updatedIngredient = [...ingredients]; // Clone the output array
    updatedIngredient[index][field] = value;
    setIngredient(updatedIngredient); // Update the state with the new array
    saveIngredient(updatedIngredient);
  };

  return (
    <>
      {isAuthenticated ? <NavbarLoged /> : <NavbarUnLoged />}
      <h2>Tableau Interactif des Ingrédients</h2>
      <div style={{ overflowX: 'auto' }}>
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Nom de l'Ingrédient</th>
              <th>Fournisseur</th>
              <th>Lien Web</th>
              <th>Prix ($)</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5">Loading...</td></tr>
            ) : (
              ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td>{ingredient.type}</td>
                  <td>
                    <input
                      type="text"
                      value={ingredient.supplier}
                      onChange={(e) => handleChange(index, 'supplier', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="url"
                      value={ingredient.webLink}
                      onChange={(e) => handleChange(index, 'webLink', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={ingredient.price}
                      onChange={(e) => handleChange(index, 'price', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ingredient.quantity}
                      onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataBase;
