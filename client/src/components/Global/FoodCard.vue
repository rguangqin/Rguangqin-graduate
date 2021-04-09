<template>
    <div class="card-box">
         <router-link :to="'/Details/'+foodData.id" class="foodInfo">
            <div>
                <img :src="foodData.image" alt="图片加载失败" />
            </div>
            <p class="foodtile">{{ foodData.title }}</p>
        </router-link>
        <router-link :to="'/userDetail/'+foodData.userId" class="userName">{{foodData.userName}}</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
     props:{
        foodInfo:{
            type:Object,   //类型是数组
            default:{}    //默认值为空
        }
    },
    data() {
        return {
            foodData:[],
        }
    },
    mounted() {
        this.foodData = this.foodInfo;
    },
}
</script>
<style scoped>
.card-box{
    margin-bottom: 10px;
}
.card-box a {
    text-decoration: none;
    color: #000000;
    display: flex;
    justify-content: center;
}
.foodInfo{
    display: flex;flex-direction: column;
    align-items: center;
}
.userName:hover{
    color: #FFBE00;
}
/* 图片缓慢放大效果 */
.foodkinds img {
    width: 230px;
    height: 230px;
    margin-bottom: 4px;
}
</style>