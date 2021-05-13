import listComponent from '../views/list';
import categoryComponent from '../views/category';
import countryComponent from '../views/country';
import filtersComponent from '../views/filters';
import aboutComponent from '../views/about';
import surpriseComponent from '../views/surprise';
import recipeComponent from '../views/recipe';

const ROUTES = [
  { title: 'recipes', path: '/', display: true, view: listComponent },
  { title: 'filters', path: '/filters', display: true, view: filtersComponent },
  { title: 'category', path: '/categories/:category', display: false, view: categoryComponent },
  { title: 'country', path: '/countries/:country', display: false, view: countryComponent },
  { title: 'surprise me!', path: '/recipes', display: true, view: surpriseComponent },
  { title: 'recipe', path: '/recipe/:id', display: false, view: recipeComponent },
  { title: 'about & credits', path: '/about', display: true, view: aboutComponent }
];

export default ROUTES;