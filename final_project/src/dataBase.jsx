import React, { useState, useEffect } from 'react';
import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import { getData,saveIngredient2,SyncIngredients } from './dataFunction'; // Importation de la fonction getData
import { BinIdRecipe,BinIdIngredient } from './acessCode'

function DataBase({ isAuthenticated }) {
  const [data, setData] = useState([]);
  const [ingredients, setIngredient] = useState([]); // Initialize as an array, not an object
  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(true);
  const [ show, setShow]=useState(false)
  

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getData(BinIdRecipe); // Appel à la fonction importée
      setData(allData.recipes);
      setLoadingData(false);
    };
    fetchData(data);
    const fetchIngredient = async () => {
      const allIngredient = await getData(BinIdIngredient); // Appel à la fonction importée
      setIngredient(allIngredient.ingredients);
      setLoading(false);
    };
    fetchIngredient(ingredients);
  }, []);

  
  SyncIngredients(data, ingredients, loading, loadingData, BinIdIngredient, setIngredient, setShow);

  const handleChange = (index, field, value) => {
    const updatedIngredient = [...ingredients]; // Clone the output array
    updatedIngredient[index][field] = value;
    setIngredient(updatedIngredient);
  };
  const handleSave = () => {
    saveIngredient2(ingredients, BinIdIngredient, setIngredient, setShow);
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
              <th>Quantité</th>
              <th>Measure</th>
              <th>Prix ($)</th>              
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
                      value={ingredient.priceQty}
                      onChange={(e) => handleChange(index, 'priceQty', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ingredient.measure}
                      onChange={(e) => handleChange(index, 'measure', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={ingredient.unitPrice}
                      onChange={(e) => handleChange(index, 'unitPrice', e.target.value)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <button onClick={handleSave} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>
            Sauvegarder 
          </button>
      </div>
    </>
  );
}

export default DataBase;