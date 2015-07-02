var gulp = require('gulp'),
    path = require('path'),
    cssmin = require('gulp-cssmin'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    cachebust = require('gulp-cache-bust');



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
gulp.task('fonts', function() {
   gulp.src('public/fonts/**/*.eot')
   .pipe(gulp.dest('./dist/fonts/'));
  gulp.src('public/fonts/**/*.css')
   .pipe(gulp.dest('./dist/fonts/'));
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



// gulp.task('html', function() {
//   var assets = useref.assets();
//   return gulp.src('public/**/*.html')
//     .pipe(assets)
//     .pipe(gulpif('*.js', uglify()))
//     .pipe(assets.restore())
//     .pipe(useref())
//     .pipe(gulp.dest('./dist/'));
// });




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
gulp.task('default', ['css', 'scripts', 'fonts', 'images:copy'],function(){

  return gulp.src('public/**/*.html')
    .pipe(cachebust({type: 'timestamp'}))
         .pipe(minifyHTML())
         .pipe(gulp.dest('./dist/'));
});






