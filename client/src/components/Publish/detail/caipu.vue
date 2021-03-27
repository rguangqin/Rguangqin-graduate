<template>
<div>
    <div class="noPublic" v-if="showdata1"> 你还没有发布任何菜谱,点击 <router-link to="/Publish/MyBook/fabu">发布菜谱</router-link>去发布</div>
    <!-- 发布的菜谱的列表 -->
    <div class="public">
        <h2>我发布的菜谱</h2>
        <div class="public-box">
            <div class="foodkinds" v-for="item in foodData" :key="item.id" @click="toDetails(item)">
                <FoodCard :foodInfo="item"></FoodCard>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  props:['foodInfo'],
  data() {
    return {
      showdata1: true,
      foodData: [],
    };
  },
  async mounted() {
    const userId = window.localStorage.getItem("userId");
    const res = await this.$axios.get("/menu", { params: { userId } });
    this.foodData = res.data;
  },
};
</script>
<style  scoped>
.noPublic {
  font-size: 22px;
  margin-top: 20px;
}
.noPublic a {
  text-decoration: none;
  color: #ff6767;
}
.public h2 {
  margin: 20px 0;
}
.public-box {
  display: flex;
  width: 990px;
  flex-wrap: wrap;
}
.foodkinds {
  margin-left: 20px;
}
</style>