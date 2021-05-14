import renderComponent from '../core/renderComponent';

function footerComponent(){
  renderComponent(`
    <p>Francesc Brugarolas - <a href='{{url}}'>UOC</a> - Eines HTML i CSS I - PAC1 - Mai 2021</p>
  `)({
    parent: 'footer',
    styles: null,
    data: {
      url: 'http://uoc.edu'
    }
  });
}

export default footerComponent;