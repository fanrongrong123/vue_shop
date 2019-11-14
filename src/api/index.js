import ajax from './ajax'



// 根据经纬度确定城市信息
export const getAddress = (latitude, longitude) => ajax({
  url: `/position/${latitude},${longitude}`
})
 
// 获取食品分类列表
export const getCategorys = () => ajax({
  // 模板字符串拼接路径
  url: `/index_category`,
  headers:{
      needToken:true
  }
})

// 根据经纬度获取商家列表
export const getShops = (latitude, longitude) => ajax({
  url: '/shops',
  params:{
    latitude,
    longitude
  },
    headers:{
      needToken:true
    }
})


// 用户密码登陆
export const loginWithPassword = (name,pwd,captcha) =>ajax({
  url:'/login_pwd',
  method:'POST',
  data:{
    name,
    pwd,
    captcha
  }
})

// 手机号登陆
export const loginWithPhone = (phone,code) =>ajax({
  url:'login_sms',
  method:'POST',
  data:{
    phone,
    code
  }
})

// 发送短信验证码
export const sendCode = phone =>ajax({
  url:'/sendcode',
  params:{
    phone
  }
})

// 自动登陆
export const autoLogin =() =>ajax({
  url:'/auto_login',
  headers:{
    needToken:true
  }
})
// 测试mock数据
export const test =() =>ajax({
  url:'/test1',
 })

 export const getShopDatas =() =>ajax({
  url:'/shopDatas',
 })