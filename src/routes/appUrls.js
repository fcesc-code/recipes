import listComponent from '../views/list';
import categoryComponent from '../views/category';
import countryComponent from '../views/country';
import filtersComponent from '../views/filters';
import aboutComponent from '../views/about';
import surpriseComponent from '../views/surprise';

const ROUTES = [
  { title: 'recipes', path: '/', display: true, view: listComponent },
  { title: 'filters', path: '/filters', display: true, view: filtersComponent },
  { title: 'category', path: '/categories/:category', display: false, view: categoryComponent },
  { title: 'country', path: '/countries/:country', display: false, view: countryComponent },
  { title: 'surprise me!', path: '/recipies', display: true, view: surpriseComponent },
  { title: 'about & credits', path: '/about', display: true, view: aboutComponent }
];

export default ROUTES;