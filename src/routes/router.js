// eslint-disable-next-line
import regeneratorRunTime from 'regenerator-runtime';
import { pathToRegex, getParams } from './utils_router';
import ROUTES from './appUrls';

async function router(){
  const potentialMatches = ROUTES.map(route => {
    const currentPathname = window.location.pathname
    return {
      route,
      result: currentPathname.match(pathToRegex(route.path))
    };
  });

  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

  if (!match) {
    match = {
      route: ROUTES[0],
      result: [window.location.pathname]
    };
  }

  // eslint-disable-next-line
  console.warn('ROUTER', match);

  return (match === undefined) ? match.route.view() : match.route.view(getParams(match));

};
  
export default router;