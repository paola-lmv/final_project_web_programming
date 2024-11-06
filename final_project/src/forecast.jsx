import React, { useState, useEffect } from 'react';
import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import { BinIdRecipe } from './acessCode'
import { getData } from './dataFunction';

function Forecast({ isAuthenticated }) {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredient = async () => {
      const allIngredients = await getData(BinIdRecipe); // Appel à la fonction importée
      setIngredients(allIngredients.recipes.flatMap(recipe =>
        recipe.ingredients.map(ing => ({
          ...ing,
          minPurchaseQty: '', // Quantité minimale d'achat initialisée vide
          purchaseQty: '', // Quantité d'achat initialisée vide
          price: '' // Prix initialisé vide
        }))
      ));
      setLoading(false);
    };
    fetchIngredient(ingredients);
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
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Quantité</th>
                <th>Unité</th>
                <th>Quantité minimale d'achat</th>
                <th>Quantité d'achat</th>
                <th>Prix ($)</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td>{ingredient.type}</td>
                  <td>
                    <input
                      type="text"
                      value={ingredient.quantity}
                      onChange={(e) => handleChange(index, 'quantity', e.target.value)}
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
                      value={ingredient.minPurchaseQty}
                      onChange={(e) => handleChange(index, 'minPurchaseQty', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={ingredient.purchaseQty}
                      onChange={(e) => handleChange(index, 'purchaseQty', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={ingredient.price}
                      onChange={(e) => handleChange(index, 'price', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Forecast;
