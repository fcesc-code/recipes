import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';

function neatList(country){
  const result = SERVICE.getRecipesByCountry(country).map(recipe => ({ 
    'title': recipe.name, 
    'img': recipe.imageURL,
    'url': recipe.originalURL,
    'id': recipe.id
  }));
  return result;
}
const itemTemplate = `<li><img src="{{img}}"><a href="recipe/:{{id}}">{{title}}</a></li>`;

function categoryComponent(query){
  renderComponent(`
    <ul class="recipies" id="recipies_by_category_${query.country}">
      {{%%list%%}}
    </ul>
  `)({
    parent: '#content',
    styles: null,
    data: {
      list: {
        list: neatList(query.country),
        itemTemplate
      }
    }
  });
}

export default categoryComponent;