import renderComponent from '../core/renderer';

function footerComponent(){
  renderComponent(`
    <p>Francesc Brugarolas - <a href='{{url}}'>UOC</a> - Eines HTML i CSS I - PAC1 - Abril 2021</p>
  `)({
    parent: 'footer',
    styles: null,
    data: {
      url: 'http://uoc.edu'
    }
  });
}

export default footerComponent;