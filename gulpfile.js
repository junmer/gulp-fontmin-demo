var gulp = require('gulp');
var through = require('through2');
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

// function fontminText() {
//     return through.obj(function(file, enc, cb) {
//         function getText() {
//             return through.obj(function(html, htmlEnc, htmlCb) {
//                 file.fontminText = html;
//                 htmlCb();
//                 cb();
//             });
//         }
//         gulp.src('*.html')
//             .pipe(getText());
//     });
// }

gulp.task('fonts', function() {
    return gulp.src('src/font/*.ttf')
        // .pipe(fontminText())
        .pipe(fontmin({
            text: '我去'
        }))
        .pipe(gulp.dest('dest/font'));
});

gulp.task('connect', function() {
    connect.server({
        root: '.'
    });
});

gulp.task('build', ['clean'], function() {
    gulp.start(['html', 'styles', 'fonts']);
});

gulp.task('default', ['connect']);
