var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var path = require('path');
var notify = require('gulp-notify');
var headerfooter = require('gulp-headerfooter');

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
var plumberErrorHandler = { errorHandler: notify.onError({
        title: notifyInfo.title,
        icon: notifyInfo.icon,
        message: "Error: <%= error.message %>"
    })
};


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('sass', function() {
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

gulp.task('master', function () {
    gulp.src('content/*.html')
        .pipe(headerfooter.header('master/header.html'))
        .pipe(headerfooter.footer('master/footer.html'))
        .pipe(gulp.dest('./'))
});


// Default
gulp.task('default', ['master', 'sass', 'browser-sync'], function() {  
      
    
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('master/**/*.html',['master']);
    gulp.watch('content/**/*.html',['master']);

    gulp.watch(['./*.html'], browserSync.reload);
    gulp.watch(['assets/js/**/*.js'], browserSync.reload);
    gulp.watch(['assets/css/**/*.css'], browserSync.reload); 
    
});