import Ingredient from './ingrédient';
import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardImg, Button } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';

function Recipe({ title, description, imageUrl, deleteRecipe }) {
  // State with initial recipe
const [ingredients, setIngredient] = useState([]);
const [loading, setLoading] = useState(true);
const [show, setShow] = useState(false);

const getData = async () => {
try {
  const res = await fetch(`https://api.jsonbin.io/v3/b/67114e74acd3cb34a898b1ed/latest`, {
    method: 'GET',
    headers: {'X-Access-Key': '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  }
  });

  const json = await res.json();
  setIngredient(json.record.recipes[0].ingredients)
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
  return (
    <Card >
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <CardImg src={imageUrl} alt={title} />
        <ListGroup>
          {(ingredients.map((ingredient,index)=>(
            <ListGroup.Item><Ingredient quantity={ingredient.quantity} measure={ingredient.measure} type={ingredient.type} deleteIngredient={deleteIngredient}/></ListGroup.Item>
          )))}
        </ListGroup>
        <p>{description}</p>
        <Button onClick={deleteRecipe}>Delete</Button> {/* Add delete button */}
      </CardBody>
    </Card>
  );
}

export default Recipe;