var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    jade = require('jade');

module.exports = {
    entry: './src/client/bootstrap.ts',
    devtool: "source-map",
    output: {
        path: path.join(__dirname, "dist/client"),
        filename: 'assets/bundle-[hash].js',
        sourceMapFilename: 'assets/[name].map',
        chunkFilename: 'assets/[id].chunk.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /\.jade$/, loader: 'jade' },
            { test: /\.json$/, loader: 'json' },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },

            {
                test: /\.(woff2?|svg|png)$/,
                loader: 'url?limit=10000&name=assets/[hash].font.[ext]'
            },

            {
                test: /\.(ttf|eot|woff)$/,
                loader: 'file?name=assets/[hash].font.[ext]'
            }

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Developer Conference Video Player',
            filename: 'index.html',
            templateContent: function(templateParams, compilation) {
                return jade.compileFile('src/client/index.jade')(templateParams);
            }
        }),
        new ExtractTextPlugin('assets/[name]-[hash].css')
    ]
}