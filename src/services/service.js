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

  return { getAll, getRecipeById, getRecipyByCategory, getRecipeByCountry }
}

const SERVICE = service();

export default SERVICE;