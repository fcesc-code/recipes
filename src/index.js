import headerComponent from './views/header';
import footerComponent from './views/footer';
import listComponent from './views/list';
import renderApp from './core/renderApp';
import APPROUTES from './routes/appUrls';


function init(){
  headerComponent();
  footerComponent();
  renderApp( listComponent );
}

init();

window.onpopstate((event) => {
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
  renderApp( target.body );
})

// window.onpopstate = () => {
//   const ROOT = document.querySelector('#content');
//   // ROOT.innerHTML = routes[window.location.pathname]
//   ROOT.innerHTML = ''
//   console.log('here here', window.location.pathname);
// }

// function onNavigate(){
//   const currentPath = window.location.pathname;
//   const regEx = /\/(?=[^/]+$).+/g;
//   const pathname = currentPath.match(regEx)[0];

//   window.history.pushState(
//     {},
//     pathname,
//     window.location.origin + pathname
//   )
// }