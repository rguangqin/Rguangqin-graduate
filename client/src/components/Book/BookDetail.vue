<template>
    <div class="bookDetail-box">
       <div class="book">
           <img :src="book.image" alt="">
           <div class="book-name">
               <span class="title">{{book.name}}</span>
               <span class="intro">为你介绍{{book.name}}的{{food.length}}种做法</span>
           </div>
       </div>
       <div class="food-title">食材的做法</div>
       <div class="food">
           <div class="public-box">
            <div class="foodkinds" v-for="item in food" :key="item.id" @click="toDetails(item)">
                <FoodCard :foodInfo="item"></FoodCard>
            </div>
        </div>
       </div>
    </div>
</template>
<script>
export default {
    props:['foodInfo'],
    data() {
        return {
            book:{},
            food:[],
        }
    },
    mounted() {
       this.bookDetail = this.getBookDetail(this.$route.params.id);
    },
    beforeRouteUpdate(to,from,next){
        this.bookDetail = getBookDetail(to.params.id);
        next();
    },
    methods: {
        async getBookDetail(id){
            const res = await this.$axios.get('/bookdetail',{params:{id}});
            this.food = res.data.food;
            this.book = res.data.book[0];
        }
    },
}
</script>
<style scoped>
.bookDetail-box{
    width: 1300px;
    margin: 40px auto;
}
.book{
    display: flex;
}
.book .book-name{
    display: flex;
    flex-direction: column;
    height: 200px;
    padding-left: 20px;
    justify-content: space-between;
}
.book-name span{
    padding: 16px;
}
.book-name .title{
    font-size: 30px;
    font-weight: bold;
}
.food-title{
    font-size: 22px;
    font-weight: bold;
    color: #FF6767;
    padding: 16px 0;
}
</style>