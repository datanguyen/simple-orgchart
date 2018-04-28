module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: __dirname + '/dist',
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
    contentBase: 'dist',
    host: "localhost",
    port: '3000'
  }
}