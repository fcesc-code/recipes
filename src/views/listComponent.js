import renderComponent from '../core/renderComponent';
import SERVICE from '../services/RECIPES_SERVICE';
/* eslint-disable */
import images from './../../assets/img/*.jpg';
import svgs from './../../assets/svg/*.svg';
/* eslint-enable */

const DATA = SERVICE.getAll();

const neatList = DATA.map(recipe => ({ 
  'title': recipe.name,
  'category': recipe.category,
  'categoryUrl': `categories/${recipe.category.replace(/\s/g,'_').toLowerCase()}`,
  'country': recipe.country,
  'countryUrl': `countries/${recipe.country.replace(/\s/g,'_').toLowerCase()}`,
  'time': recipe.time,
  'img': images[`${recipe.id}_1`],
  'url': recipe.source,
  'id': recipe.id,
  'timerIcon': svgs.timer
  })
);
const itemTemplate = `
  <li>
    <div class="standard__flexcolumn  mosaic__item">
      <img src="{{img}}" loading="lazy" alt="{{title}}">
      <div class="mosaic__card">
        <div class="standard__flexrow">
          <h4><a class="inherit" href="{{categoryUrl}}" data-navigo>{{category}}</a></h4>
          <p><a class="inherit" href="{{countryUrl}}" data-navigo>{{country}}</a></p>
        <div>
        <div class="standard__flexrow">
          <p class="text__secondary">{{time}} min.<p>
        </div>
        <div class="standard__flexrow hcenter">
          <a href="recipe/{{id}}" data-navigo>{{title}}</a>
        </div>
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