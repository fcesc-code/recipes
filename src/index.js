import headerComponent from './views/header';
import footerComponent from './views/footer';
import listComponent from './views/list';
import router from './routes/router';

const navigateTo = url => {
    window.history.pushState(null, null, url);
    router();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});

function renderBody( newBody ){
  return newBody();
}

function init(){
  headerComponent();
  footerComponent();
  renderBody( listComponent );
}

init();