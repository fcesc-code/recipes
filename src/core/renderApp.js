function renderApp( newBody ){
  console.warn('Triggered RenderApp');
  const content = document.querySelector('#content');
  content.innerHTML = '';
  return newBody();
}

export default renderApp;