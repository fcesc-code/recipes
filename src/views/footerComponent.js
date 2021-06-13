import renderComponent from '../core/renderComponent';

function footerComponent(){
  renderComponent(`
    <p>
      <a class="inherit" href="https://github.com/fcesc-code">Francesc Brugarolas</a> | 
      <a href='{{url}}'>UOC</a> - Eines HTML i CSS I - PAC#1, #2 & #3 | 
      <time datetime="2021-06">June 2021</time> | <strong><a class="inherit" href="#nav-top">TOP</a></strong>
    </p>
  `)({
    parent: 'footer',
    styles: null,
    data: {
      url: 'http://uoc.edu'
    }
  });
}

export default footerComponent;