<template>
    <div class="bookDetail-box">
       <div class="book-box">
           <div class="book">
                <img :src="book.image" alt="">
                <div class="book-name">
                    <span class="title">{{book.name}}</span>
                    <span class="intro">为你介绍{{book.name}}的{{food.length}}种做法</span>
                </div>
            </div>
            <div class="food-title">食材的做法</div>
            <div class="public-box">
                <div class="foodkind" v-for="item in food" :key="item.id">
                    <router-link :to="'/Details/'+item.id" class="food-img"><img :src="item.image" alt=""></router-link>
                    <div class="text-box">
                        <router-link :to="'/Details/'+item.id" class="food-name">{{item.title}}</router-link>
                        <router-link :to="'/userDetail/'+item.userId" class="userName">{{item.userName}}</router-link>
                        <div class="food-ingre">
                            <span>食材:</span>
                            <span v-for="(item,index) in item.ingredient" :key="index">{{item}}</span>
                        </div>
                    </div>
                </div>
            </div>
       </div>
       <router-view></router-view>
    </div>
</template>
<script>
export default {
    props:['foodInfo'],
    data() {
        return {
            book:{},
            food:[],
            ingredient:[],
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
    width: 100%;
    margin-top: 40px;
}
.book-box{
    width: 930px;
    margin: 0 auto;
}
.book{
    display: flex;
}
.book img{
    width: 150px;
    height: 150px;
}
.book .book-name{
    display: flex;
    flex-direction: column;
    height: 150px;
    padding-left: 18px;
    justify-content: space-between;
}
.book-name span{
    padding: 16px;
}
.book-name .intro{
    font-size: 14px;
    color: rgb(85, 73, 73);
}
.book-name .title{
    font-size: 30px;
    font-weight: bold;
}
.food-title{
    font-size: 22px;
    font-weight: bold;
    color: #FFBE00;
    padding: 16px 0;
}
.food-img img{
    width: 150px;
    height: 150px;
    border-radius: 10px;
    margin-right: 20px;
}
.foodkind{
    display: flex;
    margin-bottom: 20px;
}
.text-box{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.text-box a{
    text-decoration: none;
}
.text-box .food-name{
    font-size: 24px;
    color: #000000;
}
.text-box .food-name:hover{
    color: #FFBE00;
}
.text-box .userName{
    font-size: 18px;
    color: #524444;
}
.food-ingre span{
    padding-right: 8px;
    font-size: 14px;
    color: #ccc;
}
</style>