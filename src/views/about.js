import renderComponent from '../core/renderComponent';
import SERVICE from '../services/service';
import CREDITS from '../mockdata/credits';

function listCooks(){
  return SERVICE.getCooks()
}
const cookTemplate = '<li>{{cook}}</li>';

function listSources(){
  return SERVICE.getSources()
}
const sourceTemplate = '<li><a href="{{source}}">{{source}}</a></li>';

function listPhotographers(){
  const list = new Map();
  CREDITS.forEach( person => list.set( person.author, person.authorUrl ) );
  return Array.from(list.entries()).map( personArr => ({ 'author': personArr[0], 'authorUrl': personArr[1] }) );
}
const photographerTemplate = '<li><a href="{{authorUrl}}">{{author}}</a></li>';

function aboutComponent(){
  renderComponent(`
    <article>
    <section>
      <h2>About the site</h2>
      <h4>Why Gastronomy</h4>
      <p>
        Why another recipies site? Which is the same as asking: in which way is this site different?
        Very easy, we don't store cookies and bombard you with advertisments.
        The recipies are currently from mockdata from the web.
      </p>
      <h4>Development status</h4>
      <p>
        The gastro-app has presently a basic functionality: a limited list of recipes that can be 
        filtered with different criteria, with visual contents and basic css animations. 
      </p>
      <p>
        The next steps are to develop a api module to fetch recipies from an open, crowd-funded database 
        with repicies from all over the world: 
        <a href="https://rapidapi.com/thecocktaildb/api/themealdb">The MealDB API.</a>
      </p>
      <p>
        Ohter nice-to-have items for future development are: include ordering and autosuggest search bar.
      </p>
      <h4>Educational purposes</h4>
      <p>
        This project is an exercise doing for "HTML and CSS Tools 1" Subject, as part of the 
        <abbr title="Universitat Oberta de Catalunya"><a href="">UOC</a></abbr> Master in 
        <a href="https://estudis.uoc.edu/ca/masters-universitaris/desenvolupament-llocs-aplicacions-web/presentacio">
        Webb app and sites development</a>. It has been developed in March and April 2021.
      </p>
      <h4>Open source</h4>
      <p>
        The code for this project is open source and was developed for educational purposes.
        A repository of this project can be found in Github in this 
        <a href="https://github.com/fcesc-code/uoc-eines1-pac1#readme">link</a>.
      </p>
      <h4>Development methodology</h4>
      <p>
        The project has been developed using a SCRUM framework, with small iterations. The testing has played an important
        role in the development of critical functions. A continuous deployment flow was integrated in the git repository.
      </p>
    </section>
    <section>
      <h2>Tech stack</h2>
      <p>
        The application needed to be developed without any framework. Also, a boilerplate had to be created that
        could be reused in other web development projects. More on the tech-stack section.
      <p>
      <p>
        Therefore, VanillaJS is mainly used, with only a few libraries for testing, bundling, etc.
        For the sake of it, the author has decided to use its own components with their own template render
        functions. Although with limited functionality, components can receive and dynamically render data, as
        well as unfold a list of data using a template (an Array of Objects is required).
      </p>
      <h4>This website has been developed using following tech stack:</h4>
      <ul>
        <li><a href="https://parceljs.org">Parcel</a></li>
        <li><a href="https://babeljs.io/">Babel</li>
        <li><a href="https://www.netlify.com/">Netlify</a><li>
        <li><a href="https://jestjs.io/">Jest</li>
        <li><a href="https://sass-lang.com/">Sass</li>
        <li><a href="https://www.sonarqube.org/">Sonarqube</li>
        <li><a href="https://code.visualstudio.com/">VSCode</li>
        <li><a href="https://github.com/">Github</li>
        <li><a href="https://github.com/axios/axios">Axios</li>
        <li><a href="https://eslint.org/">Eslint</li>
        <li><a href="https://prettier.io/">Prettier</li>
        <li><a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Introduction">Vanilla JS</li>
        <li><a href="https://expressjs.com">Express</a></li>
        <li><a href="https://github.com/krasimir/navigo">Navigo</a></li>
      </ul>
      <h4>Following pages were used as ressources, inspiration or knowledge base for this page:</h4>
      <ul>
        <li><a href="https://www.pexels.com">Pexels</a></li>
        <li><a href="https://unsplash.com">Unsplash</a></li>
        <li><a href="https://uxwing.com/">Uxwing</a></li>
        <li><a href="https://coolors.co/">coolors.co</a></li>
        <li><a href="https://fonts.google.com/">Google Fonts</a></li>
        <li><a href="https://css-tricks.com/">Css-tricks</a></li>
        <li><a href="https://codepen.io/">Codepen</a></li>
      </ul>
    </section>
    <section>
      <h2>Credits</h2>
      <h4>Recipes were inspired in these sites:<h4>
      <ul>{{%%sources%%}}</ul>
      <h4>For the author recipes, credits to:</h4>
      <ul>{{%%cooks%%}}</ul>
      <h4>For the photographs, credits to:</h4>
      <ul>{{%%photographers%%}}</ul>
      <h4>Assistant professor</h4>
      <p>Xavier Julián Olmos</p>
    </section>
    <section>
      <h2>About the author</h2>
      <p>Find more information about the author on <a href="https://github.com/fcesc-code/">Github</a>.</p>
    </section>
  </article>
  `)({
    parent: '#content',
    styles: null,
    data: {
      cooks: {
        list: listCooks(),
        itemTemplate: cookTemplate
      },
      sources: {
        list: listSources(),
        itemTemplate: sourceTemplate
      },
      photographers: {
        list: listPhotographers(),
        itemTemplate: photographerTemplate
      }
    }
  });
}

export default aboutComponent;