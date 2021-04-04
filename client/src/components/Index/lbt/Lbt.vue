<template>
  <div class="lbt w">
    <!-- element ui 轮播图 -->
    <div class="block">
      <el-carousel height="360px" indicator-position="none" arrow="never">
        <el-carousel-item v-for="item in lbtImg" :key="item.id">
          <a :href="item.url" target="_blank">
            <img :src="item.images" alt="图片加载失败" />
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 轮播图上方菜单 -->
    <!-- <div class="menu">
      <router-link class="part" to="##" v-for="item in menuItem" :key="item.title">
        {{item.title}}
        <div class="more">
          <router-link v-for="myItem in item.content" to="##" :key="myItem">{{myItem}}</router-link>
        </div>
      </router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      lbtImg: "",
    };
  },
  components: {},
  async mounted() {
    // 请求后台获取轮播图
    let result_lbt = await this.$axios.get("/lbt");
    this.lbtImg = result_lbt.data;
  },
};
</script>

<style scoped>
.lbt {
  position: relative;
  margin-top: 100px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.lbtHref {
  display: block;
}
/* 
.menu {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 220px;
  height: 360px;
  background: rgba(68, 68, 68, 0.4);
}

.menu .part {
  display: inline-block;
  width: 100%;
  height: 60px;
  margin-top: 8px;
  font-size: 18px;
  line-height: 60px;
  text-align: center;
  color: #ffffff;
  text-decoration: none;
}

.menu .part:hover {
  background-color: #FFBE00;
}

.menu .part:hover .more {
  display: block;
}

.more {
  position: absolute;
  left: 220px;
  top: 0;
  display: none;
  box-sizing: border-box;
  width: 490px;
  height: 360px;
  padding: 20px 50px 0;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.more a {
  display: inline-block;
  width: 130px;
  height: 70px;
  margin-bottom: 10px;
  font-size: 18px;
  color: #333333;
  text-decoration: none;
}
.more a:hover {
  color: #FFBE00;
} */
</style>
