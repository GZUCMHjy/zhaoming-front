/*
 * @Author: your name
 * @Date: 2022-03-01 20:17:19
 * @LastEditTime: 2022-03-01 21:51:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \light-system\vue.config.js
 */
module.exports={
  devServer: {
    // 代理
    proxy: {
      '/': {
        // target: 'https://www.gaopaizm.com/',
        // target: 'https://www.gaopaizm.com',
        target: 'http://42.193.201.114:8086/',
        changeOrigin: true,
        pathRewrite:{
          '':'',
        }

      },
      
    }
  }
}