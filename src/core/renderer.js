import PARSER from './templateParser';

function renderComponent( htmlTextInput ){
  function findNode (query){
    return document.querySelector(query);
  }

  function append({ parent, styles, data }){
    addStyles(styles);
    addDOMElements({ parent, data });
  }

  function addDOMElements ( { parent, data } ){
    const node = bindDataToNode(data);
    findNode(parent).appendChild(node);
  }

  function addStyles (styles) {
    // const cssLoad = `<link rel="stylesheet" type="text/css" href="${styles}"/>`;
    // const parsed = new DOMParser().parseFromString(cssLoad, "text/html")
    // const style = parsed.head.firstChild;
    // findNode(`head`).appendChild(style);
    const link = document.createElement('link');
      link.href = styles;
      link.rel = 'stylesheet';
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