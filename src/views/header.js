import renderComponent from '../core/renderer';
import MOCKDATA from '../mockdata/recipiesList';
import APPURLS from '../routes/appUrls';

const rawList = MOCKDATA.map( recipe => recipe.category );
const eliminateDuplicates = [ ...new Set(rawList) ];
const categoriesList = eliminateDuplicates.map( item => { return { 'category': item } })
const categoryTemplate = `<li>{{category}}</li>`;

const urlList = APPURLS;
const navTemplate = `<li><a href="{{url}}">{{title}}</a></li>`;

function headerComponent(){
  renderComponent(`
    <h1 class="mainTitle">RECEPTES</h1>
    <p>{{emblem}}</p>
    <nav><ul class="navMenu">{{%%navMenu%%}}</ul></nav>
    <ul class="categoriesMenu">{{%%categories%%}}</ul>
  `)({
    parent: 'header',
    styles: null,
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