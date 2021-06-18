
## Purpose
The aim of this PEC1 is to create a small site and a boilerplate for other projects, as part of a University 
[Web apps and sites development Master](https://estudis.uoc.edu/ca/masters-universitaris/desenvolupament-llocs-aplicacions-web/presentacio) 
by [Universitat Oberta de Catalunya](http://uoc.edu). \
Subject: HTML and CSS tools I. April 2021.

## Repo
A Git repository can be found at https://github.com/fcesc-code/uoc-eines1-pac1.git
Deploy status: [![Netlify Status](https://api.netlify.com/api/v1/badges/d97436fc-1621-4de1-b33c-f2c5567205de/deploy-status)](https://app.netlify.com/sites/gastro/deploys)

## Public web
The app can be accessed via following links:
- [Netlify prod environment](https://gastro.netlify.app/)
- [Firebase prod environment](https://recipes-3c018.web.app/)
- [Firebase dev environment](https://recipes-dev-a9010.web.app/)
- [Local dev environment](http://localhost:1234/) only local dev environment

## Tech stack
- [Parcel](https://parceljs.org) bundler
- [Babel](https://babeljs.io/) to transpile javascript to ES5 in production builds
- [Express](https://expressjs.com) as development server
- [nodemon](https://www.npmjs.com/package/nodemon) to watch for file chantes in development environment
- [Jest](https://jestjs.io/)
- [sass](https://sass-lang.com/)
- [github](https://github.com/)
- [Netlify](https://www.netlify.com/)
- [Firebase](https://firebase.google.com/)
- [sonarqube](https://www.sonarqube.org/)
- [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=es)
- [VSCode](https://code.visualstudio.com/)
- [Axios](https://github.com/axios/axios) for http requests (both browser and node compatible)
- [Navigo](https://github.com/krasimir/navigo)
- [ESLint](https://eslint.org/) for linting
- [Prettier](https://prettier.io/) as code formatter
- [PostCSS](https://www.npmjs.com/package/postcss)
- [Magick](https://imagemagick.org/index.php) to resize and format images from shell / bash
- Vanilla JS
- HTML

## Quality gate
- [HTML Validator](https://jigsaw.w3.org/css-validator/): 0 errors | 0 warnings \
- [WAVE](https://wave.webaim.org/) accessibility validator: 0 errors | 1 contrast error | 1 alert \
- [Jest](https://jestjs.io/): 15 tests passed \
- [Sonarqube](https://www.sonarqube.org/): 0 bugs | 2 code smells | 0 vulnerabilities | 0 security hotspots | 0% code duplication \
- [css validator](https://jigsaw.w3.org/css-validator/) used with the build css: 0 errors | 7 warnings (from autoprefixer code!)
- Github [Dependabot security alerts](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/): 3 warnings -> all of which from imagemin...
To

## Credits
Assistant professor Xavier Julián Olmos.
Wherever appropriate, credit is given to author as a comment in specific file.

## Author
Francesc Brugarolas, [VanillaJS repo](https://github.com/fcesc-code/vanillaJS)\
\
Latest update: June 2021
