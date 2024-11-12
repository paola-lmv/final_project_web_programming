import React, { useState } from "react";
import Ingredient from './ingrédient';
import ListGroup from 'react-bootstrap/ListGroup';
import { FormControl, FormLabel, Card, Button, CardBody, CardHeader } from "react-bootstrap";
import {useTranslation} from  "react-i18next";

function NewIngredient({ handleIngredients, ingredients, deleteIngredient }) {
  // State for managing the ingredient's quantity, measure, and type
  const [quantity, setQuantity] = useState(""); 
  const [measure, setMeasure] = useState("");  
  const [type, setType] = useState("");    
  const { t, i18n } = useTranslation();    

  // Handle the form submission, creating a new ingredient object and passing it to the parent
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    // Create a new ingredient object
    const newIngredient = {
      quantity,
      measure,
      type
    };

    // Pass the new ingredient object to the parent component's handler function
    handleIngredients([newIngredient]);

    // Clear the input fields after submitting
    setQuantity("");
    setMeasure("");
    setType("");
  };

  return (
    <>
      <Card className="new-ingredient mt-3">
        <CardHeader>{t("Add a new ingredient")}</CardHeader>
        <CardBody>
          <ListGroup>
            {/* Display the list of ingredients */}
            {ingredients.map((ingredient, index) => (
              <ListGroup.Item key={"i" + index + "_" + ingredient.type}>
                <Ingredient
                  quantity={ingredient.quantity}
                  measure={ingredient.measure}
                  type={ingredient.type}
                  deleteIngredient={deleteIngredient} // Pass the delete function to each ingredient
                />
              </ListGroup.Item>
            ))}
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
            <Button type="button" onClick={handleSubmit}>{t("Add")}</Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default NewIngredient;
