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
    const specialVariablesPattern = /(?<=%%)[^%\s]*(?=%%)/;
    for (const variable of variables){
      if(specialVariablesPattern.test(variable)){
        const target = mapOfValues.get(variable);
        const list = target.list;
        const template = target.itemTemplate;
        const itemProperties = getValuesFromHtmlText(template);

        let resultList = '';
        for (let item of list){
          let mutableTemplate = template;
          for (let itemProp of itemProperties){
            const itemTargetValue = item[itemProp];
            mutableTemplate = mutableTemplate.replace(`{{${itemProp}}}`, itemTargetValue)
          }
          resultList = `${resultList}${mutableTemplate}`;
        }
        modifiedHtmlText = modifiedHtmlText.replace(`{{${variable}}}`, resultList);
      } else {
        const targetValue = mapOfValues.get(variable);
        modifiedHtmlText = modifiedHtmlText.replace(`{{${variable}}}`, targetValue);
      }
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