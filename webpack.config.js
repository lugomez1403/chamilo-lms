const Encore = require('@symfony/webpack-encore');
const copyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

Encore
    .setOutputPath('public/build/')
    .setManifestKeyPrefix('public/build/')
    // If chamilo is installed in localhost/chamilo2
    .setPublicPath('../')
    // If chamilo is installed in a domain my.chamilo.net
    //.setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    // enable features!
    .enableSassLoader(function(sassOptions) {}, {
         //resolveUrlLoader: false
     })
    .enableLessLoader()
    .autoProvidejQuery() // not needed because in window.jQuery we set the $
    // Reads the "assets/js/vendor.js" file and it will generate the file public/build/vendor.js file
    .addEntry('app', './assets/js/app.js')
    .addEntry('bootstrap', './assets/js/bootstrap.js')
    // Reads app.scss -> output as web/build/css/base.css
    .addStyleEntry('css/app', './assets/css/app.scss')
    //.addStyleEntry('css/bootstrap', './assets/css/bootstrap.scss')

    .addStyleEntry('css/chat', './assets/css/chat.css')
    .addStyleEntry('css/document', './assets/css/document.css')
    .addStyleEntry('css/editor', './assets/css/editor.css')
    .addStyleEntry('css/editor_content', './assets/css/editor_content.css')
    .addStyleEntry('css/markdown', './assets/css/markdown.css')
    .addStyleEntry('css/print', './assets/css/print.css')
    .addStyleEntry('css/responsive', './assets/css/responsive.css')
    .addStyleEntry('css/scorm', './assets/css/scorm.css')

    .addPlugin(new UglifyJsPlugin())
    //.addPlugin(new OptimizeCSSAssetsPlugin())
    .enableSourceMaps(!Encore.isProduction())
    .autoProvideVariables({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    })
    //.enableVersioning() // hashed filenames (e.g. main.abc123.js)
;

var themes = [
    'chamilo'
];

// Add Chamilo themes
themes.forEach(function (theme) {
    Encore.addStyleEntry('css/themes/' + theme + '/default', './assets/css/themes/' + theme + '/default.css');

    // Copy images from themes into public/build
    Encore.addPlugin(new copyWebpackPlugin([{
        from: 'assets/css/themes/' + theme + '/images',
        to: 'css/themes/' + theme + '/images'
    },
    ]));
});

Encore.addPlugin(
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    })
);

var config = Encore.getWebpackConfig();
module.exports = config;
