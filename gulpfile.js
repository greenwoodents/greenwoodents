var gulp = require('gulp'),
    path = require('path'),
    cssmin = require('gulp-cssmin'),
    del = require('del');
    imagemin = require('gulp-imagemin');
    pngquant = require('imagemin-pngquant');
    uglify = require('gulp-uglify');
    minifyHTML = require('gulp-minify-html');

gulp.task('css', function() {
   gulp.src('public/css/style.css')
   .pipe(cssmin())
   .pipe(gulp.dest('./dist/css/'));
});
gulp.task('scripts', function() {
   gulp.src('public/js/**/*.js')
   .pipe(uglify())
   .pipe(gulp.dest('./dist/js/'));
});
gulp.task('html', function() {
   gulp.src('public/**/*.html')
   .pipe(minifyHTML())
   .pipe(gulp.dest('./dist/'));
});
gulp.task('images', function(cb) {
  gulp.src('source/**/*.{png,jpg,jpeg,ico,svg}')
  .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
  }))
  .pipe(gulp.dest('./source/'));
});


//clean
gulp.task('clean', function (cb) {
  del([
    'dist/**/*',
  ], cb);
});

gulp.task('images:copy', function() {
   gulp.src('public/**/*.{png,jpg,jpeg,ico,svg}')
   .pipe(gulp.dest('./dist/'));
});
//default
gulp.task('default', ['css', 'scripts', 'html', 'images:copy']);






