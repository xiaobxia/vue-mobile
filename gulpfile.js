const gulp = require('gulp');
const replace = require('gulp-replace');
const gulpif = require('gulp-if');
const srcFiles = [
  './src/style/libRaw/*.css'
];
gulp.task('doublepx', function(done){
  gulp.src(srcFiles)
    .pipe(gulpif(true, replace(/['"](\d+)px['"]|\b(\d+)px\b/g, function(pixel) {
      console.log(pixel, '=>', ( parseInt(pixel) * 2 ) + 'px');
      if ( /'|"/.test(pixel) || '0px'=== pixel || '1px' === pixel) {
        return pixel;
      }
      return ( parseInt(pixel) * 2 ) + 'px';
    })))
    .pipe(gulp.dest('./src/style/lib'));
  done();
});
gulp.task('default', ['doublepx']);

