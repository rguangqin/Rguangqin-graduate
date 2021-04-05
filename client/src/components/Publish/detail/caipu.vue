<template>
<div>
    <div class="noPublic"> <span v-if='!foodData.length'>你还没有发布菜谱，点击</span> <router-link to="/Publish/MyBook/fabu">发布菜谱</router-link></div>
    <!-- 发布的菜谱的列表 -->
    <div class="public" v-if="foodData.length">
        <h2>我发布的菜谱</h2>
        <div class="public-box">
            <div class="foodkinds" v-for="(item,index) in foodData" :key="item.id">
                <FoodCard :foodInfo="item"></FoodCard>
                <p @click="deleteFood(index,item.id)">删除菜谱</p>
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
  methods: {
    async deleteFood(index,id){
      const res = await this.$axios.get('/deletefood',{params:{id}});
      if(res.data.code === 2001){
        this.foodData.splice(index,1)
      }
    }
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
  color: #FFBE00;
}
.public h2 {
  margin: 20px 0;
}
.public-box {
  display: flex;
  flex-wrap: wrap;
}
.foodkinds {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.foodkinds p{
  padding: 5px;
  border: 1px solid #ff0000;
  color: #ff0000;
  border-radius: 7px;
}
</style>