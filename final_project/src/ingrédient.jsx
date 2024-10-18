import {  Button } from "react-bootstrap";

function Ingredient({quantity,measure,type,deleteIngredient}) {
  return (
    <>
        <p>quantity={quantity},measure={measure},type={type}</p>
        <Button onClick={deleteIngredient}>Delete</Button> {/* Add delete button */}
    </>
  );
}

export default Ingredient;