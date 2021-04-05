<template>
  <div id="detail">
    <div class="section">
      <!-- 菜名以及菜的说明 -->
      <div class="caipu-name">
        <h1>
          <span class="caiming">{{ foodDetailData.title }}</span>
        </h1>
        <router-link :to="'/userDetail/'+foodDetailData.userId" class="user-avator">
          <!-- 用户的头像 -->
          <img
            :src="foodDetailData.userPic"
            alt="图片加载失败"
          />
          <p>{{ foodDetailData.userName }}</p>
        </router-link>
      </div>
      <div class="cai-img">
        <img :src="foodDetailData.image" alt="图片加载失败" />
      </div>
      <div class="cai-text">
        <span>{{ foodDetailData.description }}</span>
      </div>
      <div class="caidetail">
        <i class="iconfont icon-shenpi"></i>
        <h3>食材明细</h3>
      </div>
      <!-- 调料的 -->
      <fieldset v-for="el in foodDetailData.cailiao" :key="el.id">
        <legend v-show="el.clname">{{ el.clname }}</legend>
        <div class="cailiao">
          <span v-for="el1 in el.detai" :key="el1">{{ el1 }}</span>
        </div>
      </fieldset>
      <div class="caidetail">
        <i class="iconfont icon-mingxi"></i>
        <h3>食材明细</h3>
        <h3>做法步骤</h3>
      </div>
      <!-- 做菜的步骤 -->
      <div
        class="buzhou"
        v-for="(el, index) in foodDetailData.step"
        :key="index"
      >
        <img :src="el.img1" alt />
        <div class="content">
          <div class="id1">{{ index + 1 }}</div>
          <div class="cont-text">{{ el.describle }}</div>
        </div>
      </div>

      <div class="caidetail">
        <i class="iconfont icon-zhuyishixiang"></i>
        <h3>注意事项</h3>
      </div>
      <!-- 做菜小窍门部分 -->
      <div class="qiaomen">
        <p v-for="(el, index) in foodDetailData.careful" :key="index">
          {{ el }}
        </p>
      </div>
      <!-- 图标部分 -->
      <div class="user-operat">
        <div>
          <span :class="`iconfont icon-dianzan1 ${dianzanIcon ? 'dianzan' : ''}`" @click="addDianzanClass()"></span>
          <span>{{foodDetailData.thumbCount}}点赞</span>
        </div>
        <div>
          <span :class="`iconfont icon-shoucang2 ${shoucangIcon ? 'shoucang' : ''}`" @click="addShoucangClass()"></span>
          <span>{{foodDetailData.favoriteCount}}收藏</span>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: {
    foodData: {
      type: Object, //类型是数组
      default: ()=>{}, //默认值为空
    },
  },
  methods: {
    async addDianzanClass(){
      //表示用户是登录的状态
      // console.log(window.localStorage.getItem('islogin'))
      if(window.localStorage.getItem('islogin')){
          // 先查看图标的状态
        if(this.dianzanIcon){
          this.dianzanIcon = false;
        }
        else this.dianzanIcon = true;
        // 根据图标的状态传递到后端
        const res = await this.$axios.get("/dianzan",{params:{foodId:this.foodDetailData.foodId,phone:window.localStorage.phone,dianzanIcon:this.dianzanIcon}})
        if(res.data.code === 2002){
          this.foodDetailData.thumbCount+=1;
          // alert(res.data.info)
        }else if(res.data.code === 2001){
          this.foodDetailData.thumbCount-=1;
        }
      }else{
        // 若是检查没有登录，那么提示没有，登录，跳转到登录页面。
        alert('未登录，请先登录！')
        this.$router.push({name:'Login'})
      }
  },
    async addShoucangClass(){
      if(window.localStorage.getItem('islogin')){
        if(this.shoucangIcon)
        this.shoucangIcon = false;
        else this.shoucangIcon = true;
        const res = await this.$axios.get("/shoucang",{params:{foodId:this.foodDetailData.foodId,phone:window.localStorage.phone,shoucangIcon:this.shoucangIcon}})
        if(res.data.code === 2002){
          this.foodDetailData.favoriteCount+=1;
        }else if(res.data.code === 2001){
          this.foodDetailData.favoriteCount-=1;
        }
      }else{
        // 若是检查没有登录，那么提示没有，登录，跳转到登录页面。
        alert('未登录，请先登录！')
        this.$router.push({name:'Login'})
      }
   }
  },
  data() {
    return {
      data1: 0,
      foodDetailData: [],
      foodData1: {},
      dianzanIcon:false,
      shoucangIcon:false,
    };
  },
  async mounted() {
    let res = await this.$axios.get("/details", {
      params: { foodId: this.$route.params.id },
    });
    this.dianzanIcon = res.data.thumb;
    this.shoucangIcon = res.data.favorite;
    this.foodDetailData = res.data;
    this.foodData1 = this.$route.params.item;
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#detail{
    width: 990px;
    margin: 0 auto;
}
.section {
  width: 640px;
  margin-top: 40px;
}
.pinglun textarea {
  overflow: hidden;
  height: 90px;
  line-height: 20px;
  font-size: 14px;
  width: 640px;
  outline: 0;
  padding: 5px;
}
.fabiao {
  width: 640px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  height: 30px;
  font-size: 12px;
  background-color: #eeeeee;
}
.fabiao .fabiao-left {
  padding-left: 10px;
  color: #666;
  height: 30px;
  line-height: 30px;
}
.fabiao .fabiao-right {
  color: #fff;
  height: 30px;
  width: 100px;
  line-height: 30px;
  text-align: center;
  background-color: #FFBE00;
  border-left: 1px solid #ccc;
}
.caipu-left {
  width: 640px;
  height: 900px;
}
.caipu-right {
  width: 300px;
  height: 900px;
  background-color: rosybrown;
}
.user-avator,
.caiming {
  text-decoration: none;
  color: #111;
}
.user-avator p:hover{
  color:#FFBE00;
}
.user-avator img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
}
.caipu-name {
  height: 70px;
  position: relative;
}
.user-avator {
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 10px;
  text-align: center;
}
.caipu-name h1 {
  height: 70px;
  /* width: 200px; */
  line-height: 70px;
}
.cai-img img {
  width: 640px;
  height: 426px;
  margin-top: 10px;
}
.cai-text {
  margin-top: 20px;
}
.cai-text span::before,
.cai-text span::after {
  content: "“";
  display: inline-block;
  text-indent: -10px;
  height: 24px;
  width: 30px;
  font-size: 40px;
  color: #bfbfbf;
  vertical-align: bottom;
}
.cai-text span::after {
  content: "”";
}
.caidetail {
  height: 60px;
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.caidetail h3 {
  display: inline-block;
  margin-left: 10px;
}
.cailiao {
  width: 638px;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
}
.cailiao span:hover {
  color: #FFBE00;
  cursor: pointer;
}
fieldset {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
}
fieldset legend {
  margin-left: 50px;
  text-align: start;
  padding: 0 10px;
}
.buzhou {
  height: 165px;
  margin-bottom: 40px;
  display: flex;
  margin-left: 20px;
}
.buzhou img {
  width: 220px;
  height: auto;
}

.content {
  margin-left: 20px;
  font-size: 18px;
}
.content .id1 {
  width: 36px;
  height: 36px;
  /* background-color: sandybrown; */
  border-radius: 50%;
  text-align: center;
  line-height: 36px;
  border: 1px solid #ccc;
  margin: 22px 0 10px 0;
}
.qiaomen p:nth-last-of-type(1),
.qiaomen p:nth-last-of-type(2),
.qiaomen p:nth-last-of-type(3) {
  margin: 10px 0;
}
.qiaomen a {
  padding: 0 5px;
  text-decoration: navajowhite;
  color: #000;
}
.qiaomen a:hover {
  color: #FFBE00;
}
.user-operat{
  height: 50px;
  width: 100px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.user-operat div{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.shoucang::before,
.dianzan::before{
  color: #FFBE00 !important;
}
</style>
