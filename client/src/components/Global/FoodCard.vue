<template>
    <div :style="{display:'inline-block'}">
        <div style="overflow: hidden">
            <img :src="foodData.image" alt="图片加载失败" />
        </div>
        <p class="foodtile">{{ foodData.title }}</p>
        <p class="userName" v-if="foodData.userName">{{foodData.userName}} </p>
        <!-- <p class="thumb"  v-if="!foodData.userName"><span>{{foodData.thumb.length}}人点赞</span><span>{{foodData.favorite.length}}人收藏</span></p> -->
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
p{
    margin: 5px 0;
}
.foodkinds {
    position: relative;
    width: 230px;
    height: 305px;
    margin-bottom: 5px;
    cursor: pointer;
}

.foodtag {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    color: #fff;
    height: 20px;
    line-height: 20px;
    padding: 1px 4px;
    position: absolute;
    z-index: 2;
}

/* 图片缓慢放大效果 */
.foodkinds img {
    width: 230px;
    height: 230px;
    transition-property: transform;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    margin-bottom: 4px;
}

.foodkinds img:hover {
    transform: scale(1.1, 1.1);
}

.foodkinds .foodtile:hover {
    color: #ff6767;
}

.foodkinds p {
    height: 20px;
    text-align: center;
    line-height: 20px;
    margin: 8px;
}
/* 图片上的独家标签 */
.foodsole {
    display: inline-block;
    position: relative;
    left: 0;
    top: -299px;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.5);
    padding: 2px;
    border-radius: 4px;
    width: 32px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
}
.foodtile {
    overflow: hidden; /*超出部分隐藏*/
    text-overflow: ellipsis; /* 超出部分显示省略号 */
    white-space: nowrap; /*规定段落中的文本不进行换行 */
    font-size: 18px;
}

.userName {
    font-size: 12px;
    color: #7a7474;
}

.userName:hover {
    color: #ff6767;
}
.thumb{
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>