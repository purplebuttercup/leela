var gulp = require('gulp');
var localScreenshots = require('gulp-local-screenshots-for-windows');
 
gulp.task('screens', function () {
  gulp.src('./htmls/*.html')
  .pipe(localScreenshots({
    width: ['1920', '720', '480', '320']
   }))
  .pipe(gulp.dest('./images'));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['screens']);