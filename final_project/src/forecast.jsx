import React, { useState, useEffect } from 'react'; 
import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import { BinIdIngredient, BinIdRecipe } from './acessCode';
import { getData,SyncIngredients, calculateIngredientPrice, calculateMinPurchaseQty, saveIngredient2 } from './dataFunction';

function Forecast({ isAuthenticated }) {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      const allRecipe = await getData(BinIdRecipe); // Appel à la fonction importée
      setRecipes(allRecipe.recipes);
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

  SyncIngredients(recipes, ingredients, loading, loadingData, BinIdIngredient, setIngredients, setShow); 
  
  const recalculateIngredientData = () => {
    ingredients.forEach((ingredient) =>{
      let a =  0;
      ingredient.listRecipe.forEach((item)=>{
        const matchingRecipe = recipes.find(
          recIng => recIng.title ==item
        );
        const command = parseFloat(matchingRecipe.command);
        const matchingingredient = matchingRecipe.ingredients.find(
          l => l.type ==ingredient.type);
        const quantity = parseFloat(matchingingredient.quantity);
        const portion = parseFloat(matchingRecipe.portions);
        a+=calculateMinPurchaseQty(command, quantity, portion) 
      })
      ingredient.minPurchaseQty =parseFloat(a.toFixed(2));
      ingredient.ingredientPrice=parseFloat(calculateIngredientPrice(ingredient.unitPrice,ingredient.purchaseQty,ingredient.priceQty).toFixed(2)) ?? "undefine"
    })
    saveIngredient2(ingredients,BinIdIngredient,setIngredients, setShow )
  };

  // Calcul initial après chargement des données
  useEffect(() => {
    console.log("useEffect",!loading && !loadingData)
    if (!loading && !loadingData) {
      recalculateIngredientData();
    }
  }, [loading, loadingData]);
  

  // Fonction pour sauvegarder et relancer les calculs manuellement
  const handleSaveAndRecalculate = () => {
    recalculateIngredientData();
    };
  const handleChange = (index, field, value) => {
    const updatedIngredient = [...ingredients]; // Clone the output array
    updatedIngredient[index][field] = value;
    setIngredients(updatedIngredient);
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
                <th>Quantité minimale d'achat</th>
                <th>Quantité d'achat</th>
                <th>Unité</th>
                <th>Prix ($)</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td>{ingredient.type}</td>
                  <td>
                    {ingredient.minPurchaseQty}
                  </td>
                  <td>
                    <input
                      type="number"
                      value={ingredient.purchaseQty}
                      onChange={(e) => handleChange(index,'purchaseQty', e.target.value)}
                    />
                  </td>
                  <td>
                    {ingredient.measure}
                  </td>
                  <td>
                      {ingredient.ingredientPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleSaveAndRecalculate} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>
            Sauvegarder et Recalculer
          </button>
        </div>
      )}
    </>
  );
}

export default Forecast;
