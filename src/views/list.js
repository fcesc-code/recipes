import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';

const DATA = SERVICE.getAll();

const neatList = DATA.map(recipy => ({ 
  'title': recipy.name, 
  'img': recipy.imageURL,
  'url': recipy.originalURL
  })
);
const itemTemplate = `<li><img src="{{img}}"><a href="{{url}}">{{title}}</a></li>`;

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