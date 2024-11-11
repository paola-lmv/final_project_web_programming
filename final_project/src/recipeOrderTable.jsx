import React, { useState, useEffect } from 'react';
import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import { BinIdRecipe,BinIdIngredient } from './acessCode'
import { getData, saveRecipe,calculateMinPurchaseQty, handleChange,saveIngredient2,calculateIngredientPrice } from './dataFunction';


function RecipeOrderTable({ isAuthenticated }) {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  
  useEffect(() => {
    const fetchRecipe = async () => {
      const allRecipe = await getData(BinIdRecipe); // Appel à la fonction importée
      setRecipes(allRecipe.recipes)
      console.log(recipes)
      setLoadingData(false);
    };
    fetchRecipe(recipes);
    const fetchIngredient = async () => {
      const allIngredients = await getData(BinIdIngredient); // Appel à la fonction importée
      setIngredients(allIngredients.ingredients);
      setLoading(false);
    };
    fetchIngredient(ingredients);
  }, []);

  const calculateIngredientData = () => {
    recipes.forEach(recipe => {
      recipe.price = 0;
    })
    ingredients.forEach((ingredient) =>{
      ingredient.listRecipe.forEach((item)=>{
        const matchingRecipe = recipes.find(
          recIng => recIng.title ==item
        );
        console.log("matchingRecipe",matchingRecipe)
        const i=ingredient.ingredientPrice;
        console.log("ingredient",ingredient)
        const j = matchingRecipe.ingredients.find(
          ing => ing.type == ingredient.type
        );
        console.log("i",calculateIngredientPrice(ingredient.unitPrice,calculateMinPurchaseQty(matchingRecipe.command,j.quantity,matchingRecipe.portions),ingredient.priceQty).toFixed(2));
        if (i !== "" && matchingRecipe) {
          matchingRecipe.price += parseFloat(calculateIngredientPrice(ingredient.unitPrice,calculateMinPurchaseQty(matchingRecipe.command,j.quantity,matchingRecipe.portions),ingredient.priceQty).toFixed(2));
        } 
        console.log("matchingRecipe.price",matchingRecipe.price)      
     });
    })
    saveRecipe(recipes,BinIdRecipe,setRecipes, setShow )
  }
  useEffect(() => {
    if (!loading && !loadingData){
      calculateIngredientData()
  }
}, [loading,loadingData])

const handleChangeAndRecalculate = (index, command, value,recipes,saveRecipe,BinIdRecipe, setRecipes, setShow) => {
  handleChange(index, command,value,recipes,saveRecipe,BinIdRecipe, setRecipes, setShow)
  calculateIngredientData();
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
                    type="number"
                    value={recipe.command}
                    onChange={(e) =>handleChangeAndRecalculate(index, 'command', e.target.value,recipes,saveRecipe,BinIdRecipe, setRecipes, setShow) }
                  />
                </td>
                <td>
                  {recipe.price}
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
