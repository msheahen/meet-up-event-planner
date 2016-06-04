var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var minifyHTML = require('gulp-minify-html');

var jsFiles = 'js/*.js',  
    jsDest = 'dist/js',
	cssFiles = 'css/*.css',
	cssDest = 'dist/css',
	htmlFiles = '*.html',
    htmlDest = 'dist';
	
gulp.task('jshint', function() {
  gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
	
gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(gulp.dest(jsDest))
		.pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('styles', function () {
    gulp.src(cssFiles)
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(cssDest))
    ;
});


// minify new or changed HTML pages
gulp.task('htmlpage', function() {

  gulp.src(htmlFiles)
    .pipe(changed(htmlDest))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDest));
});

gulp.task('default', ['htmlpage', 'scripts', 'styles', 'jshint'], function() {

});