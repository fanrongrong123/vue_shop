<template>
<!-- 底部导航栏组件 -->
<!-- 外部foot大容器 -->
  <div id='footerGuideContainer'>
    <!-- 首页 -->
    <div class="guideItem " :class="{active:$route.path === '/msite'}" @click="goPath('/msite')">
      <!-- 图标 -->
    <span>
      <i class='iconfont icon-home'></i>
    </span>
    <span>
      首页
    </span>
  </div>


<!-- 搜索 -->
           <div class="guideItem" :class="{active:$route.path === '/search'}" @click="goPath('/search')">
      <!-- 图标 -->
    <span>
      <i class='iconfont icon-sousuo'></i>
    </span>
    <span>
      搜索
    </span>
  </div>

<!-- 订单 -->
       <div class="guideItem" :class="{active:$route.path === '/order'}"  @click="goPath('/order')">
      <!-- 图标 -->
    <span>
      <i class='iconfont icon-dingdan'></i>
    </span>
    <span>
      订单
    </span>
  </div>


<!-- 我的 -->
       <div class="guideItem" :class="{active:$route.path === '/profile'}" @click="goPath('/profile')">
      <!-- 图标 -->
    <span>
      <i class='iconfont icon-wode'></i>
    </span>
    <span>
      我的
    </span>
  </div>
  </div>
</template>



<script type="text/ecmascript-6">
  export default {
    methods:{
      goPath(path){
        // 判断如果已经是当前路径就不跳转,避免报错
        // router是路由器对象,包含了跳转方法.route是路由信息对象.包含了当前路由的所有路由信息
        this.$route.path !== path && this.$router.replace(path)
      }
    }
  }
</script>




<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
  #footerGuideContainer
    position fixed
    left 0
    bottom 0
    width 100%
    height 50px
    border-top 1px solid #eee
    box-sizing border-box
    display flex
    background #fff
    .guideItem
      width 25%
      height 100%
      text-align center
      display flex
      flex-direction column
      span
        i
          font-size 22px
        &:first-child
          margin 6px 0


      &.active
        color $green
 
</style>
