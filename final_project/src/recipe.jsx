import Ingredient from './ingrédient';
import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardImg, Button } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { BinIdRecipe } from './acessCode'
import { getData,saveIngredient } from './dataFunction';

function Recipe({ title, quantity, description, imageUrl, deleteRecipe, index }) {
  // State with initial recipe
const [ingredients, setIngredient] = useState([]);
const [loading, setLoading] = useState(true);
const [show, setShow] = useState(false);
const [json, setJson] = useState(null);

useEffect(() => {
  const fetchIngredient = async () => {
    const allIngredient = await getData(BinIdRecipe); // Appel à la fonction importée
    setIngredient(allIngredient.recipes[index].ingredients);
    setLoading(false);
  };
  fetchIngredient(ingredients);
}, []);

const saveIngredient1 = async (ingredient) => {
try{
  json.record.recipes[index].ingredients=ingredient
  const res = await fetch(`https://api.jsonbin.io/v3/b/67114e74acd3cb34a898b1ed`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key':  '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  // Use Access Key
    },
    body: JSON.stringify(json.record)
  });
  if (res.ok) {
    setIngredient(ingredient)// Add new post to the array of posts
  }
} catch(e) {
  console.error(e);
  setShow(true);
}
}
// Function to delete a post by index
const deleteIngredient = (indexToDelete) => {
  const updatedIngredient = ingredients.filter((ingredient, index) => index !== indexToDelete);
  saveIngredient(updatedIngredient,BinIdRecipe,setIngredient,setShow)
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
        <p>the recipe is for {quantity} people {description}</p>
        <Button onClick={deleteRecipe}>Delete</Button> {/* Add delete button */}
      </CardBody>
    </Card>
  );
}

export default Recipe;