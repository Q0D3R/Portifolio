const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
    return src('static/scss/*.scss') // Adjust the path to your SCSS files
        .pipe(sass({
            silenceDeprecations: ['mixed-decls']
        }).on('error', sass.logError))
        .pipe(dest('static/css')); // Adjust the output path as needed
}

function watchFiles() {
    watch('static/scss/**/*.scss', buildStyles); // Watch for changes in SCSS files
}

exports.default = series(buildStyles, watchFiles);