import Navigo from 'navigo';

import headerComponent from './views/header';
import footerComponent from './views/footer';
import listComponent from './views/list';
import aboutComponent from './views/about';
import filtersComponent from './views/filters';
import surpriseComponent from './views/surprise';
import categoryComponent from './views/category';
import countryComponent from './views/country';
import recipeComponent from './views/recipe';
import notFoundComponent from './views/notFound';

const router = new Navigo('/');

router.on('/', listComponent);
router.on('/about', aboutComponent );
router.on('/filters', filtersComponent);
router.on('/surprise', surpriseComponent);
router.on('/categories/:category', categoryComponent() );
router.on('/countries/:country', countryComponent() );
router.on('/recipe/:id', recipeComponent() );

// router.on({
//   '/': listComponent,
//   '/about': aboutComponent,
//   '/filters': filtersComponent,
//   '/surprise': surpriseComponent,
//   '/categories/:category': (data) => {
//     console.warn('here data', data);
//     return categoryComponent(data)
//   },
//   '/countries/:country': (data) => countryComponent(data),
//   '/recipe/:id': (data) => recipeComponent(data)
// }).resolve();

router.notFound( notFoundComponent );

router.resolve();

function init(){
  headerComponent();
  footerComponent();
  listComponent();
}

init();