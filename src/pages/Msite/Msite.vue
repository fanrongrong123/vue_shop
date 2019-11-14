<template>
  <section class="msite">
    <!--首页头部-->
    <GshopHeader :title="address.name?address.name:'定位中...'" >
      <template v-slot:right>
        <span  class="header_login">
          <span class="header_login_text">登录|注册</span>
        </span>
      </template>
      <span slot="left" class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </span>
    </GshopHeader>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(category, index) in newCateGorys" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(categoryItem, index) in category" :key="index">
              <div class="food_container">
                <img :src="`https://fuss10.elemecdn.com${categoryItem.image_url}`">
              </div>
              <span>{{categoryItem.title}}</span>
            </a>
          </div>

        </div>
       
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </section>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'  //轮播图效果库
import {mapState} from 'vuex'
import _ from 'lodash'   //数组库
import ShopList from '../../components/ShopList/ShopList'


export default {
    components: {ShopList},
    async mounted(){
     this.$store.dispatch('getAddressAction')
      this.$store.dispatch('getCategorysAction', () => {
       // 方案二： 传递一个callback给action，在调用mutation之后调用callback
        this.$nextTick(() => { //$nextTick代表下次页面全部渲染完毕
          new Swiper('.swiper-container', {
            loop: true,
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      })
   },


    methods: {
      _chunk(target, size){
        if(!Array.isArray(target) || size <=0 || !!!target.length){  //两次取反把当前数据变为纯布尔值,再取反
          return target
        }
        let arr = [...target]
        let result = []
        while (arr.length > size){
          result.push(arr.splice(0, size))
        }
        result.push(arr)
        return result
      }
    },
    computed: {
     ...mapState({
        address: state => state.address,
        categorys: state => state.categorys
      }),
      newCateGorys(){
        return _.chunk(this.categorys, 8)
     }
 },

 
    watch: {
      categorys(){
        // 问题:new swiper时,数据还没有请求回来还没有渲染到页面上,会没有导航点
        // 解决方法是注意new   swiper的时机

        // 方案一: 监视swiper作用元素需要的对象数据上 + $nextTick使用
        // this.$nextTick(() => { //$nextTick代表下次页面全部渲染完毕
        //   new Swiper('.swiper-container', {
        //     loop: true,
        //     pagination: {
        //       el: '.swiper-pagination',
        //     },
        //   })
        // })
      }
    }
  }
</script>


</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            height 100%
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774

</style>

