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
})