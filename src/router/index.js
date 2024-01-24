/*
 * @Author: your name
 * @Date: 2022-03-01 20:17:19
 * @LastEditTime: 2022-03-01 21:35:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \light-system\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login'
import {getItem} from '@/utils/storage'
import {judgeToken} from '@/api/users'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    children: [{
      path: '/Home',
      name: 'changebg',
      meta: {
          title: '修改轮播图',
      },
      component: () =>
          import ( /* webpackChunkName: "about" */ '../views/body/change/changebg.vue')
    },{
      path: '/class',
      name: 'class',
      meta: {
          title: '修改灯类',
      },
      component: () =>
          import ( /* webpackChunkName: "about" */ '../views/body/change/changeclass.vue')
      },{
        path: '/variety',
        name: 'variety',
        meta: {
            title: '修改品名',
        },
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/body/change/changeshow2.vue')
      },{
      path: '/show',
      name: 'show',
      meta: {
          title: '修改展品',
      },
      component: () =>
          import ( /* webpackChunkName: "about" */ '../views/body/change/changeshow.vue')
    },{
      path: '/search',
      name: 'search',
      meta: {
          title: '搜索展品',
      },
      component: () =>
          import ( /* webpackChunkName: "about" */ '../views/body/change/searchmodel.vue')
    }]
  },
]

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  base:'/zhaoming',
  routes
})

router.beforeEach((to,from,next)=>{
    if(to.path == '/'){
      next()
    }else{
      judgeToken(getItem('token')).then((res)=>{
        if(res ===true){
          next()
        }else{
          next({
            path:'/'
          })
        }
      }).catch((err)=>{
         console.log(err)
      })
    }
})


export default router
