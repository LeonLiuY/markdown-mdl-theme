var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var path = require('path');

gulp.task('server', function() {
    connect.server({
        livereload: true
    });
});

var aliases = {};

function npmModule(url, file, done) {
    // check if the path was already found and cached
    if (aliases[url]) {
        return done({
            file: aliases[url]
        });
    }
    // look for modules installed through npm
    try {
        if (url.indexOf('$mdl/') === 0) {
            var newPath = path.resolve(require.resolve('gulp'), '../../material-design-lite/src/', url.substr(5));
            aliases[url] = newPath; // cache this request
            return done({
                file: newPath
            });
        } else {
            aliases[url] = url;
            return done({
                file: url
            });
        }
    } catch (e) {
        // if your module could not be found, just return the original url
        aliases[url] = url;
        return done({
            file: url
        });
    }
}

gulp.task('styles', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass({
            importer: npmModule
        }).on('error', sass.logError))
        .pipe(gulp.dest('build/css/')).pipe(connect.reload());
});

gulp.task('static', function() {
    gulp.src('demo/**/*.*').pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('demo/**/*.*', ['static']);
});

gulp.task('default', ['styles', 'server', 'watch']);
