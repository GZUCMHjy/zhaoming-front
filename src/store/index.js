import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem, removeToken } from '@/utils/storage.js'
import { login } from '@/api/users'

Vue.use(Vuex)

export default new Vuex.Store({
    //state数据
    state: { 
        tokenInfo: getItem('token') || {},
    },
    // Vuex 中的 mutations 非常类似于事件，每个 mutations 都有一个字符串的事件类型(type)和一个回调函数(handler)
    // ，也可以理解为{type:handler()}，这和订阅发布有点类似。先注册事件，当触发响应类型的时候调用handker()，
    // 调用type的时候需要用到store.commit方法。
    mutations: {
        SET_TOKEN: (state, token) => {   
            state.tokenInfo = token
        },
    },
    actions: {
        login({ commit }, userInfo) {   
            const { username, password } = userInfo  
            return new Promise((resolve, reject) => {   
                login({ managerName: username, managerPassword: password }).then(response => {
                    if (response.status == 200) {     
                        setItem('token', response.token) //浏览器保存
                        commit('SET_TOKEN', response.token) //vuex保存     
                        resolve() //返回成功
                    } else {
                        removeToken('token') //去除token
                        commit('SET_TOKEN', "") //vuex置空
                        reject(response)
                    }    
                })    .catch(error => { reject(error) })  
            }) 
        }
    },
    modules: {}
})