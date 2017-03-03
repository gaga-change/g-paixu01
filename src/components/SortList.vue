<template>
  <div id="pageWrapper">
    <!-- top -->
    <div class="fw fixed " style="z-index:39;">
      <!-- 头部 -->
      <vue-head>
        <span v-text="query.gname"></span><span v-if="query.areaname">/</span>
        <span v-text="query.areaname"></span><span v-if="query.servername">/</span>
        <span v-text="query.servername"></span>
      </vue-head>
      <vue-menu :menu-son="menuSon" @clickMenu="clickMenu">
        <span slot="menu-left"><cite>排序</cite><img src="/images/down3.png"></span>
        <span slot="menu-right"><cite>筛选</cite><img src="/images/filter.png"></span>
      </vue-menu>
    </div>
    <!-- 列表为空 -->
    <div class="list-main2 ">
      <div class="list-empty" id="list-empty">
        <p><img src="/images/gamelogo.png"></p>
        <span>很抱歉，没有找到商品</span>
        <div class="topc"><a href="#">去电脑版看看</a></div>
      </div>
    </div>
    <!-- 商品列表 -->
    <vue-list></vue-list>
    <!-- 存在感 -->
    <div class="czg-float">
      <a href="../phb/Leaderboard.html"></a>
    </div>

  </div>
</template>

<script>
  import Head from './SortList_Head.vue'
  import Menu from './SortList_Menu.vue'
  import List from './SortList_List.vue'
  export default {
    data: function () {
      return {
        /**
         * query对象
         *{
       *  gid<string> 游戏ID
       *  gname<string> 游戏名
       *  areaid<string> 游戏区 ID
       *  areaname<string> 游戏区 名
       *  operatorId<stirng>
       *  operatorName<string>
       *  raceid<string>
       *  racename<string>
       *  racename<string>
       *  serverid<string> 游戏服 ID
       *  servername<string> 游戏服 名
       *  goodsType<Number>
       *  typename<string> 类型名
       *  gameImageUrl<string>
       * }
         */
        query: null,
        /**
         * 子菜单
         * {
         *    排序方式
         *    sortWay <Array [Object]>
         * }
         */
        menuSon: null
      }
    },
    created: function () {
      // 保证在set的方法里设置的值必须正确，确保数据源头结构改变时不会动全身
      this.setQuery();
      this.setMenu();
    },
    components: {
      'vue-head': Head,
      'vue-menu': Menu,
      'vue-list': List
    },
    methods: {
      /**
       * 从链接中提取参数
       * */
      setQuery: function () {
        this.query = this.$route.query;
      },
      /**
       * 手动配置子菜单
       */
      setMenu: function () {
        this.menuSon = {
          sortWay: [
            {
              name: "默认排序（发布时间排序）",
              sortMap: {
                create_time: '-'
              }
            }, {
              name: "热门排序（浏览量高到低）",
              sortMap: {
                browse_count: '-'
              }
            }, {
              name: "价格由高到低",
              sortMap: {
                price: '-'
              }
            }, {
              name: "价格由低到高",
              sortMap: {
                price: '+'
              }
            }]
        }
      },
      clickMenu: function (item) {
        console.log(item);
      }
    }
  }
</script>

<style>
  @import "/css/public.css";
  @import "/css/list.css";
</style>
