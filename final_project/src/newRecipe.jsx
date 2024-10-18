import NewIngredient from './newIngredient';
import Ingredient from './ingrédient';
import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, Card, Button, Form, CardBody, CardHeader} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';


function NewRecipe({ addRecipe, lengthRecipe }) {
// State with initial recipe
const [title, setTitle] = useState("");
const [ingredients, setIngredient] = useState([]);
const [description, setDescription] = useState("");
const [imageUrl, setImageUrl] = useState("");
const [loading, setLoading] = useState(true);
const [show, setShow] = useState(false);
const [newIngredients, setNewIngredients] = useState([]);

const getData = async () => {
try {
  const res = await fetch(`https://api.jsonbin.io/v3/b/67114e74acd3cb34a898b1ed/latest`, {
    method: 'GET',
    headers: {'X-Access-Key': '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  }
  });

  const json = await res.json();
  setIngredient(json.record.recipes[lengthRecipe].ingredients)
  setLoading(false);
} catch(e) {
  console.error(e);
  setIngredient([])
  setLoading(false);
}
}
useEffect(()=> {getData()}, []);

const saveIngredient = async (ingredients) => {
try{
  const res = await fetch(`https://api.jsonbin.io/v3/b/67114e74acd3cb34a898b1ed`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key':  '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  // Use Access Key
    },
    body: JSON.stringify({ ingredients: ingredients })
  });
  if (res.ok) {
    setIngredient(ingredients)// Add new post to the array of posts
  }
} catch(e) {
  console.error(e);
  setShow(true);
}
}
// Function to add a new post to the state
const addNewIngredient = (newIngredient) => {
saveIngredient([newIngredient,...ingredients])
};
// Function to delete a post by index
const deleteIngredient = (indexToDelete) => {
  const updatedIngredient = ingredients.filter((ingredient, index) => index !== indexToDelete);
  saveIngredient(updatedIngredient)
};
const deleteNewIngredient = (indexToDelete) => {
  const updatedNewIngredient = newIngredients.filter((_, index) => index !== indexToDelete);
  setNewIngredients(updatedNewIngredient)
};
// Fonction pour ajouter de nouveaux ingrédients à l'état
const handleAddNewIngredients = (ingredients) => {
  setNewIngredients((prev) => [...prev, ...ingredients]);
};
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh on form submit
    
    // Create a new post object
    const newRecipe = {
      title,
      NewIngredients,
      description,
      imageUrl
    };
    
    // Add the new post to the App state
    addRecipe(newRecipe);
    

    // Clear the input fields after submission
    setTitle("");
    setIngredient([]);
    setDescription("");
    setImageUrl("");
    setNewIngredients([])
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
        <NewIngredient  handleAddNewIngredients={handleAddNewIngredients} newIngredients={newIngredients} deleteNewIngredient={deleteNewIngredient}/>
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