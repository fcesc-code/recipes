import renderComponent from '../core/renderComponent';

function surpriseComponent(){
  renderComponent(`
    <p>{{dummy}}</p>
  `)({
    parent: '#content',
    styles: null,
    data: {
      dummy: 'Urrah! this is a surprise page'
    }
  });
}

export default surpriseComponent;