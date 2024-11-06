import { ACCESS_KEY } from './acessCode'
const BinIdRecipe = '67114e74acd3cb34a898b1ed'

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

  export const saveIngredient = async (data, BinId, set, setShow) => {
    try{
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BinId}`, {
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
    