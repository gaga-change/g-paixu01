<template>
  <div id="pageWrapper">
    <!-- top -->
    <div class="fw fixed " style="z-index:39;">
      <!-- 头部 -->
      {{menuSon}}
      <vue-head>
        <span v-text="query.gname"></span><span v-if="query.areaname">/</span>
        <span v-text="query.areaname"></span><span v-if="query.servername">/</span>
        <span v-text="query.servername"></span>
      </vue-head>
      <vue-menu :menu-son="menuSon" @clickMenu="setCheckedSort">
        <span slot="menu-left"><cite v-text="menuSon.checkedSort.name"></cite><img src="/images/down3.png"></span>
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
    name: "SortList",
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
         *    checkedSort <Object> 当前的排序方式
         *    排序方式
         *    sortWay <Array [Object]>
         * }
         */
        menuSon: {checkedSort:{name: ''}},
        /**
         *  所有列表数据
         *    listArray <Array [Object]>
         *        {
         *           name<string>  排序名称
         *           sortMap: {}
         *           items: [] 当前排序下的数据项
         *        }
         * */
        itemMap: null
      }
    },
    watch: {
      menuSon: function (val, oldVal) {
//        console.log("监听menuSon", val, oldVal);
      }
    },
    computed: {

      menuName: function () {
        if (this.menuSon === null) return [''];
        return [this.menuSon.checkedSort.name];
      }
    },
    created: function () {
      var self = this;
      // 保证在set的方法里设置的值必须正确，确保数据源头结构改变时不会动全身
      this.setQuery();
      this.setMenu().then(function () {
        console.log("菜单对象获取完成", self.menuSon);
      });
    },
    components: {
      'vue-head': Head,
      'vue-menu': Menu,
      'vue-list': List
    },
    methods: { // 对数据进行操作的方法只能是get/set方法。异步get/set返回的是promise对象
      /**
       * （同步） 从链接中提取url中“？”后的参数
       * */
      setQuery: function () {
        this.query = this.$route.query;
      },
      /**
       * （异步） 手动配置子菜单
       */
      setMenu: function () {
        var self = this;
        return new Promise(function (resolve, reject) {
          var menuSon = null;
          setTimeout(function () {
            menuSon = {
              checkedSort: {
                name: "默认排序（发布时间排序）",
                sortMap: {
                  create_time: '-'
                }
              },
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
            self.menuSon = menuSon
            resolve();
          }, 1)
        })

      },
      /**
       * 监听菜单组件的点击事件的回调函数
       * @param menuItem 当前点击的菜单项
       */
      setCheckedSort: function (menuItem) {
        console.log(menuItem);
        this.menuSon.checkedSort = menuItem;
//        for (var atr in menuItem) {
//            console.log(menuItem[atr]);
//          this.menuSon.checkedSort[atr] = menuItem[atr];
//        }
//        this.$set(this.menuSon, 'checkedSort',menuItem  )
      },
      /**
       *  （同步） 获取请求列表数据的body参数
       *   来源：
       *       1. url 的参数
       *       2. 所有列表的数据对象，因为里面包含有当前的筛选方式
       *
       */
      getHttpPostListBody: function (page, pageCount) {
        var body = {
          "accurateMap": {
            "game_id": [],
            "goods_type": [],
            "region_id": [],
            "server_id": [],
          },
          "betweenMap": {},
          "keyWordMap": {},
          "page": page || 1,
          "pageCount": pageCount || 6,
          "sortMap": {}
        };
      },
      /**
       * 发送列表请求
       *
       */
      httpPostList: function () {

      },

    }
  }
</script>

<style>
  @import "/css/public.css";
  @import "/css/list.css";
</style>
