import renderComponent from '../core/renderComponent';
import SERVICE from '../services/RECIPES_SERVICE';
import CREDITS from '../mockdata/CREDITS_MEDIA';

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
    <section class="embedded-video">
      <iframe src="https://www.youtube.com/embed/EKgwmMxh2g8" title="YouTube video player" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </section>
    <section>
      <h1>About the site</h1>
      <h2 class="subtitle">Why Gastronomy</h2>
      <p>
        Why another recipies site? Which is the same as asking: in which way is this site different?
        Very easy, we don't store cookies and bombard you with advertisments.
        The recipies are currently from mockdata from the web.
      </p>
      <h2 class="subtitle">Development status</h2>
      <p>
        The gastro-app has presently a basic functionality: a limited list of recipes that can be filtered 
        with different criteria, with visual contents and basic <abbr title="cascade stylesheets">css</abbr> 
        animations. 
      </p>
      <p>
        The next step is to develop an <abbr title="application programming interface">api</abbr> module to 
        fetch recipies from an open, crowd-funded database with repicies from all over the world: 
        <a href="https://rapidapi.com/thecocktaildb/api/themealdb">The MealDB API.</a>
      </p>
      <p>
        Ohter nice-to-have items for future development are: pagination, ordering and autosuggest search bar.
      </p>
      <h2 class="subtitle">Educational purposes</h2>
      <p>
        This project is an exercise doing for "HTML and CSS Tools 1" Subject, as part of the 
        <abbr title="Universitat Oberta de Catalunya"><a href="https://uoc.edu">UOC</a></abbr> Master in 
        <a href="https://estudis.uoc.edu/ca/masters-universitaris/desenvolupament-llocs-aplicacions-web/presentacio">
        Web app and sites development</a>. It has been developed between <time datetime="2021-03">March</time> 
        and <time datetime="2021-06">June 2021</time>.
      </p>
      <h2 class="subtitle">Open source</h2>
      <p>
        The code for this project is open source and was developed for educational purposes. Luckily for the world,
        npm has not been cluttered with another dependency as a result. A repository of this project can be found 
        in <a href="https://github.com/fcesc-code/uoc-eines1-pac1#readme">Github</a>.
      </p>
      <p>
        The renderComponent along with the (unfortunately but necessarily) higly coupled parser function allow
        in a very lightweight way to render html content dynamically. This web for example is a 
        <abbr title="Single Page Application">SPA</abbr> using only VanillaJS. The render is programmed in a 
        functional style instead of classes, which result in a lighter boilerplate code. 
      </p>
      <p>        
        An interesting feature is the special syntax used in to parse the HTML code. Apart from the usual double 
        bracket notation to replace variables <code>Some html text with your { { variable } }</code>, the parser has 
        been programed so that when iterated over an array of objects you can just use the <code>{ { %% list %% } }</code>
        double % notation inside the brackets to identify where the list should be expanded and a template for the 
        list as a separate variable. In the template, you can directly refer to the properties ob the object instead 
        of having to acces them all the time with <code>element.property</code> syntax. Find examples in some 
        components in the Github <a href="https://github.com/fcesc-code/uoc-eines1-pac1">repository</a>.
      </p>
      <h2 class="subtitle">Development methodology</h2>
      <p>
        The project has been developed using a 
        <abbr title="framework for developing, delivering, and sustaining complex products">SCRUM</abbr> 
        framework, with small iterations. 
      </p>
      <p>
        The testing has played an important role in the development of critical functions, especially for 
        the development of the HtmlParser, the renderComponent function, both of which have been developed
        as <abbr title="Test-driven development">TDD</abbr>, as well as the service of the app. The focus
        of the <abbr title="Test-driven development">TDD</abbr> has only been put where is crucially needed,
        not in code more related to content, for example, the boilerplate for each of the components.
      </p>
      <p>        
        A continuous deployment flow was integrated in the git repository, automated in Netlify or using
        Github actions for Firebase.
      </p>
    </section>
    <section>
      <h1>Tech stack</h1>
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
      <h2 class="subtitle">This website has been developed using following tech stack:</h2>
      <ul class="center--mobile">
        <li><a href="https://parceljs.org">Parcel</a></li>
        <li><a href="https://babeljs.io/">Babel</a></li>
        <li><a href="https://www.netlify.com/">Netlify</a><li>
        <li><a href="https://firebase.google.com/">Firebase</a><li>
        <li><a href="https://jestjs.io/">Jest</a></li>
        <li><a href="https://sass-lang.com/">Sass</a></li>
        <li><a href="https://www.sonarqube.org/">Sonarqube</a></li>
        <li><a href="https://code.visualstudio.com/">VSCode</a></li>
        <li><a href="https://github.com/">Github</a></li>
        <li><a href="https://github.com/axios/axios">Axios</a></li>
        <li><a href="https://eslint.org/">Eslint</a></li>
        <li><a href="https://prettier.io/">Prettier</a></li>
        <li><a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Introduction">Vanilla JS</a></li>
        <li><a href="https://expressjs.com">Express</a></li>
        <li><a href="https://github.com/krasimir/navigo">Navigo</a></li>
        <li><a href="https://imagemagick.org/index.php">Image Magick</a></li>
      </ul>
      <h2 class="subtitle">Following pages were used as ressources, inspiration or knowledge base for this page:</h2>
      <ul class="center--mobile">
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
      <h1>Credits</h1>
      <h2 class="subtitle">Recipes were inspired in these sites:</h2>
      <ul class="center--mobile">{{%%sources%%}}</ul>
      <h2 class="subtitle">For the author recipes, credits to:</h2>
      <ul class="center--mobile">{{%%cooks%%}}</ul>
      <h2 class="subtitle">For the photographs, credits to:</h2>
      <ul class="center--mobile">{{%%photographers%%}}</ul>
      <h2 class="subtitle">Assistant professor</h2>
      <p class="center--mobile">Xavier Julián Olmos</p>
    </section>
    <section>
      <h1>About the author</h1>
      <p class="center-mobile">Find more information about the author on <a href="https://github.com/fcesc-code/">Github</a> 
      or <a href="https://linkedin.com/in/francescbrugarolas/">LinkedIn</a>.</p>
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