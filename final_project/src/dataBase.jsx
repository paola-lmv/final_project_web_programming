import React, { useState, useEffect } from 'react';
import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';

function DataBase({ isAuthenticated }) {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/your-json-bin-url/latest`, {
          method: 'GET',
          headers: { 'X-Access-Key': 'your-access-key' }
        });
        const json = await res.json();
        setIngredients(json.record.ingredients.map(ingredient => ({
          ...ingredient,
          supplier: '',
          webLink: '',
          price: '',
          quantity: ''
        })));
        setLoading(false);
      } catch (e) {
        console.error(e);
        setIngredients([]);
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
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
            {ingredients.map((ingredient, index) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataBase;
