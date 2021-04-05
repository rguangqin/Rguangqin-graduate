<template>
  <div class="lbt w">
    <!-- element ui 轮播图 -->
    <div class="block">
      <el-carousel height="360px" indicator-position="none" arrow="never" type='card'>
        <el-carousel-item v-for="item in imgData" :key="item.id">
          <router-link :to="'/Details/'+item.id">
            <img :src="item.image" alt="图片加载失败" />
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgData: "",
    };
  },
  components: {},
  async mounted() {
    // 请求后台获取轮播图
    let result_lbt = await this.$axios.get("/lbt");
    this.imgData = result_lbt.data;
  },
};
</script>

<style scoped>
.lbt {
  position: relative;
  margin-top: 100px;
}
.block img{
  width: 100%;
  height: 100%;
}
</style>
