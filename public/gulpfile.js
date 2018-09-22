var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var path = require('path');
var notify = require('gulp-notify');
var nunjucksRender = require('gulp-nunjucks-render');

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


// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  })
})

gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss') // Gets all files ending with .scss in scss and children dirs
    .pipe(plumber(plumberErrorHandler))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// NunJucks pages
gulp.task('nunjucks-pages', function () {
  return gulp.src(['pages/*.html'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(nunjucksRender({
      path: ['templates']
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// NunJucks docs
gulp.task('nunjucks-docs', function () {
  return gulp.src(['pages/docs/**/*.html'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(nunjucksRender({
      path: ['templates']
    }))
    .pipe(gulp.dest('docs'))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Watchers
gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch(['templates/**/*.html', 'pages/*.html'], ['nunjucks-pages']);
  gulp.watch(['templates/**/*.html', 'pages/docs/**/*.html'], ['nunjucks-docs']);
  gulp.watch('assets/js/**/*.js', browserSync.reload);
})

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function () {
  return gulp.src('*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// Optimizing Images 
gulp.task('images', function () {
  return gulp.src('assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/assets/images'))
});

// Copying fonts 
gulp.task('fonts', function () {
  return gulp.src('fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

// Copying plugins
gulp.task('plugins', function () {
  return gulp.src('assets/plugins/**/*')
    .pipe(gulp.dest('dist/assets/plugins'))
})

// Cleaning 
gulp.task('clean', function () {
  return del.sync('dist').then(function (cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function () {
  return del.sync(['dist/**/*', '!dist/assets/images', '!dist/assets/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function (callback) {
  runSequence(['nunjucks-pages', 'nunjucks-docs', 'sass', 'browserSync'], 'watch',
    callback
  )
})

gulp.task('build', function (callback) {
  runSequence(
    'clean:dist',
    'sass', ['useref', 'images', 'fonts', 'plugins'],
    callback
  )
})