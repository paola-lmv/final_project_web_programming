import {useEffect } from "react"

// Function to add a new post to the state
export const add = (save, newInfo, odlInfo) => {
    save([newInfo,...odlInfo])
    };


export const getData = async (set,setLoading,lengthRecipe,ingredients) => {
    try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/67114e74acd3cb34a898b1ed/latest`, {
        method: 'GET',
        headers: {'X-Access-Key': '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  }
     });
    const json = await res.json();
    const respond=json.record.recipes[lengthRecipe].ingredients
    set(respond)
    setLoading(false);
    } catch(e) {
        console.error(e);
        set([])
        setLoading(false);
    }
};

const saveIngredient = async (ingredients) => {
    try{
      const res = await fetch(`https://api.jsonbin.io/v3/b/67114e74acd3cb34a898b1ed`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key':  '$2a$10$jZgwyAZTBDnrFGvDVyUjduR1Vsg5A6G7JS59xOsxwCPEPTh3VClui'  // Use Access Key
        },
        body: JSON.stringify({ ingredients: ingredients })
      });
      if (res.ok) {
        setIngredient(ingredients)// Add new post to the array of posts
      }
    } catch(e) {
      console.error(e);
      setShow(true);
    }
    }

