import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入本地路由组件
import routes from './routes'

// 声明使用扩展库
Vue.use(VueRouter)
  


// 生成路由器用来管理所有路由
const router = new VueRouter({
  mode:'hash',  //将哈希改为history,    区别是hash路由地址带#号,不可以回退,history不带#号可以回退
  routes
})

export default router
