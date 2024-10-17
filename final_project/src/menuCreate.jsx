import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import Recipe from './recipe';
import NewRecipe from './newRecipe';
import React, { useState, useEffect } from "react";
import { Container, Spinner, Row, Col, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function MenuCreate({isAuthenticated}) {
    // State with initial recipe
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

 

    return (<>
    
    {isAuthenticated ? (<NavbarLoged/>):(<NavbarUnLoged/>)}
    <p>menu create</p>
      <Container>
        {loading ? 
        <Spinner animation="grow" size="xl" />:<>
          <Row className="mb-3">
            <Col>
              <NewRecipe addRecipe={addNewRecipe} />
            </Col>
          </Row>
          </>}
      </Container>
    </>);

};

export default MenuCreate;