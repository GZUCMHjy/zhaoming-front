/*
 * @Author: your name
 * @Date: 2022-03-01 20:17:19
 * @LastEditTime: 2022-03-01 21:37:38
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \light-system\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false

//刷新返回主页面
window.addEventListener('load', function () {
  if(router.history.current.fullPath!='/Home')
  router.replace('/Home')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
