<template>
  <div id="pageWrapper">

    <!-- top -->
    <div class="fw fixed " style="z-index:39;">
      <!-- 头部 -->
      <button @click="updataTop()">TOP 更新</button>
      <button @click="updataBottom()">Bottom 追加</button>
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
  import Vue from 'vue'
  import VueRousource from 'vue-resource'
  import Head from './SortList_Head.vue'
  import Menu from './SortList_Menu.vue'
  import List from './SortList_List.vue'
  Vue.use(VueRousource);
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
        menuSon: {checkedSort: {name: ''}},
        /**
         *  所有列表数据
         *    listArray <Array [Object]>
         *        {
         *           name<string>  排序名称
         *           sortMap: {}
         *           items: [] 当前排序下的数据项
         *        }
         * */
        itemMap: []
      }
    },
    created: function () {
      var self = this;
      // 保证在set的方法里设置的值必须正确，确保数据源头结构改变时不会动全身
      this.setQuery();
      this.setMenu().then(function () {
        console.log("菜单对象获取完成", self.menuSon);
        self.updataBottom()
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
       * 自动获取改变的菜单项
       * @param menuItem 当前点击的菜单项
       */
      setCheckedSort: function (menuItem) {
        console.log(menuItem);
        this.menuSon.checkedSort = menuItem;
        this.updataTop();
      },

      /**
       *  （同步） 获取请求列表数据的body参数
       *   来源：
       *       1. url 的参数
       *       2. 所有列表的数据对象，因为里面包含有当前的筛选方式
       *
       */
      _getHttpPostListUpdata: function (way) {
//        * 参数一 ：top/bottom  参数二 ： 保留
//        * 先获取到选中菜单
//        * 根据选中的菜单找到数组中存放数据的对象，如果不存在则创建,改方式为bottom
//        * 根据数据对象，判定page和pageCount的值,如果为 top，设 0和 1
//        * 根据当前的资料，凑成一个 body
//        * 根据这个body,调用post请求方法，获取数据
//        * 把数据合并到当前的数据对象的数组中
//        * bottom
//        * 	追加到后面，如果重复，不消除重复。但页内显示。功能待定
//        * top
//        * 	追加到前面，如果有缺失，不消除列表数据，正常显示。功能待定
//        * 返回一个 promise
        var self = this;
        if (!way) way = 'bottom';
        var checkedSort = self.menuSon.checkedSort;
        var itemMapNow = null; // 表示当前需要显示的数据的对象
        self.itemMap.map(function (val, index) {
          if (val.name == checkedSort.name)
            itemMapNow = val;
        })
        if (!itemMapNow) { // 没缓存
          way = "bottom"
          itemMapNow = JSON.parse(JSON.stringify(checkedSort));
          self.itemMap.push(itemMapNow);
        }
        var body = {
          "accurateMap": {
            "goods_type": ["2"],
            "game_id": ["YX16053120241378200001"],
            "server_id": ["YXF16053120333100500020"],
            "region_id": ["YXQ16053120274791000015"]
          }, "keyWordMap": {}, "betweenMap": {}, "page": 1, "pageCount": 20, "sortMap": {"goods_source_type": "+"}
        };
        var url = "/api//mobile-goodsSearch-service/rs/goodsSearch/goodsSearchList";
        this.httpPost(url, body).then(function (res) {
          console.log("------start------- \n 请求方式:", way, "\n 数据对象:", res, "---------end-------- \n");
        })
      },

      /**
       * （异步）发送POST 请求
       *
       */
      httpPost: function (url, body) {
        return this.$http.post(url, body)
      },

      /**
       * 下拉更新
       */
      updataTop: function () {
        console.log('top')
        return this._getHttpPostListUpdata('top');
      },

      /**
       * 追加数据
       */
      updataBottom: function () {
        console.log('bottom')
        return this._getHttpPostListUpdata('bottom');
      }
    }
  }
</script>

<style>
  @import "/css/public.css";
  @import "/css/list.css";
</style>
