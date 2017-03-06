<template>
  <div>
    <h1>辅助菜单</h1>
    <ul>
      <li>
        <router-link
          to="/sort-list/?gid=YX16053122463418100536&gname=英雄联盟&areaid=YXQ16053123494177201414&areaname=电信&operatorId=&operatorName=&raceid=&racename=undefined&serverid=YXF16053123502273501422&servername=艾欧尼亚&goodsType=2&typename=帐号&gameImageUrl=">
          艾欧尼亚
        </router-link>
      </li>
      <li>
        <router-link
          to="/sort-list/?gid=YX16053122463418100536&gname=英雄联盟&areaid=YXQ16053123494177201414&areaname=电信&operatorId=&operatorName=&raceid=&racename=undefined&serverid=YXF16053123522672101468&servername=祖安&goodsType=2&typename=帐号&gameImageUrl=">
          祖安
        </router-link>
      </li>
      <li>
        <router-link
          to="/sort-list/?gid=YX16053122463418100536&gname=英雄联盟&areaid=YXQ16053123494177201414&areaname=电信&operatorId=&operatorName=&raceid=&racename=undefined&serverid=YXF16053123521594001462&servername=影流&goodsType=2&typename=帐号&gameImageUrl=">
          流影
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{}
</script>

<style scoped>
  h1 {
    text-align: center;
    margin-top: 2em;
    margin-bottom: 1em;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul > li:nth-child(even) {
    background-color: #bbefa0;
  }
  ul > li:nth-child(odd) {
    background-color: #efbdcb;
  }
  li a {
    border-bottom: 1px solid gainsboro;
    padding: 20px 30px;
    display: block;
  }


</style>
