import PARSER from './templateParser';
import 'regenerator-runtime/runtime';
import path from 'path';

function renderComponent( htmlTextInput ){
  function findNode (query){
    return document.querySelector(query);
  }

  function append({ parent, styles, data }){
    if (styles) addStyles(styles);
    addDOMElements({ parent, data });
  }

  function addDOMElements ( { parent, data } ){
    const node = bindDataToNode(data);
    findNode(parent).appendChild(node);
  }

  async function addStyles (stylesPath) {
    const safePath = path.join(__dirname, stylesPath);
    const loadedStyles = await fetch(safePath).then(response => response.text());
    console.warn(loadedStyles);
    const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = '';
    findNode('head').appendChild(link);
  }

  function bindDataToNode(data){
    function createDataMap(){
      let dataMap = new Map();
      for (let prop in data){
        dataMap.set(prop, data[prop]);
      }
      return dataMap;
    }

    const inputData = (data) ? createDataMap(data) : null;
    const templateWithData = PARSER.parseLiteral( htmlTextInput, inputData );

    const node = document
      .createRange()
      .createContextualFragment( templateWithData );

    return node;
  }

  return append;
}

export default renderComponent;