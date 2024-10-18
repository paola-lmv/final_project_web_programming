
import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, Card, Button, Form, CardBody, CardHeader} from "react-bootstrap";


function NewIngredient({ addIngredient }) {
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

    // Add the new post to the App state
    addIngredient(newIngredient);

    // Clear the input fields after submission
    setQuantity("");
    setMeasure("");
    setType("");
  };

  return (
    <Card className="new-ingredient mt-3">
      <CardHeader>Add a New Ingredient</CardHeader>
      <CardBody>
      <Form onSubmit={handleSubmit} className="mb-2">
        <div>
          <FormLabel htmlFor="quantity">Quantity:</FormLabel>
          <FormControl
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <FormLabel htmlFor="measure">Measure:</FormLabel>
          <FormControl
            id="measure"
            value={measure}
            onChange={(e) => setMeasure(e.target.value)}
            required
          />
        </div>
        <div>
          <FormLabel htmlFor="type">Type:</FormLabel>
          <FormControl
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="mt-3">
          <Button type="submit">Create</Button>
        </div>
       
      </Form> 
      </CardBody>
    </Card>
  );
}

export default NewIngredient;