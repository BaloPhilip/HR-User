var gulp = require('gulp');
var server = require('gulp-server-livereload');



//SERVER
gulp.task('serv', function() {
    gulp.src('./app')
        .pipe(server({
            livereload: false,
            port: 8000,
            open: true
        }));
});
