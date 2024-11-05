import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import React, { useState, useEffect } from 'react';


function Forecast({isAuthenticated}) {
    const [recipes , setRecipe] = useState([]);  
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    const getData = async () => {
        try {
          const res = await fetch(`https://api.jsonbin.io/v3/b/67114e74acd3cb34a898b1ed/latest`, {
            method: 'GET',
            headers: {'X-Access-Key': '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  }
          });
      
          const json = await res.json();
          setRecipe(json.record.recipes)
          setLoading(false);
        } catch(e) {
          console.error(e);
          setRecipe([])
          setLoading(false);
        }
      }
      useEffect(()=> {
        getData()}, []);
  
    const saveInscription = async (recipe) => {
        try{
          const res = await fetch(`https://api.jsonbin.io/v3/b/67114e74acd3cb34a898b1ed`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-Access-Key':  '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  // Use Access Key
            },
            body: JSON.stringify({ recipes: recipe })
          });
        } catch(e) {
          console.error(e);
          setShow(true);
        }
      }
    
    
      // Fonction pour gérer la modification des cellules
      const handleChange = (index, field, value) => {
        const updatedInscription = [...recipes];
        updatedInscription[index][field] = value;
        setRecipe(updatedInscription);
        saveInscription(updatedInscription)     
      };
    
      // Fonction pour supprimer une ligne
      const handleDelete = (index) => {
        const updatedRecipe = recipes.filter((_, i) => i !== index);
        setRecipe(updatedRecipe)
        saveInscription(updatedRecipe)
      };

    return (<>
    {isAuthenticated ? (<NavbarLoged/>):(<NavbarUnLoged/>)}
    <p>forecast</p>
    
    <div>
      <h2>Tableau Interactif des Recettes</h2>
      {recipes.map((recipe, index) => (
        <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <div>
            <strong>Title:</strong>
            <input
              type="text"
              value={recipe.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
            />
          </div>
          <div>
            <strong>Ingredients:</strong>
            <table border="1" style={{ width: '100%', marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Measure</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map((ingredient, ingIndex) => (
                  <tr key={ingIndex}>
                    <td>
                      <input
                        type="text"
                        value={ingredient.quantity}
                        onChange={(e) => handleIngredientChange(index, ingIndex, 'quantity', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={ingredient.measure}
                        onChange={(e) => handleIngredientChange(index, ingIndex, 'measure', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={ingredient.type}
                        onChange={(e) => handleIngredientChange(index, ingIndex, 'type', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => handleDelete(index)} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
    </>
    )
};

export default Forecast;