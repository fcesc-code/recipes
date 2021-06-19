import renderComponent from '../core/renderComponent';
import APPURLS from '../routes/ROUTES';

const urlList = APPURLS.filter( url => url.display === true ).map( route => ({ 'title': route.title.toUpperCase(), 'url': route.path, 'body': route.body }) );
const navTemplate = `<li><a href="{{url}}" data-navigo>{{title}}</a></li>`;
// eslint-disable-next-line
import images from './../../assets/img/*.webp';

function headerComponent(){
  renderComponent(`
    <div class="standard__flexrow--header" id="nav-top">
      <img src="{{themeImg}}" class="img__theme" srcset="{{themeImg_micro}} 60w" sizes="auto" loading="lazy" alt="">
      <h1 class="mainTitle">RECIPES</h1>
      <p class="mainSubtitle">{{emblem}}</p>
    </div>
    <nav>
      <ul class="navMenu">{{%%navMenu%%}}</ul>
    </nav>
  `)({
    parent: 'header',
    styles: '',
    data: {
      // eslint-disable-next-line
      themeImg: images[`theme_xsmall`],
      // eslint-disable-next-line
      themeImg_micro: images[`theme_micro`],
      emblem: 'Quick, romantic, healthy or delicious cooking? Find recipies for all your needs.',
      navMenu: {
        list: urlList,
        itemTemplate: navTemplate
      }
    }
  });
}

export default headerComponent;