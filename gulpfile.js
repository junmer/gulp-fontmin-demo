var gulp = require('gulp');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var connect = require('gulp-connect');
var fontmin = require('gulp-fontmin');

gulp.task('clean', function() {
    return gulp.src('dest', {
            read: false
        })
        .pipe(clean());
});

gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(replace(/src/g, 'dest'))
        .pipe(rename({
            suffix: '-min',
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('styles', function() {
    return gulp.src('src/css/*.css')
        .pipe(gulp.dest('dest/css'));
});

function minifyFont(text, cb) {
    gulp
        .src('src/font/*.ttf')
        .pipe(fontmin({
            text: text
        }))
        .pipe(gulp.dest('dest/font'));
}

gulp.task('fonts', function(cb) {

    var buffers = [];

    gulp
        .src('index.html')
        .on('data', function(file) {
            buffers.push(file.contents);
        })
        .on('end', function() {
            var text = Buffer.concat(buffers).toString('utf-8');
            minifyFont(text, cb);
        });

});


gulp.task('connect', function() {
    connect.server({
        root: '.'
    });
});

gulp.task('build', ['clean'], function() {
    gulp.start(['styles', 'html', 'fonts']);
});

gulp.task('default', ['connect']);
