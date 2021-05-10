import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';

function neatList(category){
  const result = SERVICE.getRecipesByCategory(category).map(recipy => ({ 
    'title': recipy.name, 
    'img': recipy.imageURL,
    'url': recipy.originalURL
  }));
  console.warn('HERE LIST', result);
  return result;
}
const itemTemplate = `<li><img src="{{img}}"><a href="{{url}}">{{title}}</a></li>`;

function categoriesList(){
  const categories = SERVICE.getCategories();
  return categories.map( item => ({ 'category': item, 'url': `/categories/:${item.replace(/\s/g,'_').toLowerCase()}` }) );
} 
const categoryTemplate = `<li><a href="{{url}}">{{category}}</a></li>`;

function categoryComponent(query){
  renderComponent(`
    <nav id="nav_secondary">
      <ul class="categories">
        {{%%categories%%}}
      </ul>
    </nav>
    <ul class="recipies" id="recipies_by_category_${query.category}">
      {{%%list%%}}
    </ul>
  `)({
    parent: '#content',
    styles: null,
    data: {
      list: {
        list: neatList(query.category),
        itemTemplate
      },
      categories: {
        list: categoriesList(),
        itemTemplate: categoryTemplate
      }
    }
  });
}

export default categoryComponent;