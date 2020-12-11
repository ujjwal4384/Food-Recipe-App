import React,{useEffect,useState} from "react";
import logo from './logo.svg';
import './App.css';
import Recipie from './recipe';
import Recipe from "./recipe";

const App=()=>{
  const APP_ID="46886c85";
 const APP_KEY="543a2dbee6382642415694b0814a34b6";

 
    const[recipes,setRecipes] =useState([]);
    const[search,setSearch]   =useState("");
    const[query,setQuery]   =useState('chicken');
 
    useEffect(()=>{
        getRecipes();
            
    },[query]);

    const getRecipes=async()=>{
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );  
        const data =await response.json();
        console.log(data.hits);
        setRecipes(data.hits);
    
      }
      
      const updatesearch=e=>{
        setSearch(e.target.value);
       }

       const getSearch=e=>{
        e.preventDefault(); 
        setQuery(search);
        setSearch("");
       }




  return(
    <div className="App">
        <form className="search-form" onSubmit={getSearch}>
          <input className="search-bar" type="text"  value={search} onChange={updatesearch}/>
          <button className="search-button" type="submit">Search
          </button>
        </form>
        
        <div className="recipes">         
          {recipes.map(recipe=>(
           <Recipe
          key={recipe.recipe.label} 
           title={recipe.recipe.label} 
           calories={recipe.recipe.calories} 
           image={recipe.recipe.image}
           ingredients={recipe.recipe.ingredients}
           />
         ))}
         </div>

    </div>
  );
};

export default App;
