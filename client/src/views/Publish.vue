<template>
  <div id="publish">
    <div class="aside">
      <router-link v-for="el in menu" :key="el.link" :class="defaultMenu == el.name ? 'selected':''" :to="el.link" @click.native="() => defaultMenu=el.name">
        <span>{{el.name}}</span>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultMenu:'个人信息',
      menu:[{name:'个人信息',link:'/Publish/user'},
            {name:'发布菜谱',link:'/Publish/MyBook'},
            {name:'收藏菜谱',link:'/Publish/Favorite'},]
    }
  },
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
  color: #FFBE00;
  background-color: #eee;
}
.selected span{
  color: #FFBE00;
}
</style>
