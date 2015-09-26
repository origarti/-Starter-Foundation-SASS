// Install all gulp plugins at once
// npm install gulp --save-dev & npm install gulp-sass --save-dev & npm install gulp-autoprefixer --save-dev & npm install gulp-minify-css --save-dev & npm install gulp-uglify --save-dev & npm install gulp-rename --save-dev & npm install gulp-concat --save-dev & npm install gulp-notify --save-dev & npm install gulp-plumber --save-dev & npm install gulp-imagemin --save-dev & npm install gulp-uncss --save-dev

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concate = require('gulp-concat');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var uncss = require('gulp-uncss');


/*
==========================================================
                    SASS
            ______________________
SASS compil -> Autoprefixr -> Uncss (remove non used CSS rules in *.html) ->
==========================================================
*/

gulp.task('foundationCSS', function(){
    gulp.src('assets/sass/foundation/foundation.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(rename("foundation.min.css"))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('style', function(){
    gulp.src('assets/sass/style.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(uncss({
        html: ['*.html'],
        ignore: [
        /^meta.foundation/, 
        /f-/, 
        /contain-to-grid/, 
        /sticky/, 
        /fixed/
      ]
    }))
    .pipe(minifyCSS())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('./dist/css'));
});


/*
==========================================================
                  Javascript
                ______________________

==========================================================
*/
gulp.task('customJS', function(){
    gulp.src('assets/js/main.js')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(uglify())
    .pipe(rename("custom.min.js"))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('foundationJS', function(){
    gulp.src([
      'assets/js/foundation/foundation.js',
      'assets/js/foundation/foundation.abide.js',
      'assets/js/foundation/foundation.accordion.js',
      'assets/js/foundation/foundation.alert.js',
      'assets/js/foundation/foundation.clearing.js',
      'assets/js/foundation/foundation.dropdown.js',
      'assets/js/foundation/foundation.equalizer.js',
      'assets/js/foundation/foundation.interchange.js',
      'assets/js/foundation/foundation.joyride.js',
      'assets/js/foundation/foundation.magellan.js',
      'assets/js/foundation/foundation.offcanvas.js',
      'assets/js/foundation/foundation.orbit.js',
      'assets/js/foundation/foundation.reveal.js',
      'assets/js/foundation/foundation.slider.js',
      'assets/js/foundation/foundation.tab.js',
      'assets/js/foundation/foundation.tooltip.js',
      'assets/js/foundation/foundation.topbar.js',
    ])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(concate("foundation-full.js"))
    .pipe(uglify())
    .pipe(rename("foundation.min.js"))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('script',['foundationJS', 'customJS'],  function(){
    gulp.src([
        'dist/js/foundation.min.js',
        'dist/js/custom.min.js'
    ])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(concate("main.js"))
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest('dist/js/'));
});
/*
==========================================================
              Images
        ______________________

==========================================================
*/
gulp.task('images', function() {
    return gulp.src([
        'assets/pic/*.{gif,jpg,png,svg}',
        'assets/pic/*/*.{gif,jpg,png,svg}'
    ])
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest('dist/pic/'));
});
/*
==========================================================
              Watch
         ___________________

    Déclencher une tâche particulière 
    si certains fichiers sont modifiés

==========================================================
*/
gulp.task('watch', function(){
    gulp.watch('assets/js/main.js', ['script']);
    gulp.watch('assets/js/foundation/*.js', ['foundationJS']);
    gulp.watch('assets/sass/*/*.scss', ['style']);
    gulp.watch('assets/sass/style.scss', ['style']);
    gulp.watch('*.html', ['style']);
});


/*
==========================================================
            Tache "Gulp" par Default
==========================================================
*/

gulp.task('default', ['style', 'script', 'images', 'watch'], function(){

});