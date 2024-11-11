import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import Recipe from './recipe';
import React, { useState, useEffect } from "react";
import { Container, Spinner, Row, Col, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BinIdRecipe } from './acessCode'
import { getData,saveRecipe } from './dataFunction';

function MenuDisplay({isAuthenticated}) {
    const [recipes , setRecipe] = useState([]);  
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
      const fetchRecipe = async () => {
        const allRecipe = await getData(BinIdRecipe); // Appel à la fonction importée
        setRecipe(allRecipe.recipes);
        setLoading(false);
      };
      fetchRecipe(recipes);
    }, []);


     // Function to delete a post by index
  const deleteRecipe = (indexToDelete) => {
    const updatedRecipes = recipes.filter((recipe, index) => index !== indexToDelete);
    saveRecipe(updatedRecipes, BinIdRecipe, setRecipe, setShow)
  };
  const lengthRecipe=recipes.length;
    return (<>
    {isAuthenticated ? (<NavbarLoged/>):(<NavbarUnLoged/>)}
    <p>MenuDisplay</p>
    <Row>
            {lengthRecipe == 0 ? (<div>Noposts</div>) : (recipes.map((recipe, index) => (
              <Col sm={12} md={6} lg={4}>
              <Recipe
                key={"p" + index + "_" + recipe.title}
                isAuthenticated= {isAuthenticated}
                title={recipe.title}
                portions={recipe.portions}
                description={recipe.description}
                imageUrl={recipe.imageUrl}
                deleteRecipe={() => deleteRecipe(index)} 
                index={index}
              /></Col>
            )))}
            <Alert variant="danger" onClose={() => setShow(false)} dismissible show={show}>
              <Alert.Heading>Error</Alert.Heading>
              <p> NotSaved       </p>
            </Alert>
        </Row>
    </>
    )
};

export default MenuDisplay;