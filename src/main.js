import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import './veevalidate'
import *as API from './api'
import {Button} from 'mint-ui'
import './mock/mockServer'



import router from './router'
import store from './store'
import GshopHeader from './components/GshopHeader/GshopHeader'


Vue.prototype.$API = API

Vue.component('GshopHeader', GshopHeader)
Vue.component(Button.name,Button)
Vue.config.productionTip = false


const vm = new Vue({
  el:'#app',
  components:{App},
  template:'<App/>',
  router, //安装路由
  store, //状态集中管理对象
})




