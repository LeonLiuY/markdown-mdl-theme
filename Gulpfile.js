var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

gulp.task('server', function(){
    connect.server({
        livereload: true
    });
});


gulp.task('styles', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css/')).pipe(connect.reload());
});

gulp.task('static', function(){
    gulp.src('demo/**/*.*').pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('demo/**/*.*', ['static']);
});

gulp.task('default', ['styles', 'server', 'watch']);
