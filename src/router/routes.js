import Msite from '../pages/Msite/Msite'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import  Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import Goods from '../pages/Shop/Goods/Goods'
import Info from '../pages/Shop/Info/Info'
import Rating from '../pages/Shop/Rating/Rating'

// 专门放置路由信息
export default[
  // path  路由路径
  // component 路由组件
  {
    path:'/msite',
    component:Msite,
    meta:{  //meta用法:动态显示隐藏页面,传多个键值对,隐式传参,缺点:不能动态传参
      isShowFooterGuide:true
    }
  },
  {
    path:'/search',
    component:Search,
    meta:{
      isShowFooterGuide:true
    }
  },
  {
    path:'/order',
    component:Order,
    meta:{
      isShowFooterGuide:true
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta:{
      isShowFooterGuide:true
    }
  },
  {
    path:'/login',
    component:Login,
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: Goods
      },
      {
        path: 'rating',
        component: Rating
      },
      {
        path: '/shop/info',
        component: Info
      },
      {
        path: '/shop',
        redirect: '/shop/goods'
      },
    ]
  },
  //重定向,设置msite组件为初始的页面
  {
    path:'/',
    redirect:'/msite',
   }
  ]