const {src, dest, task, series, watch, parallel} = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
// const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {SRC_PATH, DIST_PATH} = require('./gulp.config');

task('clean', () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe( rm()); 
});

task("copy:html", () => {
  return src(`${SRC_PATH}/*.html`)
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true}));
});

task("copy:mp4", () => {
  return src('src/*.mp4')
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true}));
});

const styles = [
  "node_modules/normalize.css/normalize.css",
  "src/scss/main.scss"
]

task("styles", () => {
  return src(styles)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      gulpif(
        env === 'dev', 
        autoprefixer({cascade: false})
      )
    )
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    //.pipe(dest(`${DIST_PATH}/css`))
    .pipe(dest((DIST_PATH)))
    .pipe(reload({stream: true}));
});

task("scripts", () => {
  return src("src/scripts/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("main.js", { newLine: ";"}))
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest(`${DIST_PATH}/css`))
    .pipe(reload({stream: true}));
});

task("svg", () => {
  return src('src/img/svg/*.svg')
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: {
            attrs: "(fill|stroke|style|width|height|data.*)"}
        }
      ]
    })
  )
  .pipe(svgSprite({
    mode: {
      symbol: {
        sprite: "../sprite.svg"
      }
    }
  }))
  .pipe(dest(`${DIST_PATH}/img/svg`));
});

task('server', () => {
  browserSync.init({
      server: {
        baseDir: "./${DIST_PATH}"
      },
      open: false
  });
});

task('watch', () => {
  watch("./src/scss/**/*.scss", series("styles"));
  watch("./src/*.html", series("copy:html"));
  watch("./src/scripts/*js", series("scripts"));
  watch("./src/img/svg/*.svg", series("svg"));
});


task(
  "default", 
  series(
    "clean", 
    parallel("copy:html", "styles", "scripts", "svg"),
    parallel("watch", "server")
  )
);

task(
  "build", 
  series(
    "clean", 
    parallel("copy:html", "styles", "scripts", "svg"))
);

