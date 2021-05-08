import headerComponent from './views/header';
import footerComponent from './views/footer';
import listComponent from './views/list';
import APPROUTES from './routes/appUrls';

function renderBody( newBody ){
  return newBody();
}

function init(){
  headerComponent();
  footerComponent();
  renderBody( listComponent );
}

init();

window.addEventListener('onpopstate', (event) => {
  console.error('TRIGGERED ONPOPSTATE')
  console.warn(event.state);
  console.warn('entering popstate!!!');
  const currentPath = window.location.pathname;
  const regEx = /\/(?=[^/]+$).+/g;
  const pathname = currentPath.match(regEx)[0];
  console.warn('pathname', pathname);
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )
  console.warn('entering popstate bis');
  const target = APPROUTES.find( element => element.path === pathname );
  console.warn('this is what we got from target', target);
  renderBody( target.body );
})
