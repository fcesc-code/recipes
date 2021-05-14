import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';
// eslint-disable-next-line
import images from './../../assets/img/*.jpg';

function getRecipe(id){
  const [ result ] = SERVICE.getRecipeById(id);
  return result;
}

const stepsTemplate = `<li>{{step}}</li>`;
const ingredientsTemplate = `<li>{{quantity}} {{name}}</li>`;

function recipeComponent(id){
  const RECIPE = getRecipe(id);
  const newUrl = images[`${id}_1`];
  renderComponent(`
    <li class="recipe" id="{{id}}">
      <img class="img__detail" src={{imageUrl}}>
      <h2 class="recipe__title">{{name}}</h2>
      <div class="standard__flexrow">
        <h4>{{category}}</h4>
        <p class="text__secondary">{{time}} min </p>
        <p>{{origin}}</p>
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
      imageUrl: newUrl,
      name: RECIPE.name.toUpperCase(),
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

export default recipeComponent;