const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {spawn} = require('child_process')

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src')

// todo failed because of migration.ts
//   changes from build config doesn't work
module.exports = [
    {
        mode: 'development',
        entry: path.resolve(__dirname, './src/main.ts'),
        target: 'electron-main',
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                include: defaultInclude
            }]
        },
        output: {
            path: __dirname + '/dist',
            filename: 'main.js'
        },
        // devtool: 'cheap-source-map',
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            stats: {
                colors: true,
                chunks: false,
                children: false
            },
            before() {
                spawn(
                    'electron',
                    ['.'],
                    {shell: true, env: process.env, stdio: 'inherit'}
                )
                    .on('close', code => process.exit(0))
                    .on('error', spawnError => console.error(spawnError))
            }
        }
    }, {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        target: 'electron-renderer',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
                    include: defaultInclude
                }, {
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
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            })
        ]
    }
]
