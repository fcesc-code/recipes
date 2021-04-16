import listComponent from '../views/list';
import aboutComponent from '../views/about';
import surpriseComponent from '../views/surprise';

const ROUTES = [
  { title: 'home', path: '/', display: false, body: listComponent, page: '' },
  { title: 'recipies\' mosaic', path: '/', display: true, body: listComponent, page: '' },
  { title: 'categories', path: '/categories/', display: true, body: listComponent, page: '' },
  { title: 'surprise me!', path: '/recipies/', display: true, body: surpriseComponent, page: '' },
  { title: 'about & credits', path: '/about/', display: true, body: aboutComponent, page: '' }
];

export default ROUTES;