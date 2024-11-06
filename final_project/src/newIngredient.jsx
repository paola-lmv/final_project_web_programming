import React, { useState } from "react";
import Ingredient from './ingrédient';
import ListGroup from 'react-bootstrap/ListGroup';
import { FormControl, FormLabel, Card, Button, CardBody, CardHeader} from "react-bootstrap";


function NewIngredient({ handleIngredients, ingredients, deleteIngredient }) {
  const [quantity, setQuantity] = useState("");
  const [measure, setMeasure] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh on form submit
    // Create a new post object
    const newIngredient = {
        quantity,
        measure,
        type
    };
   // Appeler la fonction de rappel pour transmettre les nouveaux ingrédients à NewRecipe
   handleIngredients([newIngredient]);

    // Clear the input fields after submission
    setQuantity("");
    setMeasure("");
    setType("");
  };


  return (
    <>
    <Card className="new-ingredient mt-3">
      <CardHeader>Add a New Ingredient</CardHeader>
      <CardBody>
      <ListGroup>
          {(ingredients.map((ingredient,index)=>(
            <ListGroup.Item><Ingredient quantity={ingredient.quantity} measure={ingredient.measure} type={ingredient.type} deleteIngredient={deleteIngredient}/></ListGroup.Item>
          )))}
        </ListGroup>
        <div>
          <FormLabel htmlFor="quantity">Quantity:</FormLabel>
          <FormControl
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <FormLabel htmlFor="measure">Measure:</FormLabel>
          <FormControl
            id="measure"
            value={measure}
            onChange={(e) => setMeasure(e.target.value)}
          />
        </div>
        <div>
          <FormLabel htmlFor="type">Type:</FormLabel>
          <FormControl
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <Button type="button" onClick={handleSubmit}>Add Ingredient</Button>
        </div>
       
      
      </CardBody>
    </Card>
    </>
  );
}

export default NewIngredient;