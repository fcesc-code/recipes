import listComponent from '../views/list';
import aboutComponent from '../views/about';
import surpriseComponent from '../views/surprise';

const ROUTES = [
  { title: 'home', path: '/', display: false, body: listComponent },
  { title: 'recipies\' mosaic', path: '/', display: true, body: listComponent },
  { title: 'categories', path: '/categories/', display: true, body: listComponent },
  { title: 'surprise me!', path: '/recipies/', display: true, body: surpriseComponent },
  { title: 'about & credits', path: '/about/', display: true, body: aboutComponent }
];

export default ROUTES;