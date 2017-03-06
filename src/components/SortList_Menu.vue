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
        <li v-for="(item,index) in sortWay"><a href="javascript:void(0);" :data-index="index" v-text="item.name"></a>
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
    props: ['menuSon'],  // 不允许直接操作props中的数据，最好进行深拷贝给自身数据对象
    data: function () {
      return {
        sortWayShow: false
      }
    },
    computed: {
      sortWay: function () {
        return typeof this.menuSon === "object" ? JSON.parse(JSON.stringify(this.menuSon.sortWay)) : {};
      }
    },
    methods: {
      clickSortWay: function (e) {
        this.sortWayShow = false;
        this.clickMenu(this.sortWay[e.target.attributes['data-index'].value]);
      },
      clickMenu: function (item) {
        this.$emit('clickMenu', item);
      }
    }

  }
</script>

<style>

</style>
