/**
 * Created by Answer1215 on 8/13/2015.
 */
module.exports = {
    app_file: {
        jade_src: './public/**/*.jade',
        js_src: './public/app/**/*.js',
        css_src: './public/css/*.css',
        styl_src: './public/css/*.styl',
        vendor_src: './public/vendor/**/*.js'
    },
    server_file: {
        entry: './server.js',
        jade_src: './server/**/*.jade',
        js_src: './server/**/*.js',
        i18n_json: './server/i18n/*.json'
    },
    build: {
        dir: './build',
        build_public: './build/public',
        build_app: './build/public/app',
        build_server: './build/server',
        build_i18n:'./build/server/i18n',
        build_css: './build/public/css',
        build_vendor: './build/public/vendor'
    }
};