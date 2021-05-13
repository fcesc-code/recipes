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
    <p>{{dummy}}</p>
    <section>
    <article>
      <h2>About us</h2>
        <p>
          Why another recipies site? Which is the same as asking: in which way is this site different?
          Very easy, we don't store cookies and bombard you with advertisments.
          The recipies are from an open, crowd-funded database with repicies from all over the world: 
          <a href="https://rapidapi.com/thecocktaildb/api/themealdb">The MealDB API.</a>
        </p>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum 
          deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non 
          provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum 
          fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis 
          est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis 
          voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis 
          aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. 
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias 
          consequatur aut perferendis doloribus asperiores repellat.
        <p>
    </article>
    <article>
      <h2>Credits</h2>
      <p>This project had to be developed in VanillaJS, using only a few libraries but no framework
        or backend was allowed. For the sake of it, the author has decided to use own template render
        functions and own router, both very basic.
      </p>
      <p>Recipes were inspired in these sites:<p>
      <ul>
        {{%%sources%%}}
      </ul>
      <p>For the author recipes, credits to:</p>
      <ul>{{%%cooks%%}}</ul>
      <p>For the photographs, credits to:</p>
      <ul>{{%%photographers%%}}</ul>
      <p>
        This website has been developed using following tech stack:
        <ul>
          <li>Parcel</li>
          <li>Webpack</li>
          <li>Babel</li>
          <li>Jest</li>
          <li>Sass</li>
          <li>Sonarqube</li>
          <li>VSCode</li>
          <li>Github</li>
          <li>Axios</li>
          <li>Eslint</li>
          <li>Prettier</li>
          <li>Vanilla JS</li>
        </ul>
        Following pages were used as ressources for this page:
        <ul>
          <li><a href="https://www.pexels.com">Pexels</a></li>
          <li><a href="https://unsplash.com">Unsplash</a></li>
          <li><a href="coolors.co/">coolors.co</a></li>
          <li><a href="https://fonts.google.com/">Google Fonts</a></li>
        </ul>
      </p>
      <p>
        This project is an exercise doing for "HTML and CSS Tools 1" Subject, as part of the 
        <abbr title="Universitat Oberta de Catalunya"><a href="">UOC</a></abbr> Master in 
        <a href="https://estudis.uoc.edu/ca/masters-universitaris/desenvolupament-llocs-aplicacions-web/presentacio">
        Webb app and sites development</a>. It has been developed in March and April 2021.
      </p>
      <p>
        The code for this project is open source and was developed for educational purposes.
        A repository of this project can be found in Github in this 
        <a href="https://github.com/fcesc-code/uoc-eines1-pac1#readme">link</a>.
      </p>
    </article>
  </section>
  `)({
    parent: '#content',
    styles: null,
    data: {
      dummy: 'Urrah! this is an about page',
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