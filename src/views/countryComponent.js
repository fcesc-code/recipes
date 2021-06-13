import renderComponent from '../core/renderComponent';
import SERVICE from '../services/RECIPES_SERVICE';
// eslint-disable-next-line
import images from './../../assets/img/*.webp';

function neatList(country){
  const result = SERVICE.getRecipesByCountry(country).map(recipe => ({ 
    'title': recipe.name, 
    'img': images[`${recipe.id}_1_small`],
    'url': recipe.source,
    'id': recipe.id
  }));
  return result;
}
const itemTemplate = `<li><img src="{{img}}" loading="lazy" alt="{{title}}"><a href="/recipe/{{id}}" data-navigo>{{title}}</a></li>`;

function countryComponent(country){
  renderComponent(`
    <ul class="recipies" id="recipies_by_category_${country}">
      {{%%list%%}}
    </ul>
  `)({
    parent: '#content',
    styles: null,
    data: {
      list: {
        list: neatList(country),
        itemTemplate
      }
    }
  });
}

export default countryComponent;