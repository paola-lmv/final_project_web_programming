import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import Recipe from './recipe';

import React, { useState, useEffect } from "react";
import { Container, Spinner, Row, Col, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function MenuDisplay({isAuthenticated}) {
    const [recipes , setRecipe] = useState([]);  
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const saveRecipes = async (recipes) => {
        try{
          const res = await fetch(`https://api.jsonbin.io/v3/b/67114e74acd3cb34a898b1ed`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-Access-Key':  '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  // Use Access Key
            },
            body: JSON.stringify({ recipes: recipes })
          });
          if (res.ok) {
            setRecipe(recipes)// Add new post to the array of posts
          }
        } catch(e) {
          console.error(e);
          setShow(true);
        }
      }
     // Function to delete a post by index
  const deleteRecipe = (indexToDelete) => {
    const updatedRecipes = posts.filter((recipe, index) => index !== indexToDelete);
    saveRecipes(updatedRecipes)
  };
    return (<>
    {isAuthenticated ? (<NavbarLoged/>):(<NavbarUnLoged/>)}
    <p>MenuDisplay</p>
    <Row>
            {recipes.length == 0 ? <div>{t("Noposts")}</div> : recipes.map((recipe, index) => (
              <Col sm={12} md={6} lg={4}>
              <Recipe
                key={"p" + index + "_" + recipe.title}
                title={recipe.title}
                ingredients={recipe.ingredients}
                description={recipe.description}
                imageUrl={recipe.imageUrl}
                deleteRecipe={() => deleteRecipe(index)} 
              /></Col>
            ))}
            <Alert variant="danger" onClose={() => setShow(false)} dismissible show={show}>
              <Alert.Heading>{t("Error")}</Alert.Heading>
              <p>
              {t("NotSaved")}
              </p>
            </Alert>
        </Row>
    </>
    )
};

export default MenuDisplay;