// import PARSER from 'core/templateParser';
import path from 'path';
import 'regenerator-runtime/runtime';
// import axios from 'axios';

const somewhere = document.querySelector('#test');
const testPath = 'views/header.html';

function test(filePath){
  // const safePath = path.join(__dirname, filePath);
  return fetch(filePath)
    .then(response => response.text())
    .then(htmlText => {
      console.warn('OBTAINED FILE CONTENT', htmlText);
      return htmlText;
    })
    .catch(error => {
      console.error(`Error while accessing template file ${path} with error:\n${error}`);
      return '';
    })
}

async function append(){
  const dataToAppend = await test(testPath);
  const parser = new DOMParser();
  const parsed = parser.parseFromString(dataToAppend, "text/html");
  const fragment = parsed.body.firstChild;
  console.log('parsed', fragment);
  somewhere.appendChild(fragment);
}

append();