<template>
  <div class="user-box">
    <div class="user-bacImg">
      <div class="user-info-box">
        <div class="user-info">
          <div class="avator"><img :src="userInfo.userPic" alt=""></div>
          <div class="userName">{{userInfo.userName}}</div>
        </div>
        <div class="count">
          <div><span>{{userInfo.thumbCount}}</span>点赞量<span></span></div>
          <div><span>{{userInfo.favoriteCount}}</span><span>收藏量</span></div>
        </div>
      </div>
    </div>
    <div class="user-detail-box" v-if='foodInfo.length'>
      <div>{{userInfo.userName}}的菜谱</div>
      <div class="food-box">
        <div class="foodkinds" v-for="item in foodInfo" :key="item.id">
            <FoodCard :foodInfo="item"></FoodCard>
      </div>
      </div>
    </div>
    <div class="noFood" v-else>此人很懒！还没有任何动态</div>
  </div>
</template>
<script>
export default {
data() {
  return {
    userInfo:{},
    foodInfo:[],
  }
},
methods: {
  async getUserFood(){
    const res = await this.$axios.get('/userfood',{params:{userId:this.$route.params.id}});
    this.userInfo = res.data.userInfo;
    this.foodInfo = res.data.foodDetail;
    console.log(this.userInfo)
  }
},
mounted() {
  this.getUserFood();
},
}
</script>
<style scoped>
.user-box{
  margin-top: 40px;
}
.user-bacImg{
  width: 100%;
  height: 250px;
  background-image: url('../image/bac.jpg');
  background-repeat: no-repeat;
  background-size: 100% 600px;
}
.user-info-box{
  width: 930px;
  margin: 0 auto;
}
.user-info{
  display: flex;
  align-items: center;
  padding-top: 30px;
}
.user-info .userName{
  font-size: 30px;
  font-weight: bold;
  padding-left: 30px;
}
.count{
  display: flex;
  justify-content: flex-end;
}
.count div{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
}
.count div:first-child{
  border-right: 1px solid #5B7F96;
}
.avator img{
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.user-detail-box{
  margin: 0 auto;
}

.user-detail-box{
  width: 930px;
  margin: 0 auto;
}
.user-detail-box div:first-of-type{
  font-size: 20px;
  line-height: 50px;
}
.foodkinds{
  margin-right: 10px;
}
.food-box{
  display: flex;
}
.noFood{
  width: 930px;
  margin: 0 auto;
  font-size: 26px;
  color: #867c7c;
  text-align: center;
  line-height: 250px;
}
</style>