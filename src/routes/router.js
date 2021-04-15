import APPROUTES from './appUrls';

class Router {
  routes = [];

  constructor( 
    routes
  ){
    this.routes = [ ...routes ];
  }

  navigateTo(){

  }
}

const ROUTER = new Router( APPROUTES );
export default ROUTER;