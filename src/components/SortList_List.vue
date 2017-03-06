<template>

  <div class="list-main content " ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <mt-loadmore
      :top-method="loadTop"
      ref="loadmore"
    >
      <ul class="lists"
           v-infinite-scroll="loadBottom"
           infinite-scroll-disabled="checkedItem.loading"
           infinite-scroll-distance="0"
           :infinite-scroll-immediate-check="true"
      >
        <a href="#" v-for="(item,index) in checkedItem.list">
          <!--<p v-if="index == 1">{{item}}</p>-->
          <div class="pro-list">
            <div class="pro-pic">
              <img src="/images/p13.png">
              <div class="pro-cata">号</div>
            </div>
            <div class="pro-title">
              <p class="title3" v-text="item.title"></p>
              <p class="price3">
                ￥492
                <em>浏览 1252</em>
                <i class="axm">安心买</i>
                <i class="mobPro">M站商品</i>
                <i class="ji f22">寄</i>
                <i class="dan f22">担</i>
              </p>
            </div>
          </div>
          <div style="clear: both"></div>
        </a>
        <!--<p v-show="true " class="page-infinite-loading">-->
      </ul>
      <p v-show="checkedItem.loading && !checkedItem.allLoaded " class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span>加载中...</span>
      </p>
      <!--
        loading = true; 再发送请求     显示
        loading = false; 发送请求结束  不显示

        allLoaded = false 数据没完    显示
        allLoaded = true 数据完了     不显示

      -->
      <!--{{checkedItem.loading && !checkedItem.allLoaded }}-->
    </mt-loadmore>
  </div>
  <!--
  <div>
    <div style="height: 200px;background-color: #5dc4a1"></div>
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore
        :top-method="loadTop"
        ref="loadmore"
      >
        <ul class="page-infinite-list"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="500">
          <li v-for="item in list" class="page-infinite-listitem">{{ item }}</li>
        </ul>
        <p v-show="loading" class="page-infinite-loading">
          <mt-spinner v-if="!allLoaded" type="fading-circle"></mt-spinner>

          <span v-if="!allLoaded">加载中...</span>
          <span v-if="allLoaded">加载结束</span>
        </p>

      </mt-loadmore>
    </div>
  </div>
-->
</template>

<script>

  import Vue from 'vue'
  import {Loadmore, InfiniteScroll, Spinner} from 'mint-ui';
  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Spinner.name, Spinner);
  Vue.use(InfiniteScroll);

  export default {
    props: ['checkedSort', 'itemMap', 'updateTop', 'updateBottom', 'initFinish'],
    data: function () {
      return {
        listCheckedSort: this.checkedSort,
        listItemMap: this.itemMap,
        list: [],
        wrapperHeight: 0,
        onPost: false
//        loading: false,
      }
    },
    created: function () {
      this.itemMap.map(function (v) {
        console.log(v)
      })
    },

    computed: {
      checkedItem: function () {
        var self = this;
        var checkedItem = null;
        if (self.checkedSort == null || self.itemMap == null) {
          return {list: [], name: '', allLoaded: false};
        }
        self.itemMap.map(function (val, index) {
          if (typeof val.allLoaded == 'undefined') {
            self.$set(self.itemMap[index], 'allLoaded', false)
          }
          if (typeof val.loading == 'undefined') {
            self.$set(self.itemMap[index], 'loading', false)
          }
          if (val.name == self.checkedSort.name) {
            checkedItem = val;
          }
        });
        return checkedItem || {list: [], name: '', allLoaded: false};
      }
    },
    methods: {
      loadBottom() {
        const self = this;
        if (self.checkedItem.name === '')return;
        if (self.onPost) return;
        self.onPost = true;
        this.checkedItem.loading = true;
        this.updateBottom().then(function (noData) {
          self.onPost = false;
          console.log("子组价内部发的请求");
          if (noData) {
            self.checkedItem.allLoaded = true;
          } else {
            self.checkedItem.loading = false;
          }
        })
//
//        setTimeout(function () {
//          if (self.list.length >= 50) {
//            console.log(" 结束");
//            self.checkedItem.allLoaded = true;
//            return;
//          }
//
//          let last = self.list[self.list.length - 1];
//          for (let i = 1; i <= 10; i++) {
//            self.list.push(last + i);
//          }
//          self.loading = false;
//        }, 500);
      },
      loadTop(){
        let self = this;
        self.updateTop().then(function () {
          self.$refs.loadmore.onTopLoaded();
        })
      }
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }

  }
</script>
<style>
  .page-infinite-loading {
    float: left;
    margin-top: -1em;
    height: 50px;
    width: 100%;
    line-height: 50px;
    text-align: center;

  }

  /*和 scoped 冲突*/
  .page-infinite-loading div {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
</style>
