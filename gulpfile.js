/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    del = require('del'),
    livereload = require('gulp-livereload'),
    merge = require('merge-stream'),
    config = require('./build.config.js');
    
// clean build and dist dir
gulp.task('clean', function() {
    return del([config.build_dir, config.compile_dir]);
});

// build task
gulp.task('build:views', function() {
    var app_files = gulp.src(config.app_files.entry.concat(config.app_files.html))
        .pipe(gulp.dest(config.build_dir))
        .pipe(livereload());
    return app_files;
});

gulp.task('build:styles', function() {
    var vendor_files = gulp.src(config.vendor_files.css)
        .pipe(gulp.dest(config.build_dir + '/assets'))
        .pipe(livereload());
    return vendor_files;
});

gulp.task('build:scripts', function() {
    var vendor_files = gulp.src(config.vendor_files.js)
        .pipe(gulp.dest(config.build_dir + '/assets'))
        .pipe(livereload());
    var app_files =  gulp.src(config.app_files.js, { base:"src/js" })
        .pipe(gulp.dest(config.build_dir + '/assets'))
        .pipe(livereload());
    return merge(vendor_files, app_files);
});

gulp.task('build', 
    gulp.series(
        'clean', 
        gulp.parallel([
            'build:views', 
            'build:styles',
            'build:scripts'
        ])
    ), function(done) {
        done();
    }
);

// livereload
gulp.task('watch', function() {
    livereload.listen();
    var views = config.app_files.entry.concat(config.app_files.html);
    var styles = config.vendor_files.css;
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