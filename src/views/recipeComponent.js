import renderComponent from '../core/renderComponent';
import SERVICE from '../services/RECIPES_SERVICE';
// eslint-disable-next-line
import images from './../../assets/img/*.webp';

function getRecipe(id){
  const [ result ] = SERVICE.getRecipeById(id);
  return result;
}

const stepsTemplate = `<li>{{step}}</li>`;
const ingredientsTemplate = `<li>{{quantity}} {{name}}</li>`;

function recipeComponent(id){
  const RECIPE = getRecipe(id);
  const newUrl = images[`${id}_1_small`];
  const microUrl = images[`${id}_1_micro`];

  renderComponent(`
    <li class="recipe" id="{{id}}">
      <img class="img__detail" src="{{imageUrl}}" loading="lazy" sizes="auto" srcset="{{imageMicro}} 240w" alt="{{name}}">
      <h1 class="recipe__title">{{name}}</h1>
      <div class="standard__flexrow">
        <h4><a class="inherit" href="{{categoryUrl}}" data-navigo>{{category}}</a></h4>
        <p class="text__secondary">{{time}} min </p>
        <p><a class="inherit" href="{{originUrl}}" data-navigo>{{origin}}</a></p>
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
      imageMicro: microUrl,
      name: RECIPE.name.toUpperCase(),
      category: RECIPE.category,
      categoryUrl: `categories/${RECIPE.category.replace(/\s/g,'_').toLowerCase()}`,
      origin: RECIPE.country,
      originUrl: `countries/${RECIPE.country.replace(/\s/g,'_').toLowerCase()}`,
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