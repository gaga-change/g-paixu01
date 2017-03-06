<template>
  <div class="list-main content " ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <!-- 列表为空 -->
    <div v-if="checkedItem.list.length == 0 && checkedItem.allLoaded" class="list-main2">
      <!--<div v-if="true" class="list-main2" >-->
      <div class="list-empty" id="list-empty">
        <p><img src="/images/gamelogo.png"></p>
        <span>很抱歉，没有找到商品</span>
        <div class="topc"><a href="javascipt:void(0)">去电脑版看看</a></div>
      </div>
    </div>
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
      </ul>
      <p v-show="checkedItem.loading && !checkedItem.allLoaded " class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span>加载中...</span>
      </p>
    </mt-loadmore>
  </div>
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
        onPost: false,
      }
    },
    watch: {
      checkedSort: function (val, oldVal) {
        var self = this;
        if (val.name.length > 0) {
          this.$nextTick(function () {
            document.body.scrollTop = this.checkedItem.scroll;
          })
        }
        if (val.name.length > 0 && !self.checkedItem.allLoaded && self.checkedItem.list == 0) {
          // 发送第一次请求
          if (self.onPost) return;
          self.onPost = true;
          self.updateBottom().then(function (noData) {
            console.log("子组价内部发的第一次请求");
            self.onPost = false;
            if (noData) {

              self.checkedItem.allLoaded = true;

            } else {
              self.checkedItem.loading = false;
            }
          });
        }
      }
    },
    computed: {
      checkedItem: function () {
        var self = this;
        var checkedItem = null;
        if (self.checkedSort == null || self.itemMap == null) {
          return {list: [], name: ''};
        }
        self.itemMap.map(function (val, index) {
          if (typeof val.allLoaded == 'undefined') {
            self.$set(self.itemMap[index], 'allLoaded', false)
          }
          if (typeof val.scroll == 'undefined') {
            self.$set(self.itemMap[index], 'scroll', 0)
          }
          if (typeof val.loading == 'undefined') {
            self.$set(self.itemMap[index], 'loading', true)
          }
          if (val.name == self.checkedSort.name) {
            checkedItem = val;
          }
        });
        return checkedItem || {list: [], name: ''};
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
      },
      loadTop(){
        let self = this;
        self.updateTop().then(function () {
          self.$refs.loadmore.onTopLoaded();
        })
      },
      handleScroll(){
        let height = document.body.scrollTop;
        this.checkedItem.scroll = height;
      }
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      window.addEventListener('scroll', this.handleScroll);
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
