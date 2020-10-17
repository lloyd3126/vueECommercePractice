module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/vueECommercePractice/'
      : '',

      pages: {
        index: {
          entry: 'src/main.js',
          title: '首頁｜四分之一蛋糕工作室',
        }
      }
  }

