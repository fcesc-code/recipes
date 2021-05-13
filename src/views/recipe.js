import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';

function getRecipe(id){
  const result = SERVICE.getRecipeById(id)[0];
  console.warn('results from service', result);
  return result;
}

function recipeComponent(id){
  renderComponent(`
    <ul class="recipe" id="{{recipe.id}}">
      <img src={{recipe.imageUrl}}>
      <p>name: {{recipe.name}}</p>
      <p>category: {{recipe.category}}</p>
      <p>country: {{recipe.country}}</p>
      <p>steps: {{recipe.steps}}</p>
      <p>ingredients: {{recipe.ingredients}}</p>
    </ul>
  `)({
    parent: '#content',
    styles: null,
    data: {
      recipe: getRecipe(id)
    }
  });
}

export default recipeComponent;