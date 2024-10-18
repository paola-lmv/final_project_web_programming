
import React from "react";
import { Card, CardBody, CardHeader, CardImg, Button } from "react-bootstrap";


function Recipe({ title, ingredients, description, imageUrl, deleteRecipe }) {
  return (
    <Card >
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <CardImg src={imageUrl} alt={title} />
        <p>{ingredients}</p>
        <p>{description}</p>
        <Button onClick={deleteRecipe}>Delete</Button> {/* Add delete button */}
      </CardBody>
      
    </Card>
  );
}

export default Recipe;