<template>
  <div class="user-box">
    <div class="user-bacImg">
      <div class="user-info-box">
        <div class="user-info">
          <div class="avator"><img :src="userInfo.userPic" alt=""></div>
          <div class="userName">{{userInfo.userName}}</div>
        </div>
        <div class="count">
          <div class="aeeention">
            <!-- 为true表示已经关注 -->
            <span class="aeeention1" @click="aeeention" v-if="!userInfo.flag">+关注</span>
            <span class="aeeention2" @click="aeeention" v-else>取消关注</span>
          </div>
          <div class="count-two">
            <div><span>{{userInfo.aeeenteCount}}</span><span>关注量</span></div>
            <div><span>{{userInfo.thumbCount}}</span><span>点赞量</span></div>
            <div><span>{{userInfo.favoriteCount}}</span><span>收藏量</span></div>
          </div>
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
  async aeeention(){
    // 表示尚未登陆的状态
    if(!window.localStorage.getItem('islogin')){
      alert("未登录，请先登录")
      this.$router.push('/MyUser/Login')
    }
    const params = {
      flag:!this.userInfo.flag,
      phone:window.localStorage.getItem('phone'),
      userId:this.$route.params.id
      }
    const res = await this.$axios.get('/aeeente',{params})
    if(res.data.code === 2001 || res.data.code === 2002){
      this.userInfo.flag = !this.userInfo.flag;
      if(!this.userInfo.flag) this.userInfo.aeeenteCount-=1;
      else this.userInfo.aeeenteCount+=1;
    }
  },
  async getUserFood(){
    const params = {
      userId:this.$route.params.id,
      phone:window.localStorage.getItem('phone')
    }
    const res = await this.$axios.get('/userfood',{params});
    this.userInfo = res.data.userInfo;
    this.foodInfo = res.data.foodDetail;
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
  justify-content: space-between;
  align-items: flex-end;
}
.aeeention{
  width: 150px;
  display: flex;
  justify-content: center;
}
.count .aeeention span {
  border-radius: 5px;
  padding: 5px;
}
.count .aeeention .aeeention1{
  border: 1px solid #ff0000;
  color: #ff0000;
}
.count .aeeention .aeeention2{
  border: 1px solid rgb(39, 37, 37);
  color: rgb(39, 37, 37);
}
.count-two{
  display: flex;
}
.count-two div:first-of-type,
.count-two div:nth-of-type(2){
  border-right: 1px solid #719D98;
}
.count-two div{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
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