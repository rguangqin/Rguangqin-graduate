<template>
  <div id="book" class="w">
    <div class="book-nav">
      <h2 class="nav-left">
        <router-link to="/ClassifyBook" class="shicai">食材</router-link>
      </h2>
      <!-- 食材的分类 -->
      <div class="classify">
        <span v-for="el in classify" :key="el.id" :class="classifyId === el.id ? 'selected' : ''" @click="changeSelect(el.id)">{{el.name}}</span>
      </div>
    </div>
    <div class="book">
      <ul>
        <li v-for="item in bookArr" class="single-book" :key="item.id">
          <router-link :to="'/Book/'+item.id" >
           <img :src="item.image" class="book-img" alt="图片显示失败" />
            <p>{{item.name}}</p>
            <p class="content">{{item.content}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classifyId:1,
      bookArr: "",
      classify:[{id:1,name:'不限'},
      {id:2,name:'蔬菜'},
      {id:3,name:'水果'},
      {id:4,name:'肉类'},
      {id:5,name:'海鲜'},]
    };
  },
  mounted() {
    this.getBookData();
  },
  methods: {
    changeSelect(id){
      this.classifyId=id;
      this.getBookData();
    },
    async getBookData(){
      const params = {classify:this.classifyId}
      const result = await this.$axios.get("/book",{params});
      this.bookArr = result.data;
    }
  },
};
</script>
<style scoped>
#book {
  margin-top: 30px;
}
.book {
  height: 370px;
}
.book ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
ul .single-book {
  list-style: none;
  width: 126px;
  text-align: center;
  display: inline-block;
  padding-top: 10px;
}
ul .book-img {
  width: 126px;
  height: 126px;
  margin-bottom: 5px;
}
.single-book a {
  text-decoration: none;
  color: #000;
}
.book .content {
  font-size: 12px;
  color: #ccc;
  padding-top: 5px;
}
.book-nav {
  height: 36px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  line-height: 36px;
  border-bottom: 1px solid #e8e8e8;
}
.book-nav .shicai {
  color: #FFBE00;
  padding-bottom: 5px;
  border-bottom: 2px solid #FFBE00;
  font-size: 20px;
}
.nav-left {
  display: inline-block;
}
.book-nav ul {
  display: inline-block;
}
.book-nav li {
  display: inline-block;
  list-style: none;
  padding-left: 20px;
}
.book-nav li:hover {
  color: #FFBE00;
}
.classify{
  width: 200px;
  display: flex;
  justify-content: space-between;
}
.classify .selected{
  color: #FFBE00;
  padding: 0 3px;
  border-bottom: 2px solid #FFBE00;
}
</style>