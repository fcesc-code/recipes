import renderComponent from '../core/renderer';

function footerComponent(){
  renderComponent(`
    <p>Francesc Brugarolas - <a href='http://uoc.edu'>UOC</a> - Eines HTML i CSS I - PAC1 - Abril 2021</p>
  `)({
    parent: 'footer',
    styles: null,
    data: {
      someContent: 'This is fun!'
    }
  });
}

export default footerComponent;