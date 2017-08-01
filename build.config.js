
module.exports = {

    build_dir: 'build',
    compile_dir: 'pub',

    app_files: {
        js: [ 'src/**/*.js' ],
        scss: [ 'src/scss/*.scss' ],
        html: [ 'src/**/*.html' ],
        entry: [ 'src/index.html' ],
        assets: [ 'src/assets/**' ]
    },
    vendor_files: {
        js: [
            'node_modules/jquery/dist/jquery.slim.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/popper.js/dist/umd/popper.js'
        ],
        css: [],
        assets: []
    }
}