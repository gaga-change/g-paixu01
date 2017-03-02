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
      <vue-menu></vue-menu>
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
         * @returns {
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
        query: null
      }
    },
    created: function () {

      this.query = this.$route.query;
      console.log(this.query);
    },
    computed: {

      query: function () {
//        console.log("query: ", this.$route.query);
//        return
      }
    },
    components: {
      'vue-head': Head,
      'vue-menu': Menu,
      'vue-list': List
    }
  }
</script>

<style>
  @import "/css/public.css";
  @import "/css/list.css";
</style>
