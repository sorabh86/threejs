# Create Webpack project for ThreeJS
Download - [Node.js](https://nodejs.org/en/download/).

1. Make a directory, ex. `myapp`.
2. Run `npm init`, this command create a package.json file.
3. Create sub-folders `src`, `static`, `bundler`.
4. Next to install dependencies.
    - `npm install --save-dev webpack webpack-cli webpack-dev-server webpack-merge three style-loader raw-loader portfinder-sync mini-css-extract-plugin html-webpack-plugin html-loader file-loader css-loader copy-webpack-plugin clean-webpack-plugin babel-loader @babel/preset-env @babel/core`
5. create file `webpack.common.js`, `webpack.dev.js` and `webpack.prod.js` in `./bundler` folder.

## webpack.common.js
```js
// here we configure common settings for webpack
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../src/script.js'),
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true
        }),
        new MiniCSSExtractPlugin()
    ],
    module: {
        rules: [
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            // CSS
            {
                test: /\.css$/,
                use: [ MiniCSSExtractPlugin.loader, 'css-loader' ]
            },
            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'assets/images/' }
                    }
                ]
            },
            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'assets/fonts/' }
                    }
                ]
            }
        ]
    }
}
```
### webpack.dev.js
```js
const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const ip = require('internal-ip')
const portFinderSync = require('portfinder-sync')

const infoColor = (_message) => {
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

module.exports = merge(
    commonConfiguration, {
        mode: 'development',
        devServer: {
            host: '0.0.0.0',
            port: portFinderSync.getPort(8080),
            contentBase: './dist',
            watchContentBase: true,
            open: true,
            https: false,
            useLocalIp: true,
            disableHostCheck: true,
            overlay: true,
            noInfo: true,
            after: function(app, server, compiler) {
                const port = server.options.port
                const https = server.options.https ? 's' : ''
                const localIp = ip.v4.sync()
                const domain1 = `http${https}://${localIp}:${port}`
                const domain2 = `http${https}://localhost:${port}`
                console.log(`Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`)
            }
        }
    }
)
```
### webpack.prod.js
```js
const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(
    commonConfiguration, {
        mode: 'production',
        plugins: [
            new CleanWebpackPlugin()
        ]
    }
)
```
6. Add following lines to `package.json` file.
```json
"scripts": {
    "build": "webpack --config ./bundler/webpack.prod.js",
    "dev": "webpack serve --config ./bundler/webpack.dev.js"
}
```
7. `npm run dev` to run developement server & `npm run build` to build project.