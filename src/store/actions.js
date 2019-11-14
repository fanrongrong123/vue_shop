import{
  getAddress,
  getCategorys,
  getShops,
  autoLogin
}from '../api'

import {
  SAVE_ADDRESS,
  SAVE_CATEGORYS,
  SAVE_SHOPS,
  SAVE_USER,
  SAVE_TOKEN
} from './mutation-type';

// 1.发送异步请求获取数据
export default{
  async getAddressAction({commit}){
    // 城市经纬度,code是0时,代表接口正确成功获取到了数据
    let result = await getAddress(40.10038,116.36867)
    if (result.code === 0) {
      // 2.调用amutation,将数据交给mutation
      commit(SAVE_ADDRESS,{address:result.data})
    }
  },

  async getCategorysAction({commit}, fn){
    let result = await getCategorys()
    if(result.code === 0){
      commit(SAVE_CATEGORYS, {categorys: result.data})
      typeof fn === 'function' && fn()
    }
  },
  async getShopsAction({commit, state}){
    let result = await getShops(state.latitude, state.longitude)
    if(result.code === 0){
      commit(SAVE_SHOPS, {shops: result.data})
    }
  },
  // async可写可不写,因为是同步
  getUserAction({commit},{user}){
    commit(SAVE_TOKEN,{token:user.token})
    // 删除上一次留下的token
    delete user.token
    commit(SAVE_USER,{user})
   },
   async autoLoginAction({commit}){
    let result = await autoLogin()
    if(result.code === 0){
      commit(SAVE_USER, {user: result.data})
    }
 }
}