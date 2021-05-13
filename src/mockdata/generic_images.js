import SERVICE from '../services/service';

const GENERIC_IMAGES = {
  categories: {},
  countries: {}
};

const CATEGORIES = SERVICE.getCategories();
CATEGORIES.forEach( category => {
  GENERIC_IMAGES.categories.category = `cat_${category}.jpg`;
});

const COUNTRIES = SERVICE.getCountries()
COUNTRIES.forEach( country => {
  GENERIC_IMAGES.countries.country = `ori_${country}.jpg`;
});

export default GENERIC_IMAGES;