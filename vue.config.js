const path = require('path')
const fs = require('fs')
const node_env = process.env.NODE_ENV
const pages = {}

function resolve(dir) {
  return path.join(__dirname, dir)
}
const toHump = (name) => {
  return name.replace(/-(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}
const setMains = () => {
  // 删除mains文件夹下的文件
  const mainsPath = path.resolve(__dirname, './src/mains');
  let isexist = fs.existsSync( mainsPath )
  if (!isexist) {  // 没有则创建
    fs.mkdirSync(mainsPath)
  }
  const mainsFiles = fs.readdirSync(mainsPath);
  mainsFiles.forEach(filename => {
    fs.unlinkSync(path.join(mainsPath, filename))
  })
}

if (node_env === 'production' || node_env === 'yfb') {
  setMains()
  // 创建mains下的文件
  const pagesPath = path.resolve(__dirname, './src/pages')
  const pagesDirs = fs.readdirSync(pagesPath)
  // 读取main.txt文件
  const mainFileData = fs.readFileSync(path.resolve(__dirname, './src/main.js'), "utf-8")
  const each = (dirs, dirname) => {
    dirs.forEach(dir => {
      const dirPath = path.join(dirname, dir)
      const isDir = fs.statSync(dirPath).isDirectory()
      if (isDir && dir !== 'components') {
        const dirs = fs.readdirSync(dirPath)
        each(dirs, dirPath)
      } else {
        if (dir === 'index.vue') {
          let fileContent = mainFileData
          const appPath = dirname.substr(pagesPath.length + 1).replace(/\\/g, '/');
          const storePath = appPath.substr(0, appPath.lastIndexOf('/'));
          const storeName = toHump(storePath.replace(/\//g, '-'));
          // fileContent = fileContent.replace(/\{appPath\}/g, appPath);
          fileContent = fileContent.replace(/@\/App\.vue/g, `@/pages/${appPath}`)
          fileContent = fileContent.replace(/\{storePath\}/g, storePath);
          fileContent = fileContent.replace(/\{storeName\}/g, storeName);
          const fileName = dirname.substr(pagesPath.length + 1).replace(/\\/g, '-') + '.js';
          const filePath = path.join(path.resolve(__dirname, './src/mains'), fileName);
          fs.writeFileSync(filePath, fileContent);
        }
      }
    })
  }
  each(pagesDirs, pagesPath)
  // 构建线上环境
  const mains = fs.readdirSync('./src/mains')
  mains.forEach(main => {
    if (main.indexOf('.js') > -1) {
      const filename = main.replace('.js', '')
      pages[filename] = {
        title: '标题',
        entry: `src/mains/${filename}.js`,
        template: 'public/index.html',
        filename: `${filename}.html`
      }
    }
  })
} else {
  pages['index'] = {
    entry: `src/main.js`
  }
}

module.exports = {
  publicPath: '',
  outputDir: 'dist',
  pages,
  devServer: {
    port: 8888,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/ure': {
        // 目标 API 地址
        target: 'http://192.168.1.96:8080/',
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        /*pathRewrite: {
          '^/hesuan': '/',
        },*/
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can
    // be accessed in index.html to inject the correct title.
    name: 'rmis-jm-fe-config',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/common/components/icon-svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/common/components/icon-svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
  }
}
