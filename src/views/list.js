import renderComponent from '../core/renderer';
import rawdata from '../mockdata/recipiesList.json';

const MOCKDATA = JSON.parse(rawdata);

const neatList = MOCKDATA.map(recipy => { return { 
  'title': recipy.name, 
  'img': recipy.imageURL,
  'url': recipy.originalURL
  }
});
const itemTemplate = `<li><a href="{{img}}">{{title}}</a></li>`;

function listComponent(){
  renderComponent(`
    <ul>
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