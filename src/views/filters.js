import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';

function categoriesList(){
  const categories = SERVICE.getCategories();
  return categories.map( item => ({ 'category': item, 'url': `/categories/:${item.replace(/\s/g,'_').toLowerCase()}` }) );
} 
const categoryTemplate = `<li class="list__item"><a href="{{url}}">{{category}}</a></li>`;

function countriesList(){
  const countries = SERVICE.getCountries();
  return countries.map( item => ({ 'country': item, 'url': `/countries/:${item.replace(/\s/g,'_').toLowerCase()}` }) )
}
const countryTemplate = `<li class="list__item"><a href="{{url}}">{{country}}</a></li>`;

function filtersComponent(){
  renderComponent(`
    <section id="filters">
      <h3>Categories</h3>
      <ul class="categories">
        {{%%listOfCategories%%}}
      </ul>
      <h3>Countries</h3>
      <ul class="categories">
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