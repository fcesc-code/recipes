import renderComponent from '../core/renderer';
import MOCKDATA from '../mockdata/recipiesList';

const rawList = MOCKDATA.map( recipe => recipe.category );
const eliminateDuplicates = [ ...new Set(rawList) ];
const neatList = eliminateDuplicates.map( item => { return { 'category': item } })
const itemTemplate = `<li>{{category}}</li>`;

function headerComponent(){
  renderComponent(`
    <h1>RECEPTES</h1>
    <nav><ul class="navMenu">{{%%categories%%}}</ul></nav>
    <p>{{someContent}} {{andMore}}</p>
  `)({
    parent: 'header',
    styles: null,
    data: {
      someContent: 'This is fun!',
      andMore: 'A lot of fun.',
      categories: {
        list: neatList,
        itemTemplate
      }
    }
  });
}

export default headerComponent;