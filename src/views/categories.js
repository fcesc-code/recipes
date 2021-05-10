import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';

function categoriesList(){
  const categories = SERVICE.getCategories();
  return categories.map( item => ({ 'category': item, 'url': `/categories:${item.replace(/\s/g,'_').toLowerCase()}` }) );
} 
const categoryTemplate = `<li><a href="{{url}}">{{category}}</a></li>`;

function categoriesComponent(){
  renderComponent(`
    <nav id="nav_secondary">
      <ul class="categories">
        {{%%list%%}}
      </ul>
    </nav>
    <section id="detailContent">
      <p>Some silly test</p>
    </section>
  `)({
    parent: '#content',
    styles: null,
    data: {
      list: {
        list: categoriesList(),
        categoryTemplate
      }
    }
  });
}

export default categoriesComponent;