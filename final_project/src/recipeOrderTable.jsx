import React, { useState, useEffect } from 'react';
import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import { BinIdRecipe } from './acessCode'
import { getData } from './dataFunction';


function RecipeOrderTable({ isAuthenticated }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      const allRecipe = await getData(BinIdRecipe); // Appel à la fonction importée
      setRecipes(allRecipe.recipes.map(recipe => ({ ...recipe, price: '', command: '' })));
      setLoading(false);
    };
    fetchRecipe(recipes);
  }, []);


  const handleChange = (index, field, value) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[index][field] = value;
    setRecipes(updatedRecipes);
  };

  return (
    <>
      {isAuthenticated ? <NavbarLoged /> : <NavbarUnLoged />}
      <h2>Recipe Order Table</h2>
      <div style={{ overflowX: 'auto' }}>
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Command</th>
              <th>Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={index}>
                <td>{recipe.title}</td>
                <td>
                  <input
                    type="text"
                    value={recipe.command}
                    onChange={(e) => handleChange(index, 'command', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={recipe.price}
                    onChange={(e) => handleChange(index, 'price', e.target.value)}
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

export default RecipeOrderTable;
