const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    module: {
      rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        // this will apply to both plain `.js` files
        // AND `<script>` blocks in `.vue` files
        {
            test: /\.js?$/,
            loader: 'babel-loader',
            // Excluding Node Modules files
            exclude: file => (
                /node_modules/.test(file) &&
                !/\.vue\.js/.test(file)
            )
        },
        // this will apply to both plain `.css` files
        // AND `<style>` blocks in `.vue` files
        {
            test: /\.css$/,
            use: [
            'vue-style-loader',
            'css-loader'
            ]
        },
        // this will apply to both plain `.scss` files
        // AND `<style lang="scss">` blocks in `.vue` files
        // webpack.config.js -> module.rules
        {
            test: /\.scss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader',
                // {
                //     loader: 'sass-loader',
                //     options: {
                //     // you can also read from a file, e.g. `variables.scss`
                //     // use `prependData` here if sass-loader version = 8, or
                //     // `data` if sass-loader version < 8
                //         additionalData: `@import "@/styles/variables.scss"; @import "@styles/buttons.scss"`,
                //     }
                // }
                {
                    loader: 'style-resources-loader',
                    options: {
                        patterns: [
                            './src/styles/main.scss',
                        ]
                    }
                }
            ]
        }
      ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
    ]
  }