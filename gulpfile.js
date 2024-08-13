const path = require('path');
const gulp = require('gulp');
var gulpif = require('gulp-if');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const html = require('gulp-html');
const htmlmin = require('gulp-htmlmin');

console.log(process.env.NODE_ENV);
const isProd = process.env.NODE_ENV === 'production';
console.log(isProd);
console.log(process.env.NODE_ENV === 'production');

const paths = {
	src: path.join(__dirname, 'src'),
	output: path.join(__dirname, 'dist'),
	html: path.join(__dirname, 'public', 'index.html'),
};

function cleanFiles() {
	return gulp.src(paths.output, { read: false }).pipe(clean());
}

function htmlFile() {
	return gulp
		.src(paths.html)
		.pipe(gulpif(isProd, htmlmin({ collapseWhitespace: true })))
		.pipe(gulp.dest(paths.output));
}

gulp.task('default', gulp.series(cleanFiles, htmlFile));
