const REGEX_TO_PARSE = /(?<=\{\{)[^{]*(?=\}\})/g;

function parseValues(){
  function getValuesFromHtmlText(htmlText){
    const result = htmlText.match(REGEX_TO_PARSE);
    return (result === null)
      ? null
      : [ ...result ];
  }

  function substituteDynamicValues( htmlText, variables, mapOfValues ){
    // eslint-disable-next-line no-restricted-syntax
    let modifiedHtmlText = htmlText;
    for (const variable of variables){
      const targetValue = mapOfValues.get(variable);
      modifiedHtmlText = modifiedHtmlText.replace(`{{${variable}}}`, targetValue);
    }
    return modifiedHtmlText
  }

  function parseLiteral( htmlTextInput, mapOfValues ){
    const dynamicVariables = getValuesFromHtmlText(htmlTextInput);
    return (dynamicVariables === null || mapOfValues === null)
      ? htmlTextInput
      : substituteDynamicValues( htmlTextInput, dynamicVariables, mapOfValues );
  }

  return { parseLiteral }
}

const PARSER = parseValues();

export default PARSER;