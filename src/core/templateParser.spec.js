import templateParser from './templateParser';

describe('SUITE template.parseLiteral tests', () => {

  it('Should detect a double curled expression and substitute the variable for a value', () => {
    const sampleVariables = [ 'cool', 'there' ];
    const sampleValues = [ 'really cool stuff', 'somewhere else' ];
    const sampleTemplate = `<h2>some {{${sampleVariables[0]}}} here and there</h2>`;
    const testValuesMap = new Map();
    testValuesMap.set(sampleVariables[0], sampleValues[0]);

    const expected = `<h2>some really cool stuff here and there</h2>`;;

    const actual = templateParser.parseLiteral(sampleTemplate, testValuesMap);

    expect(actual).toBe(expected);
  })

  it('Should not detect single curled expressions', () => {
    const sampleTemplate = '<h2>some{notSoCool}stuff</h2>';
    const testValuesMap = new Map();

    const expected = sampleTemplate;

    const actual = templateParser.parseLiteral(sampleTemplate, testValuesMap);

    expect(actual).toBe(expected);
  })

  it('Should detect more than one double curled expression and substitute the variables for values', () => {
    const sampleVariables = [ 'cool', 'there' ];
    const sampleValues = [ 'really cool stuff', 'somewhere else' ];
    const sampleTemplate = `<h2>some {{${sampleVariables[0]}}} here and {{${sampleVariables[1]}}}</h2>`;
    const testValuesMap = new Map();
    testValuesMap.set(sampleVariables[0], sampleValues[0]);
    testValuesMap.set(sampleVariables[1], sampleValues[1]);

    const expected = `<h2>some really cool stuff here and somewhere else</h2>`;;

    const actual = templateParser.parseLiteral(sampleTemplate, testValuesMap);

    expect(actual).toBe(expected);
  })

  it('Should not detect malformed curly expressions', () => {
    const sampleTemplate = '<h2>some{[not}</h2>';
    const testValuesMap = new Map();
    const expected = sampleTemplate;

    const actual = templateParser.parseLiteral(sampleTemplate, testValuesMap);

    expect(actual).toBe(expected);
  })

  it('Should not detect unproperly closed curly expressions', () => {
    const sampleTemplate = '<h2>some{[not{{</h2>';
    const testValuesMap = new Map();

    const expected = sampleTemplate ;
    
    const actual = templateParser.parseLiteral(sampleTemplate, testValuesMap);

    expect(actual).toBe(expected);
  })

  it('Should detect special object data as input', () => {
    const sampleSpecialDataObj = 'list';
    const sampleHtml = `<ul>{{%%${sampleSpecialDataObj}%%}}<ul>`;
    const sampleTemplate = `<li>{{title}}: {{description}}</li>`;
    const sampleList = [ 
      { title: 'One', description: 'Interesting stuff' },
      { title: 'Two', description: 'Can be rendered' },
      { title: 'Three', description: 'In a list' }
    ];
    const testValuesMap = new Map();
    testValuesMap.set(`%%${sampleSpecialDataObj}%%`, { 
      list: sampleList,
      itemTemplate: sampleTemplate
    });
    let expectedItemsListWithValues = '';
    for (let item of sampleList){
      expectedItemsListWithValues = expectedItemsListWithValues + `<li>${item.title}: ${item.description}</li>`;
    } 

    const expected = `<ul>${expectedItemsListWithValues}<ul>`;
    
    const actual = templateParser.parseLiteral(sampleHtml, testValuesMap);
    console.log('actual', actual);

    expect(actual).toBe(expected);
  })

})
