// 对axios进行二次封装
import qs from 'qs'
import axios from 'axios'
import router from '../router'
import {MessageBox} from 'mint-ui'

// 生成一个axios伪实例,它身上有axios实例对象的所有属性,但是不是真实的实例对象
const instance = axios.create({
   baseURL:'/api'
  //baseURL:'http://localhost:4000'

})


// 1.添加请求拦截器
instance.interceptors.request.use(config =>{
  // post请求默认的参数格式时json对象格式,要转换为urlencoding
  if (config.method.toUpperCase() === 'POST' && config.data instanceof Object) {
    config.data = qs.stringify(config.data)
  }

  // 批量添加token
  let token = localStorage.getItem('token_key')
  // 有时不需要携带token,判断是否要携带token
if (config.headers.needToken) {
  if (token) {
    config.headers.authorization = token
  }else{
    throw new Error('没有token,请先登陆')
  }
}
return config
})



// 2.添加响应拦截器
instance.interceptors.response.use(
  response => response.data,
  error => {
    if (!error.response) {   //不发送请求
      // 1.没有token
      MessageBox.alert(error.message)
      router.currentRoute.path !== 'login' && router.replace('/login')
    }else{
      // 2.token过期了
      if (error.response.status === 401) {
        MessageBox.alert('token已过期,请重新登陆')
        router.currentRoute.path !== 'login' && router.replace('/login')
        // 3.请求未找到,404
     }else if(error.response.status === 404){
       MessageBox.alert('请求资源未找到')
      //  4.其他
     }else{
        MessageBox.alert('请求失败')
     }
}


   MessageBox.alert('请求失败')
    return new Promise(() =>{})   //手动返回一个promise的pending初始化状态,确保不会进入下一个成功的回调
  }
)

export default instance