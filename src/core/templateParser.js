import axios from 'axios';
// import { readFileSync } from 'fs';
import path from 'path';

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
    console.log('org:', htmlText, 'mod:', modifiedHtmlText)
    return modifiedHtmlText
  }

  function parseTemplate( filePath, mapOfValues ){
    const safePath = path.join(__dirname, filePath);
    return axios(safePath)
      .then(response => response.text())
      .then(htmlText => {
        console.warn('OBTAINED FILE CONTENT', htmlText);
        return parseLiteral( htmlText, mapOfValues)
      })
      .catch(error => {
        console.error(`Error while accessing template file ${path} with error:\n${error}`);
        return '';
      })
    // try{
    //   const safePath = path.join(__dirname, filePath);
    //   const textData = readFileSync(safePath, 'utf8');
    //   return parseLiteral( textData, mapOfValues );
    // } catch (error) {
    //   console.error(`Error while accessing template file ${path} with error:\n${error}`);
    //   return '';
    // }
  }

  function parseLiteral( htmlTextInput, mapOfValues ){
    const dynamicVariables = getValuesFromHtmlText(htmlTextInput);
    return (dynamicVariables === null || mapOfValues === null)
      ? htmlTextInput
      : substituteDynamicValues( htmlTextInput, dynamicVariables, mapOfValues );
  }

  return { parseTemplate, parseLiteral }
}

const PARSER = parseValues();

export default PARSER;