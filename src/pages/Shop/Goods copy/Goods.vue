<template>
  <div id="goodContainer">
    <div class="leftContainer">
      <ul ref="leftUl" class="navList">
        <li @click="changeNavIndex(index)" class="navItem" :class="{active: navIndex === index}" v-for="(good, index) in goods" :key="index">
          <p>{{good.name}}</p>
        </li>
      </ul>
    </div>
    <div class="rightContainer">
      <ul ref="rightUl">
        <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
              <div class="icon">
                <img width="57" height="57"
                     :src="food.image">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  CartControl组件
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Vue from 'vue'
import {mapState} from 'vuex'
  export default {
    data(){
      return{
        scrollY:0,   //右侧菜单滑动的距离
        tops:[],     //右侧所有li到滑动页面滚动的距离
        num:1,
        test:{

        }
      }
    },
   async mounted(){
     if (this.goods) {
       this._initScroll()
       this._initTops()
     }
   },
   computed: {
     ...mapState({
       goods:state =>state.shop.shopDatas.goods
     }),
    //  计算滑动的值
    navIndex(){
      let {tops,scrollY} = this
      let index = tops.findIndex((top,index) =>scrollY>= top && scrollY < tops[index+1])
      // 判断新的下标不等于旧的下标才能进入判断
      if (this.leftScroll && this.index !== index) {
        this.index = index 
        this.leftScroll.scrollToElement(this.$refs.leftUI.children[idnex],2000)
      }
     return index
    }
   },
  //  左侧
   methods:{
     _initScroll(){
       this.leftScroll = new BScroll('leftContainer',{
         scrollY:ture,  //纵向滑动
         click:true,    //允许点击
       })

      //  右侧
      this.rightScroll = new BScroll('.rightContainer',{
        scrollY:true,  //纵向滑动
        probeType:2,   //probetypex状态有三种,初始值是0,非实时1(类似于节流),实时是2,惯性是3
      })
      // 因为是向上滑动,数值是负数,所以使用Math取绝对值
      this.rightScroll.on('scroll',({x,y}) =>{
        this.scrollY =Math.abs(y)
      })
      // 惯性滑动,当滑动停止时取左侧滑动块最后的值
      this.rightScroll.on('scrollEnd',({x,y}) =>{
        this.scrollY = Math.abs(y)
      })
     },

    //  记录右侧li到滑动页面顶部的距离
    _initTops(){
      let tops = []
      let top = 0
      tops.push(top)
      let lis = Array.from(this.$refs.rightUI.children)
      for (var i = 0; i < lis.length; i++) {
        top += lis[i].clientHeight
        tops.push(top)
        }
        this.tops = tops
    },
    changeNavIndex(index){
     this.scrollY = this.tops[index]
     this.rightScroll.scrollTo(0,-this.scrollY,2000)
     }
},
watch:{
  goods(newValue,oldValue){
    this.$nextTick(() =>{
      // 页面下次全部渲染完成
      this._initScroll()
      this._initTops()
    })
   }
  }
   }
</script>



<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  #goodContainer
    display flex
    overflow hidden
    /*position absolute*/
    /*bottom 0*/
    /*top 224px*/
    height calc(100vh - 224px)  /*vh, vw 1vh == 1%视口高度*/
    .leftContainer
      width 80px
      .navList
        .navItem
          text-align center
          height 40px
          line-height 40px
          p
            width 70px
            margin 0 auto
            bottom-border-1px(rgba(7,17,27,0.1))
    .rightContainer
      width 295px
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
 
</style>
