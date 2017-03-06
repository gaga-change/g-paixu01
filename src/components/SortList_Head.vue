<template>
  <div class="top-header border-bottom ">
    <div class="top-back">
      <!--<a :href="$route.go(-1)">返回</a>-->
      <router-link :to="{name:'menu'}">返回</router-link>
    </div>
    <div class="top-bt f32" style="width: 100%">
      <slot>地下城与勇士/电信二区/豪杰永生</slot>
    </div>
  </div>
</template>

<script>
  export default {}
</script>
