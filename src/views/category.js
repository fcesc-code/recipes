import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';

function neatList(category){
  const result = SERVICE.getRecipesByCategory(category).map(recipy => ({ 
    'title': recipy.name, 
    'img': recipy.imageURL,
    'url': recipy.originalURL
  }));
  console.warn('HERE LIST', result);
  return result;
}
const itemTemplate = `<li><img src="{{img}}"><a href="{{url}}">{{title}}</a></li>`;

function categoryComponent(category){
  renderComponent(`
    <ul class="recipies" id="recipies_by_category_${category}">
      {{%%list%%}}
    </ul>
  `)({
    parent: '#detailContent',
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