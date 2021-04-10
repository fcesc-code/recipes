import renderComponent from '../core/renderer';

function headerComponent(){
  renderComponent(`
    <h1>RECEPTES</h1>
    <p>{{someContent}} {{andMore}}</p>
  `)({
    parent: 'header',
    styles: null,
    data: {
      someContent: 'This is fun!',
      andMore: 'A lot of fun.'
    }
  });
}

export default headerComponent;