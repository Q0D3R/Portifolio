const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
    return src('scss/*.scss') // Adjust the path to your SCSS files
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('css')); // Adjust the output path as needed
}

function watchFiles() {
    watch('scss/*.scss', buildStyles); // Watch for changes in SCSS files
}

exports.default = series(buildStyles, watchFiles); // Default task to run both build and watch