<template>
  <div class="czg-float" style="right: .125rem;" v-if="showGoTop">
    <a @click="goBack()" href="javascipt:void(0);" style="background-image: url('/images/totop.png')"></a>
  </div>
</template>

<script>
  export default{
    data: function () {
      return {
        showGoTop: false
      }
    },
    created: function () {
      var slef = this;
      //绑定一个滚动条事件
      window.onscroll = goTop;
      //回到首页的函数
      function goTop() {
        var heighs = document.documentElement.scrollTop || document.body.scrollTop;
        if (heighs < 686) {
          slef.showGoTop = false;
        } else {
          slef.showGoTop = true;
        }
      }
    },
    methods: {
      goBack: function () {
        var tep = 0;
        var heighs = document.documentElement.scrollTop || document.body.scrollTop;
        tep = heighs / 50;
        var inteval = setInterval(function () {
          var heighs = document.documentElement.scrollTop || document.body.scrollTop;
          if (heighs < 3) {
            clearInterval(inteval);
          }
          if (document.documentElement.scrollTop) {
            document.documentElement.scrollTop = document.documentElement.scrollTop - tep
          } else {
            document.body.scrollTop = document.body.scrollTop - tep;
          }
        }, 2);
      }
    }
  }
</script>

<style>

</style>
