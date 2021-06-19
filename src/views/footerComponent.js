import renderComponent from '../core/renderComponent';

function footerComponent(){
  renderComponent(`
    <p class="footer--flex">
      <a class="inherit--text" href="https://github.com/fcesc-code">Francesc Brugarolas</a> 
      <span class="footer--hide">|</span> 
      <a href='{{url}}'>Universitat Oberta de Catalunya</a>
      <span>Eines HTML i CSS I - PAC#1, #2 & #3</span>
      <spanEines class="footer--hide">|</spanEines> 
      <time datetime="2021-06">June 2021</time>
      <span class="footer--hide">|</span>
      <strong><a class="inherit" href="#nav-top">&#94 TOP</a></strong>
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