import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';

function neatList(category){
  const result = SERVICE.getRecipesByCategory(category).map(recipy => ({ 
    'title': recipy.name, 
    'img': recipy.imageURL,
    'url': recipy.originalURL
  }));
  return result;
}
const itemTemplate = `<li><img src="{{img}}"><a href="{{url}}">{{title}}</a></li>`;

function categoryComponent(query){
  renderComponent(`
    <ul class="recipies" id="recipies_by_category_${query.category}">
      {{%%list%%}}
    </ul>
  `)({
    parent: '#content',
    styles: null,
    data: {
      list: {
        list: neatList(query.category),
        itemTemplate
      }
    }
  });
}

export default categoryComponent;