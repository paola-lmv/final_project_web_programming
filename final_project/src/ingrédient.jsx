import {  Button } from "react-bootstrap";

function Ingredient({isAuthenticated,quantity,measure,type,deleteIngredient}) {
  return (
    <>
        <p>{type} : {quantity}  {measure}</p>
        {isAuthenticated ? (<Button onClick={deleteIngredient}>Delete</Button>):(<></>)}
    </>
  );
}

export default Ingredient;