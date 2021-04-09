<template>
  <div>
    <div class="text" v-if="!favoriteData.length">你还没有收藏任何菜谱哦！</div>
    <div class="public" v-else>
        <h2>我收藏的菜谱</h2>
        <div class="public-box">
            <div class="foodkinds" v-for="(item,index) in favoriteData" :key="item.id">
                <FoodCard :foodInfo="item"></FoodCard>
                <p @click="unFavorite(index,item.id)">取消收藏</p>
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
            // 收藏的数据
            favoriteData:[],
        }
    },
    methods: {
      async unFavorite(index,id){
        const params = {
          phone:window.localStorage.getItem('phone'),
          foodId:id,
        }
        const res = await this.$axios.get('/unfavorite',{params})
        if(res.data.code===2001){
          this.favoriteData.splice(index,1)
        }
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
  width: 100%;
}
.public-box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.public h2{
  padding: 16px 0;
}
.foodkinds{
  display: flex;
  align-items: center;
  flex-direction: column;
}
.foodkinds p{
  color: #ff0000;
  padding: 5px;
  border: 1px solid #ff0000;
  border-radius: 7px;
  margin-bottom: 10px;
}
.public h2,
.foodkinds {
  margin-left: 20px;
}
</style>