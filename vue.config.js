const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

// Generate pages object
const pagesObj = {};

const chromeName = [
  "popup",
  "options",
];

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.js`,
    template: "public/index.html",
    filename: `${name}.html`
  };
});

const manifest =
  process.env.NODE_ENV === "production" ? {
    from: path.resolve("src/manifest.production.json"),
    to: `${path.resolve("dist")}/manifest.json`
  } : {
    from: path.resolve("src/manifest.development.json"),
    to: `${path.resolve("dist")}/manifest.json`
  };

const plugins = [
  CopyWebpackPlugin([manifest])
]

plugins.push(
  CopyWebpackPlugin([{
    from: path.resolve("src/background.js"),
    to: path.resolve("dist/background.js")
  }])
)
// 头像logo
plugins.push(
  CopyWebpackPlugin([{
    from: path.resolve("src/img"),
    to: path.resolve("dist/img")
  }])
)
if (process.env.NODE_ENV === 'production') {
  const ZipPlugin = require('zip-webpack-plugin')
  plugins.push(
    new ZipPlugin({
      path: path.resolve("dist"),
      filename: 'dist.zip',
    })
  )
}
plugins.push(
  CopyWebpackPlugin([{
    from: path.resolve("src/content-script.js"),
    to: path.resolve("dist")
  }])
)
plugins.push(
  CopyWebpackPlugin([{
    from: path.resolve("src/inject.js"),
    to: path.resolve("dist")
  }])
)
plugins.push(
  CopyWebpackPlugin([{
    from: path.resolve(`src/locales/en/messages.json`),
    to: path.resolve(`dist/_locales/en/messages.json`)
  }])
)
plugins.push(
  CopyWebpackPlugin([{
    from: path.resolve(`src/locales/zh_CN/messages.json`),
    to: path.resolve(`dist/_locales/zh_CN/messages.json`)
  }])
)
// 自定义导出打包的js文件
plugins.push(
  CopyWebpackPlugin([{
    from: path.resolve(`src/popup/popup.js`),
    to: path.resolve(`dist`)
  }])
)

module.exports = {
  pages: pagesObj,
  productionSourceMap: false,
  configureWebpack: {
    entry: {
      'content': './src/content/index.js'
    },
    output: {
      filename: 'js/[name].js'
    },
    plugins: plugins,
  },
  css: {
    extract: {
      filename: 'css/[name].css'
    }
  },

  chainWebpack: config => {
    // 处理字体文件名，去除hash值
    const fontsRule = config.module.rule('fonts')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    fontsRule.uses.clear()
    fontsRule.test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url')
      .loader('url-loader')
      .options({
        limit: 1000,
        name: 'fonts/[name].[ext]'
      })

    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  }
};
