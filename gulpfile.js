/*

> npm init
> npm i -D gulp gulp-sass gulp-autoprefixer browser-sync gulp-concat gulp-csso gulp-rename gulp-uglify gulp-util 

---------------------------------------
Gulp definition
---------------------------------------
*/

// Inclure GULP
var gulp = require('gulp');

// Inclure les PLUGINS
var autoprefixer = require('gulp-autoprefixer');
var sass         = require('gulp-sass');
var bs           = require('browser-sync').create();
var concat       = require('gulp-concat');
var csso         = require('gulp-csso');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var util         = require('gulp-util');


/* Config
------------------------------------- */

var config = {
    production: !!util.env.prod
};


/* SCSS compile & autoprefix (& minify if --prod)
--------------------------------------------------- */

gulp.task('css', function() {
    return gulp.src('./assets/css/*.scss')
               .pipe(sass().on('error', sass.logError)) // Compile into CSS
               .pipe(autoprefixer()) // Autoprefix the file
               .pipe(config.production ? rename({ suffix: '.min' }) : util.noop()) // Add suffix only in prod
               .pipe(config.production ? csso() : util.noop()) // Minify only in prod
               .pipe(gulp.dest('assets/css')) // Export the file
               .pipe(bs.stream());
});



/* JS uglification (if --prod)
--------------------------------------------------- */

// Main scripts.js
gulp.task('scripts', function() {
    if (!config.production) {
        return bs.reload();
    } 
    else {
        return gulp.src('assets/js/src/scripts.js')
                   .pipe(uglify()) // Uglifie et minifie le js
                   .pipe(rename({ suffix: '.min' })) // Renomme en scripts.min.js
                   .pipe(gulp.dest('assets/js/dist')); // Exporte le fichier
    }
});


// Player scripts
var playerFiles = ['assets/js/src/player/controls.js',
                   'assets/js/src/player/grid.js',
                   'assets/js/src/player/sync.js'];

gulp.task('player', function() {
    if (!config.production) {
        return false;
    } 
    else {  
        return gulp.src(playerFiles)
                   .pipe(concat('player.js'))
                   .pipe(rename({ suffix: '.min' })) // Add suffix
                   .pipe(uglify()) // Uglification (+ minification)
                   .pipe(gulp.dest('assets/js/dist')); // Save the file
    }
});

gulp.task('js-watch', ['scripts', 'player'], function (done) {
    bs.reload();
    done();
});

// Vendors scripts
var vendorsFiles = ['assets/js/src/vendors/history.min.js', 
                    'assets/js/src/vendors/bez.js'];

gulp.task('vendors', function() {  
    return gulp.src(vendorsFiles)
               .pipe(concat('vendors.js'))
               .pipe(rename({ suffix: '.min' })) // Add suffix
               .pipe(uglify()) // Uglification (+ minification)
               .pipe(gulp.dest('assets/js/dist')); // Save the file
});

gulp.task('js', ['scripts', 'player', 'js-watch']);


/* Live-reload
-----------------------------------------*/

// Start browsersync
gulp.task('init-live-reload', function() {
    bs.init({
        // server: { baseDir: './'},
        proxy: "localhost/ethicsfordesign",
        browser: 'google chrome'
    }) });


/* Main tasks
-----------------------------------------*/

// Watch files for changes (--prod will minify CSS && JS)
gulp.task('dev-watch', function() {
    gulp.watch(['assets/css/**/*.scss',], ['css']);
    gulp.watch(['assets/js/src/**/*.js'], ['js']);
    gulp.watch(['!site/accounts/', 'site/**/*.php', 'content/**/*.txt']).on('change', bs.reload);
});

gulp.task('dev-watch-sync', ['init-live-reload', 'dev-watch']);

// Default Task
gulp.task('default', ['css', 'js']);
