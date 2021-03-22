const { userInfo } = require('os');
const path = require('path');

module.exports = {
    publicPath:
        process.env.NODE_ENV === "production" ? "/PlanningPoker/" : "/",
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/styles/abstracts/_variables.scss"; 
                    @import "@/styles/components/_buttons.scss";
                `,
            }
        }
    },
    chainWebpack: (config) => {
       const oneOfsMap = config.module.rule('scss').oneOfs.store
       oneOfsMap.forEach(item => {
           item
           .use('sass-resources-loadder')
           .loader('sass-resources-loader')
           .options({
               resources: ['./src/styles/main.scss'],
           })
           .end()
       })
    },
    pluginOptions: {
        "style-resource-loader": {
            preProcessor: "scss",
            patterbs: [path.resolve(__dirname, "./src/styles/main.scss")]
        }
    }
}