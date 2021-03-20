<template>
  <div id="search">
    <div class="search-content">
      <div class="searchKey">
        <input
          id="phone"
          type="text"
          v-model="searchKey"
          placeholder="搜索菜谱或者食材"
        />
        <div class="search-btn" @click="search()">搜索</div>
      </div>
      <div>展示搜索结果</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchKey: "",
    };
  },
  methods: {
    async search() {
      console.log("search");
      const params = { searchKey: this.searchKey };
      const res = await this.$axios.get("/search", { params });
      console.log("搜索的内容", res);
    },
  },
  mounted() {
    this.searchKey = this.$route.query.searchKey;
    if(this.searchKey) this.search();
  },
};
</script>
<style scoped>
#search {
  margin-top: 40px;
  width: 100%;
}
.search-content {
  margin: 0 auto;
  width: 990px;
}
.searchKey {
  margin: 150px;
  display: flex;
}
.searchKey input {
  width: 500px;
  height: 50px;
  border: 2px solid #ff6767;
  outline: medium;
  padding-left: 20px;
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
</style>