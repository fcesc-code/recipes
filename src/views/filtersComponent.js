import renderComponent from '../core/renderComponent';
import SERVICE from '../services/RECIPES_SERVICE';
// eslint-disable-next-line
import images from './../../assets/img/*.webp';

function categoriesList(){
  const categories = SERVICE.getCategories();
  return categories.map( item => ({ 
    'category': item, 
    'url': `categories/${item.replace(/\s/g,'_').toLowerCase()}`,
    'img': images[`cat_${item.replace(' ','_').toLowerCase()}_small`],
    'img_micro': images[`cat_${item.replace(' ','_').toLowerCase()}_micro`]
  }) );
} 
const categoryTemplate = `
  <li class="list__item">
    <div class="img__container">
      <img class="img__small" loading="lazy" src="{{img}}" srcset="{{img_micro}}" sizes="auto" alt="{{category}} recipes">
    </div>
    <a href="{{url}}" data-navigo>{{category}}</a>
  </li>
`;

function countriesList(){
  const countries = SERVICE.getCountries();
  return countries.map( item => ({ 
    'country': item, 
    'url': `countries/${item.replace(/\s/g,'_').toLowerCase()}`,
    'img': images[`ori_${item.replace(' ','_').toLowerCase()}_small`],
    'img_micro': images[`ori_${item.replace(' ','_').toLowerCase()}_micro`]
  }) )
}
const countryTemplate = `
  <li class="list__item">
    <div class="img__container">
      <img class="img__small" loading="lazy" src="{{img}}" srcset="{{img_micro}}" sizes="auto" alt="Tasty food from {{country}}">  
    </div>
    <a href="{{url}}" data-navigo>{{country}}</a>
  </li>
`;

function filtersComponent(){
  renderComponent(`
    <section id="filters">
      <h1>Categories</h1>
      <ul class="categories recipies">
        {{%%listOfCategories%%}}
      </ul>
      <h1>Origin</h1>
      <ul class="categories recipies">
        {{%%listOfCountries%%}}
      </ul>
    </section>
  `)({
    parent: '#content',
    styles: null,
    data: {
      listOfCategories: {
        list: categoriesList(),
        itemTemplate: categoryTemplate
      },
      listOfCountries: {
        list: countriesList(),
        itemTemplate: countryTemplate
      }
    }
  });
}

export default filtersComponent;