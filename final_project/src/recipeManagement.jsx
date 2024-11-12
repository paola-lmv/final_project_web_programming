import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import React, { useState, useEffect } from 'react';
import { BinIdRecipe } from './acessCode';
import { getData, saveRecipe } from './dataFunction';
import { useTranslation } from "react-i18next";

function RecipeManagement({ isAuthenticated }) {
  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newIngredient, setNewIngredient] = useState({ quantity: '', measure: '', type: '' });
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');
  const { t, i18n } = useTranslation();

  // Fetches recipes when the component mounts
  useEffect(() => {
    const fetchRecipe = async () => {
        const allRecipe = await getData(BinIdRecipe); // Call the imported function to get data
        setRecipe(allRecipe.recipes);
        setLoading(false);
    };
    fetchRecipe(recipes);
  }, []);

  // Opens the modal for adding an ingredient
  const addIngredient = (recipeIndex) => {
      setSelectedRecipeIndex(recipeIndex);
      setShowModal(true);
  };

  // Saves a new ingredient to the selected recipe
  const saveIngredientAdded = () => {
      if (selectedRecipeIndex !== null) {
          const updatedRecipes = [...recipes];
          updatedRecipes[selectedRecipeIndex].ingredients.push(newIngredient);
          saveRecipe(updatedRecipes, BinIdRecipe, setRecipe, setShowModal); // Call function to save data
          setShowModal(false);
          setNewIngredient({ quantity: '', measure: '', type: '' }); // Reset ingredient state
      }
  };

  // Handles changes in recipe properties (e.g., title, portions)
  const handleChange = (index, field, value) => {
      const updatedRecipes = [...recipes];
      updatedRecipes[index][field] = value;
      saveRecipe(updatedRecipes, BinIdRecipe, setRecipe, setShowModal); // Save the changes
  };

  // Deletes a recipe from the list
  const handleDelete = (index) => {
      const updatedRecipe = recipes.filter((_, i) => i !== index);
      saveRecipe(updatedRecipe, BinIdRecipe, setRecipe, setShowModal); // Save the updated list
  };

  // Handles changes to individual ingredients in a recipe
  const handleIngredient = (recipeIndex, ingredientIndex, field, value) => {
      const updatedRecipes = [...recipes];
      updatedRecipes[recipeIndex].ingredients[ingredientIndex][field] = value;
      saveRecipe(updatedRecipes, BinIdRecipe, setRecipe, setShowModal); // Save the updated recipe
  };

  // Deletes an ingredient from a recipe
  const deleteIngredient = (recipeIndex, ingredientIndex) => {
      const updatedRecipes = [...recipes];
      updatedRecipes[recipeIndex].ingredients = updatedRecipes[recipeIndex].ingredients.filter((_, i) => i !== ingredientIndex);
      saveRecipe(updatedRecipes, BinIdRecipe, setRecipe, setShowModal); // Save after deletion
  };

  // Opens the edit modal for a specific recipe
  const editRecipie = (index) => {
      setSelectedRecipeIndex(index);
      setNewDescription(recipes[index].description || ''); // Populate with current description
      setNewImage(null);
      setShowEditModal(true);
  };

  // Saves changes made to the recipe in the edit modal
  const saveEdit = () => {
      if (selectedRecipeIndex !== null) {
          const updatedRecipes = [...recipes];
          updatedRecipes[selectedRecipeIndex].description = newDescription;
          if (newImage) {
              updatedRecipes[selectedRecipeIndex].image = URL.createObjectURL(newImage); // Set new image if provided
          }
          saveRecipe(updatedRecipes, BinIdRecipe, setRecipe, setShowModal); // Save updated recipe
          setShowEditModal(false);
          setNewDescription(''); // Reset the description field
          setNewImage(null); // Reset the image field
      }
  };

  return (
    <>
      {isAuthenticated ? <NavbarLoged /> : <NavbarUnLoged />}
  
      <div>
          <h2>Tableau Interactif des Recettes</h2>
          {recipes.map((recipe, index) => (
            <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
              <div>
                <strong>{t("Title")}:</strong>
                <input
                  type="text"
                  value={recipe.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                />
              </div>
              <div>
                <strong>{t("Portion")}:</strong>
                <input
                  type="number"
                  value={recipe.portions}
                  onChange={(e) => handleChange(index, 'portions', e.target.value)}
                />
              </div>
              <button
                onClick={() => editRecipie(index)}
                style={{ marginTop: '10px', backgroundColor: 'blue', color: 'white' }}
              >
                {t("Edit Description & Image")}
              </button>
              <div style={{ overflowX: 'auto', marginTop: '10px' }}>
                <strong>Ingredients:</strong>
                <table border="1" style={{ width: '100%', minWidth: '600px' }}>
                  <thead>
                    <tr>
                      <th>{t("Quantity")}</th>
                      <th>{t("Measure")}</th>
                      <th>{t("Name")}</th>
                      <th>{t("Actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipe.ingredients.map((ingredient, ingIndex) => (
                      <tr key={ingIndex}>
                        <td>
                          <input
                            type="number"
                            value={ingredient.quantity}
                            onChange={(e) => handleIngredient(index, ingIndex, 'quantity', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={ingredient.measure}
                            onChange={(e) => handleIngredient(index, ingIndex, 'measure', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                          type="text"
                          value={ingredient.type}
                          onChange={(e) => handleIngredient(index, ingIndex, 'type', e.target.value)}
                          />
                        </td>
                        <td>
                          <button
                             onClick={() => deleteIngredient(index, ingIndex)}
                            style={{ backgroundColor: 'red', color: 'white' }}
                          >
                            {t("Delete")}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={() => addIngredient(index)}
                  style={{ marginTop: '10px', backgroundColor: 'green', color: 'white' }}
                >
                  {t("Add Ingredient")}
              </button>
            </div>
            <button onClick={() => handleDelete(index)} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
              {t("Delete Recipe")}
            </button>
            </div>
          ))}
        </div>
        {/* Edit Recipe Modal */}
        {showEditModal && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '20px',
              border: '1px solid #ccc',
              zIndex: 1000,
            }}
          >
            <h3>{t("Edit Recipe Description & Image")}</h3>
            <div>
              <textarea
                placeholder="New Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                style={{ marginBottom: '10px', display: 'block', width: '100%', height: '100px' }}
              />
              <input
                type="text"
                placeholder="image"
                onChange={(e) => setNewImage(e.target.files[0])}
                style={{ marginBottom: '10px', display: 'block' }}
              />
              <button
                onClick={saveEdit}
                style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
              >
                {t("Save Changes")}
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                style={{ backgroundColor: 'gray', color: 'white' }}
              >
                {t("Cancel")}
              </button>
            </div>
          </div>
        )}
        {showEditModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 999,
            }}
          />
        )}
        {showModal && (
          <div
           style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '20px',
              border: '1px solid #ccc',
              zIndex: 1000
            }}
          >
          <h3>{t("New Ingredient")}</h3>
          <div>
            <input
              type="text"
              placeholder="Quantity"
              value={newIngredient.quantity}
              onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
              style={{ marginBottom: '10px', display: 'block' }}
            />
            <input
              type="text"
              placeholder="Measure"
              value={newIngredient.measure}
              onChange={(e) => setNewIngredient({ ...newIngredient, measure: e.target.value })}
              style={{ marginBottom: '10px', display: 'block' }}
            />
            <input
              type="text"
              placeholder="Type"
              value={newIngredient.type}
              onChange={(e) => setNewIngredient({ ...newIngredient, type: e.target.value })}
              style={{ marginBottom: '10px', display: 'block' }}
            />
            <button
              onClick={saveIngredientAdded}
              style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
            >
              {t("Save")}
            </button>
            <button
              onClick={() => setShowModal(false)}
              style={{ backgroundColor: 'gray', color: 'white' }}
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
        )}
        {showModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 999,
            }}
          />
        )}
  </>
  );
}

export default RecipeManagement;
