import { ACCESS_KEY } from './acessCode'
import { useEffect } from 'react';

export function calculateMinPurchaseQty (command,quantity,portion){
  return (command*quantity)/portion
}
export function calculateIngredientPrice (price,minPurchaseQty,quantity){
  return (price*minPurchaseQty)/quantity
}

export const handleChange = (index, field, value, data, save, BinId, set,setShow ) => {
  const updated = [...data]; // Clone the output array
  updated[index][field] = value;
  save(updated, BinId, set, setShow)
};

export const getData = async (BinId) => {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BinId}/latest`, {
        method: 'GET',
        headers: { 'X-Access-Key': ACCESS_KEY }
      });

      const json = await res.json();
      return json.record
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  export const saveRecipe = async (data, BinId, set, setShow) => {
    try{
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BinId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key':  ACCESS_KEY  // Use Access Key
        },
        body: JSON.stringify({ recipes : data })
      });
      if (res.ok) {
        set(data)// Add new post to the array of posts
      }
    } catch(e) {
      console.error(e);
      setShow(true);
    }
  }

  export const saveIngredient2 = async (data, BinId, set, setShow) => {
    try{
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BinId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key':   ACCESS_KEY
        },
        body: JSON.stringify({ingredients : data})
      });
      if (res.ok) {
        set(data)// Add new post to the array of posts
      }
    } catch(e) {
      console.error(e);
      setShow(true);
    }
  }

  export const saveIngredient = async (data, BinId, set, setShow) => {
    try{
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BinId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key':  ACCESS_KEY  // Use Access Key
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        set(data)// Add new post to the array of posts
      }
    } catch(e) {
      console.error(e);
      setShow(true);
    }
    }

    export const saveInscription = async (data,BinId,set, setShow) => {
      try{
        const res = await fetch(`https://api.jsonbin.io/v3/b/${BinId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key':  ACCESS_KEYi
          },
          body: JSON.stringify({ inscriptions: data })
        });
        if (res.ok) {
          set(data)// Add new post to the array of posts
        }
      } catch(e) {
        console.error(e);
        setShow(true);
      }
    }
  
export const SyncIngredients = (data, ingredients, loading, loadingData, BinIdIngredient, setIngredient, setShow) => {
 
  useEffect(() => {
    if (!loading && !loadingData) {
      console.log("SyncIngredients")
      const newIngredient = [];
      data.forEach(recipe => {
        if (recipe.ingredients) {
          recipe.ingredients.forEach(ingredient => {
            const exists = ingredients.some(ing => ing.type === ingredient.type);
            const exists2 = newIngredient.some(ing => ing.type === ingredient.type);
            if (!exists && !exists2) {
              newIngredient.push({
                type: ingredient.type,
                priceQty: "",
                supplier: "",
                unitPrice: "",
                minPurchaseQty: "",
                purchaseQty: "",
                ingredientPrice: "",
                webLink: "",
                measure: ingredient.measure,
                listRecipe: [recipe.title]
              });
            } else if (!exists && exists2) {
              const i = newIngredient.find(j => j.type === ingredient.type);
              if (!i.listRecipe.includes(recipe.title)) {
                i.listRecipe.push(recipe.title);
              }
            } else if (exists && !exists2) {
              const i = ingredients.find(j => j.type === ingredient.type);
              if (!i.listRecipe.includes(recipe.title)) {
                i.listRecipe.push(recipe.title);
              }
            }
          });
        }
      });

      const filteredIngredients = ingredients.filter(ing =>
        data.some(recipe =>
          recipe.ingredients.some(recIng => recIng.type === ing.type)
        )
      );

      const info = [...newIngredient, ...filteredIngredients];
      saveIngredient2(info, BinIdIngredient, setIngredient, setShow);
    }
  }, [loading, loadingData]);
};


