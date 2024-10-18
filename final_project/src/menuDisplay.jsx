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

    const getData = async () => {
        try {
          const res = await fetch(`https://api.jsonbin.io/v3/b/67114e74acd3cb34a898b1ed/latest`, {
            method: 'GET',
            headers: {'X-Access-Key': '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  }
          });
      
          const json = await res.json();
          setRecipe(json.record.recipes)
          setLoading(false);
        } catch(e) {
          console.error(e);
          setRecipe([])
          setLoading(false);
        }
      }
      useEffect(()=> {getData()}, []);

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
      // Function to add a new post to the state
  const addNewRecipe = (newRecipe) => {
    saveRecipes([newRecipe,...recipes])
  };
     // Function to delete a post by index
  const deleteRecipe = (indexToDelete) => {
    const updatedRecipes = recipes.filter((recipe, index) => index !== indexToDelete);
    saveRecipes(updatedRecipes)
  };
  const lengthRecipe=recipes.length;
    return (<>
    {isAuthenticated ? (<NavbarLoged/>):(<NavbarUnLoged/>)}
    <p>MenuDisplay</p>
    <Row>
        {console.log(recipes)}
            {recipes.length == 0 ? (<div>Noposts</div>) : (recipes.map((recipe, index) => (
              <Col sm={12} md={6} lg={4}>
              <Recipe
                key={"p" + index + "_" + recipe.title}
                title={recipe.title}
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