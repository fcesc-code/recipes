import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';
/* eslint-disable */
import images from './../../assets/img/*.jpg';
import svgs from './../../assets/svg/*.svg';
/* eslint-enable */

const DATA = SERVICE.getAll();

const neatList = DATA.map(recipe => ({ 
  'title': recipe.name,
  'category': recipe.category,
  'country': recipe.country,
  'time': recipe.time,
  'img': images[`${recipe.id}_1`],
  'url': recipe.source,
  'id': recipe.id,
  'timerIcon': svgs.timer
  })
);
const itemTemplate = `
  <li>
    <div class="standard__flexcolumn">
      <img src="{{img}}">
      <div >
        <div class="standard__flexrow">
          <h4>{{category}}</h4>
          <p>{{country}}</p>
        <div>
        <div class="standard__flexrow">
          <p>{{time}} min.<p>
        </div>
        <a href="recipe/:{{id}}" data-navigo>{{title}}</a>
      </div>
    </div>
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