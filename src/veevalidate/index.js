// 安装vee-validate包,用于手机号验证码校验

import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN',{
  messages:zh_CN.messages,
  attributes:{
    phone:'手机号',
    code:'验证码',
    username:'用户名',
    pwd:'密码',
    captcha:'图形验证码'
  }
})


// 手机号正则验证
VeeValidate.Validator.extend('phone',{
  validate:value =>{
    return /^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
  },
  getMessage:field =>field + '手机号必须是11位'
})

// 验证码正则验证
VeeValidate.Validator.extend('code',{
  validate:value =>{
    return /^\d{4,6}$/.test(value)
  },
  getMessage:field =>field + '验证码必须是4-6位数字'
})