import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';
// eslint-disable-next-line
import images from './../../assets/img/*.jpg';

function getRandomRecipe(){
  const range = SERVICE.getNumberOfRecipies();
  const randomNumberWithinRange = Math.round(Math.random() * range).toString();
  const prefix = '0';
  const stringifiedRange = range.toString();
  const dif = stringifiedRange.length - randomNumberWithinRange.length;
  const randomId = `${prefix.repeat(dif)}${randomNumberWithinRange}`;
  const [ result ] = SERVICE.getRecipeById(randomId);
  result.newUrl = images[`${randomId}_1`];
  return result;
}

const stepsTemplate = `<li>{{step}}</li>`;
const ingredientsTemplate = `<li>{{quantity}} {{name}}</li>`;

function surpriseComponent(){

  const RECIPE = getRandomRecipe();
  renderComponent(`
    <li class="recipe" id="{{id}}">
      <img class="img__detail" src={{imageUrl}} alt="{{name}}">
      <h2 class="recipe__title">{{name}}</h2>
      <div class="standard__flexrow">
        <h4><a class="inherit" href="categories/{{category}}" data-navigo>{{category}}</a></h4>
        <p class="text__secondary">{{time}} min </p>
        <p><a class="inherit" href="countries/{{origin}}" data-navigo>{{origin}}</a></p>
      </div>
      <div class="recipe__flexcontainer">
        <div class="flexcontainer__left">
          <p class="text__secondary">ingredients:</p>
          <ul>{{%%ingredients%%}}</ul>
        </div>
        <div class="flexcontainer__right">
          <p class="text__secondary">steps:</p>
          <ul>{{%%steps%%}}</ul>
        </div>
      </div>
    </li>
  `)({
    parent: '#content',
    styles: null,
    data: {
      id: RECIPE.id,
      imageUrl: RECIPE.newUrl,
      name: RECIPE.name,
      category: RECIPE.category,
      origin: RECIPE.country,
      time: RECIPE.time,
      steps: {
        list: RECIPE.steps.map( step => ({ step }) ),
        itemTemplate: stepsTemplate
      },
      ingredients: {
        list: RECIPE.ingredients,
        itemTemplate: ingredientsTemplate
      }
    }
  });
}

export default surpriseComponent;