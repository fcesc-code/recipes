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

function init(){
  headerComponent();
  footerComponent();
  listComponent();
}

init();

const router = new Navigo('/');

router.notFound( notFoundComponent );

router.on({
  '/': () => listComponent(),
  '/about': () => aboutComponent(),
  '/filters': () => filtersComponent(),
  '/surprise': () => surpriseComponent(),
  '/categories/:category': ({data}) => categoryComponent(data.category.replace(':','')),
  '/countries/:country': ({data}) => countryComponent(data.country.replace(':','')),
  '/recipe/:id': ({data}) => recipeComponent(data.id.replace(':',''))
});

router.resolve();

