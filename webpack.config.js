var path = require('path')
var webpack = require('webpack')
var NpmInstallPlugin = require('npm-install-webpack-plugin')
var autoprefixer = require('autoprefixer')
var precss = require('precss')

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
	devtool: NODE_ENV == 'development' ? 'eval' : 'cheap-module-eval-source-map',

	watch: NODE_ENV == 'development',
	watchOptions: {
		aggregateTimeout: 100
	},

	entry: [
		'webpack-hot-middleware/client',
		'babel-polyfill',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),

		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
			LANG: JSON.stringify('ru')
		})
		//new NpmInstallPlugin()
	],
	resolve: {
		moduleDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
	resolveLoader: {
		modulesDirecrories: ['node_modules'],
		moduleTemplates: ['*-loader', '*'],
		extenstions: ['', 'js']
	},
	module: { //Обновлено
		preLoaders: [ //добавили ESlint в preloaders
			{
				exclude: [
					path.resolve(__dirname, "node_modules"),
					path.resolve(__dirname, "server"),
				],
				test: /\.jsx?$/,
				loaders: ['eslint'],
				include: [
					path.resolve(__dirname, "src"),
				],
			}
		],
		loaders: [ //добавили babel-loader
			{
				exclude: [
					path.resolve(__dirname, "node_modules"),
				],
				loaders: ['babel-loader'],
				include: [
					path.resolve(__dirname, "src"),
				],
				test: /\.jsx?$/,
				plugins: ['transform-runtime'],
			},
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
			}
			// {
			//   test:   /\.(scss|css)$/,
			//   loader: "style-loader!css-loader!postcss-loader"
			// }
		]
	},
	postcss: function() {
		return [autoprefixer, precss];
	},

	// for nich-xlsx because of "Error: Cannot resolve module 'fs'"
	node: {
		fs: "empty",
		__dirname: false,
	},
	externals: [
		{
			'./jszip': 'jszip',
			'./cptable': 'var cptable',
			'Mkdirp': 'mkdirp',
			'Xlsx': 'xlsx'
		}
	]
}


if (NODE_ENV == 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	)
}
