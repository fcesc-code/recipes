import renderComponent from '../core/renderComponent';
import APPURLS from '../routes/appUrls';

const urlList = APPURLS.filter( url => url.display === true ).map( route => ({ 'title': route.title, 'url': route.path, 'body': route.body }) );
const navTemplate = `<li><a href="{{url}}" data-navigo>{{title}}</a></li>`;

function headerComponent(){
  renderComponent(`
    <h1 class="mainTitle">RECEPTES</h1>
    <p>{{emblem}}</p>
    <nav><ul class="navMenu">{{%%navMenu%%}}</ul></nav>
  `)({
    parent: 'header',
    styles: '',
    data: {
      emblem: 'Quick, romantic, healthy or delicious cooking? Find recipies for all your needs.',
      navMenu: {
        list: urlList,
        itemTemplate: navTemplate
      }
    }
  });
}

export default headerComponent;