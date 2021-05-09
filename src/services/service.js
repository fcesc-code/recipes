import MOCKDATA from '../mockdata/recipiesList';

function service(){
  const DATA = MOCKDATA;

  function getAll(){
    return DATA;
  }

  function getRecipeById( id ){
    return DATA.filter( element => element.id === id );
  }

  function getRecipesByCategory( category ){
    return DATA.filter( element => element.category === category );
  }

  function getRecipesByCountry( country ){
    return DATA.filter( element => element.country === country );
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

  return { getAll, getRecipeById, getRecipesByCategory, getRecipesByCountry, getCategories, getCountries }
}

const SERVICE = service();

export default SERVICE;