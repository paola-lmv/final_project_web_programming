import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import Recipe from './recipe';
import NewRecipe from './newRecipe';
import React, { useState, useEffect } from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BinIdRecipe } from './acessCode'
import { getData,saveRecipe } from './dataFunction';

function MenuCreate({isAuthenticated}) {
    // State with initial recipe
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

  // Function to add a new post to the state
  const addNewRecipe = (newRecipe) => {
    saveRecipe([newRecipe,...recipes], BinIdRecipe, setRecipe, setShow)
  };
  const lengthRecipe=recipes.length;
    return (<>
    
    {isAuthenticated ? (<NavbarLoged/>):(<NavbarUnLoged/>)}
    <p>menu create</p>
      <Container>
        {loading ? 
        <Spinner animation="grow" size="xl" />:<>
          <Row className="mb-3">
            <Col>
              <NewRecipe addRecipe={addNewRecipe} lengthRecipe={lengthRecipe} />
            </Col>
          </Row>
          </>}
      </Container>
    </>);

};

export default MenuCreate;