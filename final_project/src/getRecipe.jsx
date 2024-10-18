
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



function getRecipe({}) {
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
          setRecipe(json.record)
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
  return (
 <> </>
 )
}

export default getRecipe;