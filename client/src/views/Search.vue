<template>
  <div id="search">
    <div class="search-content">
      <div class="select-box">
        <div class="search-select">
        </div>
        <div class="searchKey">
          <input
            id="phone"
            type="text"
            v-model="searchKey"
            placeholder="搜索菜谱或者食材"
          />
          <div class="search-btn" @click="search()">搜索</div>
        </div>
      </div>
      <div class="search-show">
        <div class="book-show" v-for="el in searchData.book" :key="el.id">
          <img :src="el.image" />
          <div>
            <span>{{ el.name }}&nbsp;&nbsp;[食材]</span>
            <span>{{ el.introduction }}</span>
          </div>
        </div>
        <div class="food-show" v-for="el in searchData.food" :key="el.id">
          <img :src="el.image" />
          <div>
            <span>{{ el.title }}</span>
            <span>{{ el.userName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchKey: "",
      searchData: {},
    };
  },
  methods: {
    async search() {
      const res = await this.$axios.get("/search", { params:{
        searchKey:this.searchKey,
        type:this.type,
      } });
      this.searchData = res.data;
    },
  },
  mounted() {
    this.searchKey = this.$route.query.searchKey;
    if (this.searchKey) this.search();
  },
};
</script>
<style scoped>
#search {
  margin-top: 40px;
  width: 100%;
}
.select-box {
  margin: 0 auto;
  width: 560px;
}
.search-content {
  margin: 0 auto;
  width: 990px;
}
.search-select {
  margin-top: 150px;
  font-size: 20px;
}
.search-select span {
  padding-right: 20px;
}
.search-select .selcet {
  color: #ff6767;
}
.searchKey {
  display: flex;
}
.searchKey input {
  width: 500px;
  height: 50px;
  border: 2px solid #ff6767;
  outline: medium;
  padding-left: 20px;
  font-size: 20px;
}
.searchKey input::-webkit-input-placeholder {
  font-size: 16px;
}
.searchKey .search-btn {
  width: 60px;
  background-color: #ff6767;
  color: #ffffff;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
}
.search-show {
  margin-top: 50px;
}
.search-show img {
  width: 200px;
  height: 200px;
  margin-right: 20px;
}
.food-show,
.book-show {
  display: flex;
  margin-top: 20px;
}
.food-show div,
.book-show div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>