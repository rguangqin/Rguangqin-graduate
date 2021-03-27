<template>
  <div id="publish">
    <div class="aside">
      <router-link to="/Publish/Vip">个人中心</router-link>
      <router-link to="/Publish/MyBook">发布菜谱</router-link>
      <router-link to="/Publish/Favorite">收藏</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
#publish {
  position: relative;
  margin-top: 40px;
}

.aside {
  width: 110px;
  height: 100%;
  background: #f8f8f8;
  position: fixed;
  z-index: 10;
}
.aside a {
  display: block;
  padding: 13px 38px;
  font-size: 16px;
  line-height: 1.1em;
  color: #333333;
  border-bottom: 1px solid #cccccc;
  text-decoration: none;
  outline: 0;
  zoom: 1;
}

.aside a:hover {
  color: #ff6767;
  background-color: #eee;
}
</style>
