import renderComponent from '../core/renderComponent';
import APPURLS from '../routes/appUrls';
import SERVICE from '../services/service';

const categories = SERVICE.getCategories();
const categoriesList = categories.map( item => ({ 'category': item, 'url': `/${item.replace(/\s/g,'_')}` }) );
const categoryTemplate = `<li><a href="{{url}}">{{category}}</a></li>`;

const urlList = APPURLS.filter( url => url.display === true ).map( route => ({ 'title': route.title, 'url': route.path, 'body': route.body }) );
const navTemplate = `<li><a href="{{url}}" data-link>{{title}}</a></li>`;

function headerComponent(){
  renderComponent(`
    <h1 class="mainTitle">RECEPTES</h1>
    <p>{{emblem}}</p>
    <nav><ul class="navMenu">{{%%navMenu%%}}</ul></nav>
    <ul class="categoriesMenu">{{%%categories%%}}</ul>
  `)({
    parent: 'header',
    styles: '',
    data: {
      emblem: 'Quick, romantic, healthy or delicious cooking? Find recipies for all your needs.',
      categories: {
        list: categoriesList,
        itemTemplate: categoryTemplate
      },
      navMenu: {
        list: urlList,
        itemTemplate: navTemplate
      }
    }
  });
}

export default headerComponent;