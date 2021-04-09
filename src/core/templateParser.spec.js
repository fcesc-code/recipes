import templateParser from './templateParser';

xdescribe('SUITE template.parseLiteral tests', () => {

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
})

describe('SUITE template.parseTemplate (from File) tests', () => {

  test('Should load the content of a file and substitute the variables using .parseLiteral', async () => {
    const sampleValues = [ 'really cool stuff', 'somewhere else' ];
    const testValuesMap = new Map();
    testValuesMap.set('cool', sampleValues[0]);
    testValuesMap.set('there', sampleValues[1]);
    const path = './templateParser.spec.html';

    const expected = `<!--This html is for test purposes-->
      <h1>Some template stuff</h1>
      <p class="someParagraph">Here is some text with some ${sampleValues[0]}.</p>
      <p class="someParagraph">${sampleValues[1]} is some other text.</p>
      <ul>
        <li>None of the following items should be substituted</li>
        <li>Item {{none}the}less</li>
        <li>Item {{unclosed</li>
        <li>Item }crazy}</li>
      </ul>`;

    const actual = await templateParser.parseTemplate(path, testValuesMap);

    expect(actual.replace(/\n/g,'')).toEqual(expected.replace(/\n/g,''));
  })

})