<template>
  <div class="classify-box">
    <div class="classify-wrap">
      <div class="single-classify" v-for="(el,index) in classData" :key="index">
        <div class="classify-title">{{el.name}}</div>
        <div>
          <span v-for="item in el" :key="item.id">{{item.book_name}}</span>
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
  },
}
</script>
<style scope>
.classify-box{
  width: 100%;
  margin-top: 40px;
}
.classify-wrap{
  width: 930px;
  margin: 0 auto;
}
</style>