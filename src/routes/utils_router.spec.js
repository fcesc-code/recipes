import { pathToRegex, getParams } from './utils_router';

describe('test suite for router utils, PathToRegEx method', () => {

  it('PathToRegex should return a RegEx', () => {
    const current = pathToRegex('');

    expect(current instanceof RegExp).toBe(true);
  })

  it('PathToRegex should return a RegEx', () => {
    const urlString = 'localhost:3010/categories/:roasts';
    const modifiedString = `^${urlString.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)")}$`;
    const expected = new RegExp(modifiedString);
    const current = pathToRegex(urlString);

    expect(current).toStrictEqual(expected);
  })

})

// describe('test suite for router utils, getParams method', () => {

//   it('getParams should detect params', () => {
//     const urlString = 'localhost:3010/categories/:roasts';
//     const input = {
//       route: { title: 'category', path: '/categories/:category', display: false, view: 'testStuff' },
//       result: [urlString]
//     };
//     const expected = ':roasts';
//     const current = getParams(input);

//     expect(current instanceof RegExp).toBe(expected);
//   })

// })