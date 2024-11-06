import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import React, { useState, useEffect } from 'react';
import { BinIdRecipe } from './acessCode'
import { getData } from './dataFunction';

function RecipeManagement({isAuthenticated}) {
    const [recipes , setRecipe] = useState([]);  
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newIngredient, setNewIngredient] = useState({ quantity: '', measure: '', type: '' });
    const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);
    const [newDescription, setNewDescription] = useState('');
    const [newImage, setNewImage] = useState('');

    useEffect(() => {
      const fetchRecipe = async () => {
        const allRecipe = await getData(BinIdRecipe); // Appel à la fonction importée
        setRecipe(allRecipe.recipes);
        setLoading(false);
      };
      fetchRecipe(recipes);
    }, []);
  
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
    
      const handleAddIngredient = (recipeIndex) => {
        setSelectedRecipeIndex(recipeIndex);
        setShowModal(true);
      };
      const handleSaveNewIngredient = () => {
        if (selectedRecipeIndex !== null) {
          const updatedRecipes = [...recipes];
          updatedRecipes[selectedRecipeIndex].ingredients.push(newIngredient);
          setRecipe(updatedRecipes);
          saveInscription(updatedRecipes);
          setShowModal(false);
          setNewIngredient({ quantity: '', measure: '', type: '' });
        }
      };
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

      // Fonction pour gérer la modification des ingrédients
      const handleIngredientChange = (recipeIndex, ingredientIndex, field, value) => {
        const updatedRecipes = [...recipes];
        updatedRecipes[recipeIndex].ingredients[ingredientIndex][field] = value;
        setRecipe(updatedRecipes);
        saveInscription(updatedRecipes);
      };

    // Fonction pour supprimer un ingrédient
    const handleIngredientDelete = (recipeIndex, ingredientIndex) => {
      const updatedRecipes = [...recipes];
      updatedRecipes[recipeIndex].ingredients = updatedRecipes[recipeIndex].ingredients.filter((_, i) => i !== ingredientIndex);
      setRecipe(updatedRecipes);
      saveInscription(updatedRecipes);
    };
      // Function to handle opening the edit modal
  const handleEditRecipe = (index) => {
    setSelectedRecipeIndex(index);
    setNewDescription(recipes[index].description || '');
    setNewImage(null); // Reset image for new selection
    setShowEditModal(true);
  };

  // Function to save changes to the recipe description and image
  const handleSaveEditRecipe = () => {
    if (selectedRecipeIndex !== null) {
      const updatedRecipes = [...recipes];
      updatedRecipes[selectedRecipeIndex].description = newDescription;
      if (newImage) {
        updatedRecipes[selectedRecipeIndex].image = URL.createObjectURL(newImage); // Set image as URL object
      }
      setRecipe(updatedRecipes);
      saveInscription(updatedRecipes);
      setShowEditModal(false);
      setNewDescription('');
      setNewImage(null);
    }
  };

    return ( <>
      {isAuthenticated ? <NavbarLoged /> : <NavbarUnLoged />}
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
              <strong>Quantity:</strong>
              <input
                type="number"
                value={recipe.quantity}
                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
              />
            </div>
            {/* Button to edit description and image */}
            <button
              onClick={() => handleEditRecipe(index)}
              style={{ marginTop: '10px', backgroundColor: 'blue', color: 'white' }}
            >
              Edit Description & Image
            </button>
            <div style={{ overflowX: 'auto', marginTop: '10px' }}>
              <strong>Ingredients:</strong>
              <table border="1" style={{ width: '100%', minWidth: '600px' }}>
                <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>Measure</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recipe.ingredients.map((ingredient, ingIndex) => (
                    <tr key={ingIndex}>
                      <td>
                        <input
                          type="number"
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
                      <td>
                        <button
                          onClick={() => handleIngredientDelete(index, ingIndex)}
                          style={{ backgroundColor: 'red', color: 'white' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => handleAddIngredient(index)}
                style={{ marginTop: '10px', backgroundColor: 'green', color: 'white' }}
              >
                Add Ingredient
              </button>
            </div>
            <button onClick={() => handleDelete(index)} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
              Delete Recipe
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
          <h3>Edit Recipe Description & Image</h3>
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
              onClick={handleSaveEditRecipe}
              style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
            >
              Save Changes
            </button>
            <button
              onClick={() => setShowEditModal(false)}
              style={{ backgroundColor: 'gray', color: 'white' }}
            >
              Cancel
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
    <h3>New Ingredient</h3>
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
      <button onClick={handleSaveNewIngredient} style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}>
        Save
      </button>
      <button onClick={() => setShowModal(false)} style={{ backgroundColor: 'gray', color: 'white' }}>
        Cancel
      </button>
    </div>
  </div>
)}
{showModal && <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }} />}

    </>
  );
}


export default RecipeManagement;