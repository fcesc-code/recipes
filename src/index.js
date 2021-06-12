import Navigo from 'navigo';

import headerComponent from './views/headerComponent';
import footerComponent from './views/footerComponent';
import listComponent from './views/listComponent';
import aboutComponent from './views/aboutComponent';
import filtersComponent from './views/filtersComponent';
import surpriseComponent from './views/surpriseComponent';
import categoryComponent from './views/categoryComponent';
import countryComponent from './views/countryComponent';
import recipeComponent from './views/recipeComponent';
import notFoundComponent from './views/notFoundComponent';

function init(){
  headerComponent();
  footerComponent();
  listComponent();
}

init();

const router = new Navigo('/');

router.on({
  '/about': () => aboutComponent(),
  '/filters': () => filtersComponent(),
  '/': () => listComponent()
});

router.on('/surprise', () => surpriseComponent(), {
  already() {
    surpriseComponent();
  }
});

router.on('/categories/:category', ({data}) => categoryComponent(data.category.replace(':','')), {
  already({data}) {
    categoryComponent(data.category.replace(':',''));
  }
});

router.on('/countries/:country', ({data}) => countryComponent(data.country.replace(':','')), {
  already({data}) {
    surpriseComponent(data.country.replace(':',''));
  }
});

router.on('/recipe/:id', ({data}) => recipeComponent(data.id.replace(':','')), {
  already({data}) {
    surpriseComponent(data.id.replace(':',''));
  }
});

// this configuration is for Netlify
router.on('/404', () => notFoundComponent(), {
  already() {
    notFoundComponent();
  }
});

// this configuration is for local dev environment and does not work in netlify
router.notFound( () => notFoundComponent(), {
  already() {
    notFoundComponent();
  }
});

router.resolve();

