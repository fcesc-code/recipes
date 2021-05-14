/* eslint-disable */
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminWebp from 'imagemin-webp';
import imageminSvgo from 'imagemin-svgo';

import JPEGImages from './assets/img/*.jpg';
import PNGImages from './assets/img/*.png';
import SVGFiles from './assets/svg/*.svg';
/* eslint-enable */

const outputDir = 'build/images';

const optimiseJPEGImages = () =>
  imagemin([ ...JPEGImages ], outputDir, {
    plugins: [
      imageminMozjpeg({
        quality: 85,
      }),
    ]
  });

const optimisePNGImages = () =>
  imagemin([ ...PNGImages ], outputDir, {
    plugins: [
      imageminPngquant({ quality: '80-90' })
    ],
  });

const convertPNGToWebp = () =>
  imagemin([ ...PNGImages ], outputDir, {
    use: [
      imageminWebp({
        quality: 90,
      }),
    ]
  });

const convertJPGToWebp = () =>
  imagemin([ ...JPEGImages ], outputDir, {
    use: [
      imageminWebp({
        quality: 85,
      }),
    ]
  });

const optimiseSVG = () =>
  imagemin([ ...SVGFiles ], outputDir, {
    use: [
      imageminSvgo({
        "plugins": [
          { "removeViewBox": false },
          { "cleanupIDs": true },
        ]
      }),
    ]
  });

optimiseJPEGImages()
  .then(() => optimisePNGImages())
  .then(() => convertPNGToWebp())
  .then(() => convertJPGToWebp())
  .then(() => optimiseSVG())
  .catch(error => console.log(error));

// OTHER CONFIGURATIONS
//   "gifsicle": { "optimizationLevel": 2, "interlaced": false, "colors": 16 }
//   "mozjpeg": { "progressive": true, "quality": 80 }
//   "optipng": { "optimizationLevel": 5 }
