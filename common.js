"use strict";
const webpack = require('webpack');
const path = require('path');
const glob_copy_webpack_plugin_1 = require('../../plugins/glob-copy-webpack-plugin');
const package_chunk_sort_1 = require('../../utilities/package-chunk-sort');
const base_href_webpack_1 = require('../../lib/base-href-webpack');
const utils_1 = require('./utils');
const autoprefixer = require('autoprefixer');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/**
 * Enumerate loaders and their dependencies from this file to let the dependency validator
 * know they are used.
 *
 * require('source-map-loader')
 * require('raw-loader')
 * require('script-loader')
 * require('json-loader')
 * require('url-loader')
 * require('file-loader')
 */
function getCommonConfig(wco) {
    const { projectRoot, buildOptions, appConfig } = wco;
    const appRoot = path.resolve(projectRoot, appConfig.root);
    const nodeModules = path.resolve(projectRoot, 'node_modules');
    let extraPlugins = [];
    let extraRules = [];
    let entryPoints = {};
    // figure out which are the lazy loaded entry points
    const lazyChunks = utils_1.lazyChunksFilter([
        ...utils_1.extraEntryParser(appConfig.scripts, appRoot, 'scripts'),
        ...utils_1.extraEntryParser(appConfig.styles, appRoot, 'styles')
    ]);
    if (appConfig.main) {
        entryPoints['main'] = [path.resolve(appRoot, appConfig.main)];
    }
    if (appConfig.polyfills) {
        entryPoints['polyfills'] = [path.resolve(appRoot, appConfig.polyfills)];
    }
    // determine hashing format
    const hashFormat = utils_1.getOutputHashFormat(buildOptions.outputHashing);
    // process global scripts
    if (appConfig.scripts.length > 0) {
        const globalScripts = utils_1.extraEntryParser(appConfig.scripts, appRoot, 'scripts');
        // add entry points and lazy chunks
        globalScripts.forEach(script => {
            let scriptPath = `script-loader!${script.path}`;
            if (script.lazy) {
                lazyChunks.push(script.entry);
            }
            entryPoints[script.entry] = (entryPoints[script.entry] || []).concat(scriptPath);
        });
    }
    if (buildOptions.vendorChunk) {
        extraPlugins.push(new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['main'],
            minChunks: (module) => module.resource && module.resource.startsWith(nodeModules)
        }));
    }
    // process asset entries
    if (appConfig.assets) {
        extraPlugins.push(new glob_copy_webpack_plugin_1.GlobCopyWebpackPlugin({
            patterns: appConfig.assets,
            globOptions: { cwd: appRoot, dot: true, ignore: '**/.gitkeep' }
        }));
    }
    if (buildOptions.progress) {
        extraPlugins.push(new ProgressPlugin({ profile: buildOptions.verbose, colors: true }));
    }
    return {
        devtool: buildOptions.sourcemap ? 'source-map' : false,
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [nodeModules],
        },
        resolveLoader: {
            modules: [nodeModules]
        },
        context: projectRoot,
        entry: entryPoints,
        target: 'electron-renderer',
        output: {
            path: path.resolve(projectRoot, buildOptions.outputPath),
            publicPath: buildOptions.deployUrl,
            filename: `[name]${hashFormat.chunk}.bundle.js`,
            sourceMapFilename: `[name]${hashFormat.chunk}.bundle.map`,
            chunkFilename: `[id]${hashFormat.chunk}.chunk.js`
        },
        module: {
            rules: [
                { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader', exclude: [nodeModules] },
                { test: /\.json$/, loader: 'json-loader' },
                { test: /\.node$/, loader: 'node-loader' },
                { test: /\.html$/, loader: 'raw-loader' },
                { test: /\.(eot|svg)$/, loader: `file-loader?name=[name]${hashFormat.file}.[ext]` },
                {
                    test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
                    loader: `url-loader?name=[name]${hashFormat.file}.[ext]&limit=10000`
                }
            ].concat(extraRules)
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(appRoot, appConfig.index),
                filename: path.resolve(buildOptions.outputPath, appConfig.index),
                chunksSortMode: package_chunk_sort_1.packageChunkSort(appConfig),
                excludeChunks: lazyChunks,
                xhtml: true
            }),
            new base_href_webpack_1.BaseHrefWebpackPlugin({
                baseHref: buildOptions.baseHref
            }),
            new webpack.optimize.CommonsChunkPlugin({
                minChunks: Infinity,
                name: 'inline'
            })
        ].concat(extraPlugins),
        node: {
            fs: true,
            global: true,
            crypto: 'empty',
            tls: 'empty',
            net: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
}
exports.getCommonConfig = getCommonConfig;
//# sourceMappingURL=/Users/hansl/Sources/angular-cli/packages/@angular/cli/models/webpack-configs/common.js.map