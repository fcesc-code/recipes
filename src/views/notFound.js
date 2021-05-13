import renderComponent from '../core/renderComponent';

function notFoundComponent(){
  renderComponent(`
    <p>Err 404: Sorry, the page you were looking for is not here!</p>
  `)({
    parent: '#content',
    styles: null,
    data: {}
  });
}

export default notFoundComponent;