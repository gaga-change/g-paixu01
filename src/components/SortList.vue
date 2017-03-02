<template>
  <div id="pageWrapper">
    <!-- top -->
    <div class="fw fixed " style="z-index:39;">
      <vue-head></vue-head>
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
