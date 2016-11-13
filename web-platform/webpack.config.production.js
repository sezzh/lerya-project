const webpack = require('webpack')
const path = require('path')

var watcherOpts = {
  aggregateTimeout: 300,
  poll: true
}

var webpackOpts = {
  context: path.resolve(__dirname, 'lib/src'),
  // These are the apps from the template system.
  entry: {
    adminlogin: './admin-login-app/index',
    admin: './admin-app/index',
    login: './login-app/index'
  },
  output: {
    path: path.join(__dirname, 'static', 'bin'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}

var compiler = webpack(webpackOpts)

compiler.run((err, stats) => {
  if (err) {
    console.log(err)
  } else {
    console.log(stats.toString({ minimal: true, colors: true }))
    console.log('build done.')
  }
})