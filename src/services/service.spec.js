import SERVICE from './service';
import DATA from '../mockdata/recipiesList';

describe('Test suite for recipe service', () => {

  it('should return a list of all recipes with getALl() method', () => {
    const expected = [ ...DATA ];

    const current = SERVICE.getAll();

    expect(current).toEqual(expected);
  })

  it('should return a list of all recipes from a given category with getRecipiesByCategory() method', () => {
    const category = 'roasts';
    const expected = [ ...DATA.filter( recipe => recipe.category === category ) ];

    const current = SERVICE.getRecipesByCategory(category);

    expect(current).toEqual(expected);
  })

  it('should return a list of all recipes from a given country with getRecipiesByCountry() method', () => {
    const country = 'France';
    const expected = [ ...DATA.filter( recipe => recipe.country === country ) ];

    const current = SERVICE.getRecipesByCountry(country);

    expect(current).toEqual(expected);
  })

  it('should return a recipe from a given id with getRecipieById() method', () => {
    const id = '03';
    const expected = [ ...DATA.filter( recipe => recipe.id === id ) ];

    const current = SERVICE.getRecipeById(id);

    expect(current).toEqual(expected);
  })

  it('should return a list of categories with getCategories() method', () => {
    const list = new Set();
    DATA.forEach( element => list.add(element.category) );
    const expected = [ ...list ];

    const current = SERVICE.getCategories();

    expect(current).toEqual(expected);
  })

  it('should return a list of countries with getCountries() method', () => {
    const list = new Set();
    DATA.forEach( element => list.add(element.country) );
    const expected = [ ...list ];

    const current = SERVICE.getCountries();

    expect(current).toEqual(expected);
  })

  it('should return the number of recipies in the service with getNumberOfRecipes() method', () => {
    const expected = DATA.length;

    const current = SERVICE.getNumberOfRecipes();

    expect(current).toEqual(expected);
  })

  it('should return a list of sources from the service with getSources() method', () => {
    const list = new Set();
    DATA.filter( recipe => recipe.source !== '' ).forEach( element => list.add({ id: element.id, source: element.source }) );
    const expected = [ ...list ];

    const current = SERVICE.getSources();

    expect(current).toEqual(expected);
  })

  it('should return a list of cooks of the recipes in the service with getCooks() method', () => {
    const list = new Set();
    DATA.filter( recipe => recipe.cook !== '' ).forEach( element => list.add(element.cook) );
    const expected = [ ...list ].map( cook => ({ cook }) );

    const current = SERVICE.getCooks();

    expect(current).toEqual(expected);
  })

})