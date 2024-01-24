/*
 * @Author: your name
 * @Date: 2022-03-01 20:17:19
 * @LastEditTime: 2022-03-01 21:49:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \light-system\src\utils\request.js
 */
import axios from "axios";
import store from '@/store/index'

// 创建axios 实例
const service = axios.create({
    timeout: 2000 // 请求超时时间
});

service.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// request 拦截器
service.interceptors.request.use(
  config => {
      let token = store.state.tokenInfo
    if (token) {
      config.headers.token = token
    } 
    // 这里可以自定义一些config 配置
    return config;
  },
  error => {
    //  这里处理一些请求出错的情况
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 这里处理一些response 正常放回时的逻辑
    return res;
  },
  error => {
    // 这里处理一些response 出错时的逻辑
    return Promise.reject(error);
  }
);

export default service;