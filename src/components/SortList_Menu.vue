<template>
  <!-- 下拉搜索 -->
  <div class="list-select ">
    <div class="select-main border-bottom">
      <div class="select-left">
        <a href="javascript:;" class="divs" id="divselect2" @click="sortWayShow = !sortWayShow">
          <slot name="menu-left"></slot>
        </a>
      </div>
      <div class="select-right">
        <div id="divselect3">
          <slot name="menu-right"></slot>
        </div>
      </div>
    </div>
    <div v-if="sortWayShow" class="divc showcata2 border-top" style="display: block"
         @click="clickSortWay($event, 'sortWay')">
      <ul>
        <li v-for="(item,index) in menuSon.sortWay"><a href="javascript:;" :data-index="index" v-text="item.name"></a>
        </li>
        <!--<li><a href="javascript:;" selectid="1">热门排序</a></li>-->
        <!--<li><a href="javascript:;" selectid="2">价格从低到高</a></li>-->
        <!--<li><a href="javascript:;" selectid="3">价格从高到底</a></li>-->
      </ul>
      <input name="" type="hidden" value="" id="inputselect2"/>
    </div>
  </div>
</template>

<script>
  export default  {
    props: ['menuSon'],
    data: function () {
      return {
        sortWay: this.menuSon.sortWay,
        sortWayShow: false
      }
    },
    methods: {
      clickSortWay: function (e) {
        this.sortWayShow = false;
        this.clickMenu(this.menuSon.sortWay[e.target.attributes['data-index'].value]);
      },
      clickMenu: function (item) {
        this.$emit('clickMenu', item);
      }
    }

  }
</script>

<style>

</style>
