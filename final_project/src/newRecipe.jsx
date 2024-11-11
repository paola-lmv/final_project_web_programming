import NewIngredient from './newIngredient';
import React, { useState } from "react";
import { FormControl, FormLabel, Card, Button, Form, CardBody, CardHeader} from "react-bootstrap";
import { BinIdRecipe } from './acessCode'
import { getData } from './dataFunction';


function NewRecipe({ addRecipe, lengthRecipe }) {
// State with initial recipe
const [title, setTitle] = useState("");
const [ingredients, setIngredient] = useState([]);
const [portion, setPortion] = useState([]);
const [description, setDescription] = useState("");
const [imageUrl, setImageUrl] = useState("");
const [loading, setLoading] = useState(true);
const [show, setShow] = useState(false);

const deleteIngredient = (indexToDelete) => {
  const updatedIngredient = ingredients.filter((_, index) => index !== indexToDelete);
  setIngredient(updatedIngredient)
};
// Fonction pour ajouter de nouveaux ingrédients à l'état
const handleIngredients = (ingredients) => {
  setIngredient((prev) => [...prev, ...ingredients]);
};
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh on form submit
    
    // Create a new post object
    const newRecipe = {
      title,
      ingredients,
      portion,
      description,
      imageUrl
    };
    
    // Add the new post to the App state
    addRecipe(newRecipe);
    

    // Clear the input fields after submission
    setTitle("");
    setIngredient([]);
    setDescription("");
    setPortion("");
    setImageUrl("");
  };

  return (
    <Card className="new-recipe mt-3">
      <CardHeader>Create a New Recipe</CardHeader>
      <CardBody>
      <Form onSubmit={handleSubmit} className="mb-2">
        <div>
          <FormLabel htmlFor="title">Title:</FormLabel>
          <FormControl
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
        <NewIngredient  handleIngredients={handleIngredients} ingredients={ingredients} deleteIngredient={deleteIngredient}/>
        </div>
        <div>
          <FormLabel htmlFor="portion">portion:</FormLabel>
          <FormControl
            id="portion"
            value={portion}
            onChange={(e) => setPortion(e.target.value)}
            required
          />
        </div>
        <div>
          <FormLabel htmlFor="description">description:</FormLabel>
          <FormControl
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <FormLabel htmlFor="imageUrl">Img:</FormLabel>
          <FormControl
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <Button type="submit">Create</Button>
        </div>
       
      </Form> </CardBody>
    </Card>
  );
}


export default NewRecipe;