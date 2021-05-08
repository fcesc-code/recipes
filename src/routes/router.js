import express from 'express';
import SERVICE from '../services/service';

function router(){
  const recipeRoutes = express.Router();

  recipeRoutes
    .route('/byCountry/:country')
    .get(SERVICE.getRecipeByCountry);

  recipeRoutes
    .route('/byCategory/:category')
    .get(SERVICE.getRecipyByCategory);

  recipeRoutes
    .route('/byId/:recipeId')
    .get(SERVICE.getRecipeById);

  recipeRoutes
    .all('/:projectId', async (req, res, next)=>{
      try {
        const query = req.params.recipeId;
        const data = SERVICE.getRecipeById(query);
        req.data = data;
        next();
      } catch (error) {
        res.send(error);
      }
    })

  recipeRoutes
    .route('/:recipeId')
    .get(itemMethods(collection).readOne);

  return recipeRoutes;
}

module.exports = router;