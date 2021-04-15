import MOCKDATA from '../mockdata/recipiesList';

function service(){
  const DATA = MOCKDATA;

  function getAll(){
    return DATA;
  }

  function getRecipeById( id ){
    return DATA.filter( element => element.id === id );
  }

  function getRecipyByCategory( category ){
    return DATA.filter( element => element.category === category );
  }

  function getRecipeByCountry( country ){
    return DATA.filter( element => element.country === country );
  }

  function getCategories(){
    const list = new Set();
    DATA.forEach( element => list.add(element.category) );
    return [ ...list ];
  }

  function getCountry(){
    const list = new Set();
    DATA.forEach( element => list.add(element.country) );
    return [ ...list ];
  }

  return { getAll, getRecipeById, getRecipyByCategory, getRecipeByCountry, getCategories, getCountry }
}

const SERVICE = service();

export default SERVICE;