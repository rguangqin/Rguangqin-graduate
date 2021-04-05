<template>
  <div id="app">
    <div id="topbar">
      <div class="topnav">
        <div class="leftnav">
          <!-- 首页 -->
          <router-link to="/" class="leftLogo">
            <span>美食汇</span>
            <span>首页</span>
          </router-link>
          <router-link to='/Search' class="search">搜索</router-link>
        </div>
        <!-- 右边导航 -->
        <div class="rightnav">
          <div class="isLogin" v-if='!isLogin'>
            <router-link to="/MyUser/Register">注册</router-link>
            <router-link to="/MyUser/Login">登录</router-link>
          </div>
          <div v-else class="loginAvator"><img :src="avator" alt="" class="avator"></div>
          <router-link to="/Publish">个人中心</router-link>
          <span to="/MyUser" v-if='isLogin' @click="abort">退出登录</span>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLogin:'',
      avator:'',
    };
  },
  watch:{

  },
  methods: {
    abort(){
      this.$router.push({path:'/MyUser'})
      //退出登录清除缓存
      window.localStorage.clear();
      this.isLogin = false;
    },
    async getUserInfo(){
    const result = await this.$axios.get('/userinfo',{params:{userId:window.localStorage.getItem('userId')}});
      this.avator = result.data[0].userPic;
    }
  },
  updated() {
    this.isLogin = window.localStorage.getItem('islogin');
    if(window.localStorage.getItem('userId')) this.getUserInfo();
  },
  mounted() {
    if(window.localStorage.getItem('userId')) this.getUserInfo();
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
/* 首页轮播图 */
.w {
  width: 990px;
  margin: 0 auto;
}
#topbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 40px;
  width: 100%;
  min-width: 950px;
  background-color: #1a1818;
}
.topnav{
  display: flex;
  justify-content: space-between;
  width: 950px;
  margin: 0 auto;
}
.leftnav {
  font-size: 14px;
  line-height: 40px;
  color: #cccccc;
}
.leftnav a{
  text-decoration: none;
  font-size: 14px;
  line-height: 40px;
  color: #cccccc;
}
.leftLogo {
  display: inline-block;
  width: 114px;
  height: 40px;
}

.leftLogo:hover,
.rightnav a:hover {
  background-color: #0d0d0d;
}

.leftLogo span:first-of-type {
  display: inline-block;
  height: 40px;
  margin-left: 10px;
  line-height: 40px;
  font-size: 14px;
  font-weight: bolder;
  color: #cccccc;
}

.leftLogo span:last-of-type {
  display: inline-block;
  height: 40px;
  margin-left: 10px;
  line-height: 40px;
  font-size: 14px;
  color: #cccccc;
}

.rightnav {
  display: flex;
  align-items: center;
  color:#cccccc;
  font-size: 14px;
}
.rightnav .loginAvator,
.rightnav .isLogin{
  display: inline-block;
}
.loginAvator img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 10px;
}
.rightnav a {
  vertical-align: top;
  display: inline-block;
  height: 40px;
  padding: 0 10px;
  font-size: 14px;
  line-height: 40px;
  text-decoration: none;
  color: #cccccc;
}

</style>
