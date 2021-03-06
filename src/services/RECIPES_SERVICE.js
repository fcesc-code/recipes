import MOCKDATA from '../mockdata/recipiesList';

function service(){
  const DATA = MOCKDATA;

  function getAll(){
    return DATA;
  }

  function getNumberOfRecipes(){
    return DATA.length;
  }

  function getRecipeById( id ){
    return (!id) ? undefined : DATA.filter( element => element.id === id );
  }

  function getRecipesByCategory( category ){
    return (!category) ? undefined : DATA.filter( element => element.category.toLowerCase() === category.toLowerCase().replace('_',' ') );
  }

  function getRecipesByCountry( country ){
    return (!country) ? undefined : DATA.filter( element => element.country.toLowerCase() === country.toLowerCase().replace('_',' ') );
  }

  function getCategories(){
    const list = new Set();
    DATA.forEach( element => list.add(element.category) );
    return [ ...list ];
  }

  function getCountries(){
    const list = new Set();
    DATA.forEach( element => list.add(element.country) );
    return [ ...list ];
  }

  function getSources(){
    return DATA.map( recipe => ({ "id": recipe.id, "source": recipe.source }) );
  }

  function getCooks(){
    const list = new Set()
    DATA.filter( recipe => recipe.cook !== '' ).forEach( element => list.add(element.cook) );
    return [ ...list ].map( cook => ({ cook }) );
  }

  return { 
    getAll, 
    getRecipeById, 
    getRecipesByCategory, 
    getRecipesByCountry, 
    getCategories, 
    getCountries, 
    getSources, 
    getCooks, 
    getNumberOfRecipes 
  }
}

const RECIPES_SERVICE = service();

export default RECIPES_SERVICE;