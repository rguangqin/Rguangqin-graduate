<template>
  <div class="user-box">
    <div class="user">
      <router-link to='/Publish/user'>修改个人信息</router-link>
      <router-link to='/Publish/user/userpwd'>修改密码</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
.user-box{
  width: 100%;
}
.user{
  margin-left: 150px;
  padding-top: 20px;
}
.user a{
  text-decoration: none;
  padding-right: 20px;
  color:#000000;
  font-size: 20px;
}
</style>