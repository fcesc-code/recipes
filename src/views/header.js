import renderComponent from '../core/renderer';

function headerComponent(){
  renderComponent(`
    <h1>Receptes de cuina</h1>
    <p>{{someContent}} {{andMore}}</p>
  `)({
    parent: 'header',
    styles: 'header.css',
    data: {
      someContent: 'This is fun!',
      andMore: 'A lot of fun.'
    }
  });
}

export default headerComponent;