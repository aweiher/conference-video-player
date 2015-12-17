module.exports = {
    entry: './src/client/scripts/app.ts',
    output: {
        filename: 'dist/client/js/bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}