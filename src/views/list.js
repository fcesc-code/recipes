import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';
// eslint-disable-next-line
import images from './../../assets/img/*.jpg';

const DATA = SERVICE.getAll();

const neatList = DATA.map(recipe => ({ 
  'title': recipe.name, 
  'img': images[`${recipe.id}_1`],
  'url': recipe.source,
  'id': recipe.id
  })
);
const itemTemplate = `
  <li>
    <img src="{{img}}">
    <a href="recipe/:{{id}}" data-navigo>{{title}}</a>
  </li>
`;

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