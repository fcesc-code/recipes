import renderComponent from '../core/renderComponent';

function notFoundComponent(){
  renderComponent(`
    <p>Err 404: Sorry, the page you were looking for is not here!</p>
    <p>Maybe you want to navigate back to <a href="/" data-navigo>homepage</a>?</p>
  `)({
    parent: '#content',
    styles: null,
    data: {}
  });
}

export default notFoundComponent;