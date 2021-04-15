import renderComponent from '../core/renderComponent';

function aboutComponent(){
  renderComponent(`
    <p>{{dummy}}</p>
  `)({
    parent: '#content',
    styles: null,
    data: {
      dummy: 'Urrah! this is an about page'
    }
  });
}

export default aboutComponent;