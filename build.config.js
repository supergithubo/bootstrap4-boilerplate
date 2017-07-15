
module.exports = {

    build_dir: 'build',
    compile_dir: 'pub',

    app_files: {
        js: [ 'src/**/*.js' ],
        html: [ 'src/**/*.html' ],
        entry: [ 'src/index.html' ]
    },
    vendor_files: {
        js: [
            'bower_components/jquery/dist/jquery.slim.js',
            'bower_components/tether/dist/js/tether.js',
            'bower_components/bootstrap/dist/js/bootstrap.js'
        ],
        css: [
            'bower_components/bootstrap/dist/css/bootstrap.css'
        ],
        assets: []
    }
}