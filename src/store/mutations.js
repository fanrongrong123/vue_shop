// mutations用来修改状态数据,最后返回给state,但是只能同步
// 异步需要用actions
import {
  SAVE_ADDRESS,
  SAVE_CATEGORYS,
  SAVE_SHOPS,
  SAVE_USER,
  SAVE_TOKEN,
  LOGOUT
} from './mutation-type'

export default {
  [SAVE_ADDRESS](state, {address}){
    state.address = address
  },
  [SAVE_CATEGORYS](state, {categorys}){
    state.categorys = categorys
  },
  [SAVE_SHOPS](state, {shops}){
    state.shops = shops
  },
  [SAVE_USER](state, {user}){
    state.user =user
  },
  [SAVE_TOKEN](state, {token}){
    localStorage.setItem('token_key',token)
    state.token = token
  },
  // 移除token
  [LOGOUT](state){
    state.user ={}
    state.token =''
    localStorage.removeItem('token_key')
  },
}
