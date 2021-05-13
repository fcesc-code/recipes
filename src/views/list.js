import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';

const DATA = SERVICE.getAll();

const neatList = DATA.map(recipe => ({ 
  'title': recipe.name, 
  'img': recipe.imageURL,
  'url': recipe.originalURL,
  'id': recipe.id
  })
);
const itemTemplate = `<li><img src="{{img}}"><a href="recipe/:{{id}}">{{title}}</a></li>`;

function listComponent(){
  renderComponent(`
    <ul class="recipies">
      {{%%list%%}}
    </ul>
  `)({
    parent: '#content',
    styles: null,
    data: {
      list: {
        list: neatList,
        itemTemplate
      }
    }
  });
}

export default listComponent;