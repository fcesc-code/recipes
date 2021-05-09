// eslint-disable-next-line
import regeneratorRunTime from 'regenerator-runtime';
import ROUTES from './appUrls';

const pathToRegex = path => new RegExp(`^${path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)")}$`);

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => [key, values[i]] ));
};

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

  console.warn('HERE', getParams(match));

  match.route.view(); // getParams(match)
};
  
export default router;