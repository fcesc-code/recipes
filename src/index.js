import headerComponent from './views/header';
import footerComponent from './views/footer';
import listComponent from './views/list';
import router from './routes/router';

function init(){
  headerComponent();
  footerComponent();
  listComponent();
}

init();

const navigateTo = url => {
  window.history.pushState(null, null, url);
  router();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", event => {
    if (event.target.matches("[data-link]")) {
      event.preventDefault();
      navigateTo(event.target.href);
    }
  });

  router();
});
