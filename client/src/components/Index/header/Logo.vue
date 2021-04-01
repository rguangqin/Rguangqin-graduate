<template>
  <div id="logo" class="w">
    <div class="logoPic"></div>
    <div class="serchBox">
      <input type="text" placeholder="输入要搜索的关键字" v-model='searchKey'/>
      <router-link :to="{path:'/Search',query: {searchKey:this.searchKey}}">搜索</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKey:'',
    };
  },
};
</script>

<style scoped>
#logo {
  position: relative;
  height: 115px;
}

.logoPic {
  position: absolute;
  top: 30px;
  left: 0;
  width: 104px;
  height: 43px;
  background-image: url(../../../assets/logo.png);
  background-size: 104px 43px;
}

.logoNav {
  position: absolute;
  left: 220px;
  top: 16px;
  height: 65px;
}

.logoNav a {
  display: inline-block;
  height: 65px;
  padding: 0 10px;
  font-size: 20px;
  line-height: 65px;
  text-decoration: none;
  color: #333333;
}

.serchBox {
  position: absolute;
  right: 0;
  top: 34px;
  width: 250px;
  height: 26px;
  border: 1px solid #cccccc;
  overflow: hidden;
  border-radius: 4px;
}

.serchBox input {
  vertical-align: top;
  border: none;
  outline: none;
  box-sizing: border-box;
  width: 170px;
  height: 26px;
  padding: 0 4px;
}

.serchBox a {
  vertical-align: top;
  display: inline-block;
  width: 80px;
  height: 26px;
  background-color: #999999;
  font-size: 14px;
  text-decoration: none;
  line-height: 26px;
  text-align: center;
  color: #ffffff;
}

.serchBox a:hover {
  background-color: #FFBE00;
}
.logoNav a:hover {
  color: #FFBE00;
}
</style>
