<template>
  <div>
    <div class="text" v-if="!favoriteData.length">你还没有收藏任何菜谱</div>
    <div class="public">
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
  padding-right: 0;
  color: #999;
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