module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }]
    },
    devServer: {
        contentBase: 'public',
        host: "localhost",
        port: '3000'
    }
};