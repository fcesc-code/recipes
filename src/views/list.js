import renderComponent from '../core/renderer';
import MOCKDATA from '../mockdata/recipiesList';

const neatList = MOCKDATA.map(recipy => { return { 
  'title': recipy.name, 
  'img': recipy.imageURL,
  'url': recipy.originalURL
  }
});
const itemTemplate = `<li><img src="{{img}}"><a href="{{url}}">{{title}}</a></li>`;

function listComponent(){
  renderComponent(`
    <ul class="recipies">
      {{%%list%%}}
    </ul>
  `)({
    parent: '#list',
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