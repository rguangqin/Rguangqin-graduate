<template>
  <div>
    <div class="text" v-if="!favoriteData.length">你还没有收藏任何菜谱哦！</div>
    <div class="public" v-else>
        <h2>我收藏的菜谱</h2>
        <div class="public-box">
            <div class="foodkinds" v-for="item in favoriteData" :key="item.id" @click="toDetails(item)">
                <FoodCard :foodInfo="item"></FoodCard>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            // 收藏的数据
            favoriteData:[],
        }
    },
    async mounted() {
        const result = await this.$axios.get('/favorite', {params:{phone:window.localStorage.getItem('phone')}})
        this.favoriteData = result.data;
    },
};
</script>
<style scoped>
.text {
  font-size: 20px;
  color: #999;
  text-align: center;
  line-height: 300px;
}
.public {
  margin: 20px auto;
  width: 1300px;
}
.public-box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.public h2{
  padding: 16px 0;
}
.public h2,
.foodkinds {
  margin-left: 20px;
}
</style>