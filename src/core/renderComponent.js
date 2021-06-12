import PARSER from './PARSER';

function renderComponent( htmlTextInput ){
  function findNode (query){
    return document.querySelector(query);
  }
  
  function bindDataToNode(data){
    function createDataMap(){
      const dataMap = new Map();
      Object.keys(data).forEach( prop => dataMap.set(prop, data[prop]) );
      return dataMap;
    }

    const inputData = (data) ? createDataMap() : null;
    const templateWithData = PARSER.parseLiteral( htmlTextInput, inputData );

    const node = document
      .createRange()
      .createContextualFragment( templateWithData );

    return node;
  }

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  }
  
  function addDOMElements ( { parent, data } ){
    const node = bindDataToNode(data);
    const parentEl = findNode(parent);
    if(parentEl && parentEl.hasChildNodes()){ removeAllChildNodes( parentEl ) }
    if(parentEl) parentEl.appendChild(node);
  }
  
  async function addStyles (stylesPath) {
    const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = stylesPath;
    findNode('head').appendChild(link);
  }

  function append({ parent, styles, data }){
    if (styles) addStyles(styles);
    addDOMElements({ parent, data });
  }

  return append;
}

export default renderComponent;