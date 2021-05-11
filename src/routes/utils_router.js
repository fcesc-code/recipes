const pathToRegex = path => new RegExp(`^${path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)")}$`);

const getParams = match => {
    const values = match.result.slice(1).map( input => input.replace(':', ''));
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    const result = Object.fromEntries(keys.map((key, i) => [key, values[i]] ));

    return result;
};

export { pathToRegex, getParams };