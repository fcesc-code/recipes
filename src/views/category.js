import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';

function neatList(category){
  const result = SERVICE.getRecipesByCategory(category).map(recipe => ({ 
    'title': recipe.name, 
    'img': recipe.imageURL,
    'url': recipe.originalURL,
    'id': recipe.id
  }));
  return result;
}
const itemTemplate = `<li><img src="{{img}}"><a href="/recipe/:{{id}}" data-navigo>{{title}}</a></li>`;

function categoryComponent(category){
  renderComponent(`
    <ul class="recipies" id="recipies_by_category_${category}">
      {{%%list%%}}
    </ul>
  `)({
    parent: '#content',
    styles: null,
    data: {
      list: {
        list: neatList(category),
        itemTemplate
      }
    }
  });
}

export default categoryComponent;