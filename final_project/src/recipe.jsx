import Ingredient from './ingrédient';
import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardImg, Button } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { BinIdRecipe } from './acessCode'
import { getData,saveIngredient } from './dataFunction';

function Recipe({ isAuthenticated,title, portions, description, imageUrl, deleteRecipe, index }) {
  // State with initial recipe
const [ingredients, setIngredient] = useState([]);
const [loading, setLoading] = useState(true);
const [show, setShow] = useState(false);

useEffect(() => {
  const fetchIngredient = async () => {
    const allIngredient = await getData(BinIdRecipe); // Appel à la fonction importée
    setIngredient(allIngredient.recipes[index].ingredients);
    setLoading(false);
  };
  fetchIngredient(ingredients);
}, []);


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
            <ListGroup.Item><Ingredient isAuthenticated={isAuthenticated} quantity={ingredient.quantity} measure={ingredient.measure} type={ingredient.type} deleteIngredient={deleteIngredient}/></ListGroup.Item>
          )))}
        </ListGroup>
        <p>The recipe is for {portions} people.</p>
        <p> {description}</p>
        {isAuthenticated ? (<Button onClick={deleteRecipe}>Delete</Button>):(<></>)}
      </CardBody>
    </Card>
  );
}

export default Recipe;