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
      <p>name: {{name}}</p>
      <p>category: {{category}}</p>
      <p>time: {{time}}</p>
      <p>country: {{country}}</p>
      <p>steps:</p>
      <ul>{{%%steps%%}}</ul>
      <p>ingredients:</p>
      <ul>{{%%ingredients%%}}</ul>
    </li>
  `)({
    parent: '#content',
    styles: null,
    data: {
      id: RECIPE.id,
      imageUrl: newUrl,
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

export default recipeComponent;