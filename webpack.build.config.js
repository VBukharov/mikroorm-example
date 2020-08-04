const webpack = require('webpack')
const path = require('path')
const { EnvironmentPlugin, IgnorePlugin } = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin');

// Part of the webpack configuration was copied from
// https://mikro-orm.io/docs/deployment/#webpack-configuration

// Mark our dev dependencies as externals so they don't get included in the webpack bundle.
const { devDependencies } = require('./package.json');
const externals = {};

for (const devDependency of Object.keys(devDependencies)) {
    externals[devDependency] = `commonjs ${devDependency}`;
}

// And anything MikroORM's packaging can be ignored if it's not on disk.
// Later we check these dynamically and tell webpack to ignore the ones we don't have.
const optionalModules = new Set([
    ...Object.keys(require('knex/package.json').browser),
    ...Object.keys(require('mikro-orm/package.json').peerDependencies),
    ...Object.keys(require('mikro-orm/package.json').devDependencies)
]);


// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src')

module.exports = [
    // electron entry point
    {
        mode: 'production',
        entry: path.resolve(__dirname, './src/main.ts'),
        target: 'electron-main',
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        // We want to minify the bundle, but don't want Terser to change the names of our entity
                        // classes. This can be controlled in a more granular way if needed, (see
                        // https://terser.org/docs/api-reference.html#mangle-options) but the safest default
                        // config is that we simply disable mangling altogether but allow minification to proceed.
                        mangle: false,
                    }
                })
            ]
        },
        module: {
            rules: [
                // We do not want ts-morph bundled up in the application, as it drags in typescript,
                // which is huge. We are not using either of these at runtime, but they can't be
                // ignored using IgnorePlugin because Mikro still requires them, and this causes an error
                // at runtime. Packaging them with the null-loader allows them to be required without erroring
                // then simply be swapped with null at runtime.
                {
                    test: /(TsMorphMetadataProvider|ts-morph)/,
                    loader: 'null-loader',
                },

                // Bring in our typescript files.
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader',
                },

                // Native modules can be bundled as well.
                {
                    test: /\.node$/,
                    use: 'node-loader',
                },

                // Some of MikroORM's dependencies use mjs files, so let's set them up here.
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto',
                }
            ]
        },
        externals,
        plugins: [
            // Ignore any of our optional modules if they aren't installed.
            // This ignores database drivers that we aren't using for example.
            new EnvironmentPlugin({ WEBPACK: true }),
            new IgnorePlugin({
                checkResource: resource => {
                    const [baseResource] = resource.split('/');

                    if (optionalModules.has(baseResource)) {
                        try {
                            require.resolve(resource);
                            return false;
                        } catch {
                            return true;
                        }
                    }

                    return false;
                },
            })
        ],
        resolve: {
            extensions: ['.ts', '.js']
        },
        output: {
            path: __dirname + '/dist',
            filename: 'main.js'
        }
    },
    // app entry point
    {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        target: 'electron-renderer',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ],
                    include: defaultInclude
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    include: defaultInclude
                },
                {
                    test: /\.(jpe?g|png|gif)$/,
                    use: [{loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]'}],
                    include: defaultInclude
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    use: [{loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]'}],
                    include: defaultInclude
                }
            ]
        },
        // todo https://github.com/mapbox/node-sqlite3/issues/698#issuecomment-364927002
        externals: {
            sqlite3: 'commonjs sqlite3',
            knex: 'commonjs knex',
            "mikro-orm": 'commonjs mikro-orm'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            modules: [
                path.resolve(__dirname, 'node_modules'),
                'node_modules'
            ]
        },
        output: {
            path: __dirname + '/dist',
            filename: 'index.js'
        },
        plugins: [
            new HtmlWebpackPlugin(),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'bundle.css',
                chunkFilename: '[id].css'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new BabiliPlugin()
        ],
        stats: {
            colors: true,
            children: false,
            chunks: false,
            modules: false
        }
    }
]
