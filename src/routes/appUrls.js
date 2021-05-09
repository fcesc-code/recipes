import listComponent from '../views/list';
import aboutComponent from '../views/about';
import surpriseComponent from '../views/surprise';

const ROUTES = [
  { title: 'recipes', path: '/', display: true, view: listComponent },
  { title: 'categories', path: '/categories/', display: true, view: listComponent },
  { title: 'surprise me!', path: '/recipies/', display: true, view: surpriseComponent },
  { title: 'about & credits', path: '/about', display: true, view: aboutComponent }
];

export default ROUTES;