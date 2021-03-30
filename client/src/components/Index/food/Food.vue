<template>
    <div id="food" class="w">
        <div class="food">
            <!-- 菜谱左边 -->
            <div class="foodleft">
                <a href="##" class="leftitem">
                    <h3 class="h3 xinxiu">新秀菜谱</h3>
                    <h3 class="h3">一周热门</h3>
                    <h3 class="h3">最受欢迎的家常菜</h3>
                </a>
            </div>
        </div>
        <div class="foodbox">
            <div class="foodkinds" v-for="item in foodData" :key="item.userId" @click="toDetails(item)">
            <FoodCard :foodInfo="item"></FoodCard>
            </div>
            <!-- <div class="foodkinds" v-for="item in foodData" :key="item.userId" @click="toDetails(item)">
                <router-link :to="{path:'/Details',params: {item}}">
                    <div style="overflow: hidden">
                        <img :src="item.image" alt="图片加载失败" />
                    </div>
                    <p class="foodtile">{{ item.title }}</p>
                </router-link>
                <p class="userName" v-if="item.userName">{{item.userName}} </p>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    props:['foodInfo'],
    data() {
        return {
            id:1,
            foodItem: ["热菜", "凉菜", "汤羹", "主食", "小吃", "西餐", "菜谱首页"],
            foodData:[],
        };
    },

    // 请求数据库首页新秀菜谱的数据
    async mounted() {
        let result = await this.$axios.get("/food");
        this.foodData = result.data;
    },

    methods: {
        toDetails(item) {
            //改变仓库里面的用户ID
            this.$store.commit("increment", { n: item.id });
            this.$router.push({ name: "Details", params: { item } });
        },
    },
};
</script>

<style scoped>
.food {
    height: 40px;
    margin-top: 30px;
    position: relative;
    line-height: 40px;
    border-bottom: 1px solid #cccccc;
}

.foodleft {
    position: absolute;
    left: 0;
    top: 0;
}

.h3 {
    display: inline-block;
    margin-right: 15px;
    color: black;
    font-size: 20px;
    padding-bottom: 9px;
}

.xinxiu {
    color: #ff6767;
    border-bottom: 3px solid #ff6767;
}

.h3:hover {
    color: #ff6767;
    border-bottom: 3px solid #ff6767;
}
.foodbox {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    flex-wrap: wrap;
    text-decoration: none;
    color: #000000;
}

</style>
