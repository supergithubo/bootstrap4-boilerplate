/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    del = require('del'),
    livereload = require('gulp-livereload'),
    merge = require('merge-stream'),
    sass = require('gulp-sass'),
    config = require('./build.config.js');
    
// clean build and dist dir
gulp.task('clean', function() {
    return del([config.build_dir, config.compile_dir]);
});

// build task
gulp.task('build:views', function() {
    var app_entry = gulp.src(config.app_files.entry)
        .pipe(gulp.dest(config.build_dir))
        .pipe(livereload());
    var app_html = gulp.src(config.app_files.html)
        .pipe(gulp.dest(config.build_dir))
        .pipe(livereload());
    return merge(app_entry, app_html);
});

gulp.task('build:styles', function () {
    return gulp.src(config.app_files.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.build_dir + '/assets'))
        .pipe(livereload());
});

gulp.task('build:scripts', function() {
    var vendor_js = gulp.src(config.vendor_files.js)
        .pipe(gulp.dest(config.build_dir + '/assets'));
    var app_js =  gulp.src(config.app_files.js, { base:"src/js" })
        .pipe(gulp.dest(config.build_dir + '/assets'))
        .pipe(livereload());
    return merge(vendor_js, app_js);
});

gulp.task('build', 
    gulp.series(
        'clean', 
        gulp.series([
            'build:scripts',
            'build:styles',
            'build:views'
        ])
    ), function(done) {
        done();
    }
);

// livereload
gulp.task('watch', function() {
    livereload.listen();
    var views = config.app_files.entry.concat(config.app_files.html);
    var styles = config.vendor_files.css.concat(config.app_files.scss);
    var scripts = config.vendor_files.js.concat(config.app_files.js);
    var watcher = gulp.watch(views.concat(styles).concat(scripts));
    watcher.on('all', gulp.series(['build']));
});

// help
gulp.task('help', function(done) {
    console.log('');
    console.log('gulp' + ' ' + 'clean' + '                 ' + '# Clean files.');
    console.log('gulp' + ' ' + 'build' + '                 ' + '# Build files.');
    console.log('gulp' + ' ' + 'watch' + '                 ' + '# Watch files.');
    console.log('');
    done();
});