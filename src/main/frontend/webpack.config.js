var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './src/index.js'
    ],
    devtool: 'source-map',
    output: {
        path: __dirname + '/../resources/public',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'resources/**/*'},
            {from: 'locales/**/*'},
            {from: 'index.html'}
        ])
    ],
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
        	test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, 
        	loader: "file-loader"
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    }
};
