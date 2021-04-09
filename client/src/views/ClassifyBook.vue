<template>
  <div class="classify-box">
    <div class="classify-wrap">
      <div class="single-classify" v-for="(el,index) in classData" :key="index">
        <div class="classify-title">{{el.name}}</div>
        <div class="classify-content">
          <router-link v-for="item in el.bookData" :to="'/Book/'+item.id" :key="item.id">{{item.book_name}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classData:[],
    }
  },
  async created() {
    const res = await this.$axios.get('/classify');
    this.classData = res.data;
    console.log(res.data)
  },
}
</script>
<style scope>
.classify-box{
  width: 100%;
  margin-top: 40px;
  /* background-image: url('../image/classify-bac.jpg');
  background-repeat: no-repeat;
  background-size: 100% 700px; */
}
.classify-wrap{
  width: 930px;
  background-color: rgb(252, 246, 237);
  margin: 0 auto;
}
.classify-title{
  font-size: 26px;
  /* color: ; */
  padding: 10px 0;
}
.classify-content{
  display: flex;
}
.classify-content a{
  padding: 15px;
  margin-bottom: 20px;
  text-decoration: none;
  color:#000000;
  font-size: 22px;
  display: flex;
  flex-wrap: wrap;
}
.classify-content a:hover{
  color:aquamarine
}
</style>