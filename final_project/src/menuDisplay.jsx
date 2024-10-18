import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';
import getRecipe from './getRecipe';
import Recipe from './recipe';
import React, { useState, useEffect } from "react";
import { Container, Spinner, Row, Col, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function MenuDisplay({isAuthenticated}) {
   
    
    return (<>

    {isAuthenticated ? (<NavbarLoged/>):(<NavbarUnLoged/>)}
    <p>MenuDisplay</p>
    <getRecipe/>
    <Row>
        {console.log(recipes)}
            {recipes.length == 0 ? (<div>Noposts</div>) : (recipes.map((recipe, index) => (
              <Col sm={12} md={6} lg={4}>
              <Recipe
                key={"p" + index + "_" + recipe.title}
                title={recipe.title}
                ingredients={recipe.ingredients}
                description={recipe.description}
                imageUrl={recipe.imageUrl}
                deleteRecipe={() => deleteRecipe(index)} 
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