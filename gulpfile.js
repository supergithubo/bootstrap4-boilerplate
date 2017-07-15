/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    del = require('del');
    config = require( './build.config.js' );
    
// clean build and dist dir
gulp.task('clean', function() {
    return del([config.build_dir, config.compile_dir]);
});

// build task
gulp.task('build:views', function() {
    return gulp.src(config.app_files.entry.concat(config.app_files.html)).pipe(gulp.dest(config.build_dir));
});

gulp.task('build:styles', function() {
    return gulp.src(config.vendor_files.css).pipe(gulp.dest(config.build_dir + '/assets'));
});

gulp.task('build:scripts', gulp.parallel(
    function() {
        return gulp.src(config.vendor_files.js).pipe(gulp.dest(config.build_dir + '/assets'));
    },
    function() {
        return gulp.src(config.app_files.js, { base:"src/js" }).pipe(gulp.dest(config.build_dir + '/assets'));
    }
));

// build task group
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
});
