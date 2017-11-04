var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var path = require('path');
var notify = require('gulp-notify');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');

// var cssbeautify = require('gulp-cssbeautify');
// var bulkSass = require('gulp-sass-bulk-import');
// var compass = require('gulp-compass');

path = require('path');

//Autoprefixer
var browser_support = [
    'ie >= 10',
    'ff >= 31',
    'chrome >= 36',
    'safari >= 6',
    'ios >= 6',
    'android >= 4'
];

//the title and icon that will be used for the Grunt notifications
var notifyInfo = {
    title: 'Gulp',
    icon: path.join(__dirname, 'gulp.png')
};

//error notification settings for plumber
var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: notifyInfo.title,
        icon: notifyInfo.icon,
        message: "Error: <%= error.message %>"
    })
};

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('sass', function () {
    gulp.src('scss/**/*.scss')
        .pipe(plumber(plumberErrorHandler))
        // .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(sourcemaps.write('./maps'))
        .pipe(autoprefixer(browser_support))
        // .pipe(cssbeautify())
        .pipe(gulp.dest('assets/css'))
    // .pipe(livereload());
});


function requireUncached( $module ) {
    delete require.cache[require.resolve( $module )];
    return require( $module );
}

gulp.task('nunjucks', function () {
    return gulp.src(['pages/**/*.html', '!pages/layout.html'])
        .pipe(data(function () {
            return requireUncached('./data.json')
        }))
        .pipe(plumber(plumberErrorHandler))
        .pipe(nunjucksRender({
            path: ['templates']
        }))
        .pipe(gulp.dest('./'))
});

// Default
gulp.task('default', ['nunjucks', 'sass', 'browser-sync'], function () {

    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch(['pages/**/*.html', 'templates/**/*.html', './data.json'], ['nunjucks']);

    // gulp.watch(['./*.json'], browserSync.reload);
    gulp.watch(['./*.html'], browserSync.reload);
    gulp.watch(['assets/js/**/*.js'], browserSync.reload);
    gulp.watch(['assets/css/**/*.css'], browserSync.reload);

});