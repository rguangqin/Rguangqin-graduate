<template>
    <div id="section">
        <!-- 菜名以及菜的说明 -->
        <div class="caipu-name">
            <h1>
                <a href="###" class="caiming">{{ foodData1.title }}</a>
            </h1>
            <a href="###" class="user-avator">
                <!-- 用户的头像 -->
                <img src="https://i5.meishichina.com/data/avatar/009/17/98/77_avatar_big.jpg?x-oss-process=style/c320&v=20200922" alt="图片加载失败" />
                <p>{{foodData1.userName}}</p>
            </a>
        </div>
        <a href="###" class="cai-img">
            <img :src="foodData1.image" alt="图片加载失败" />
        </a>
        <div class="cai-text">
            <span>{{ foodDetailData.description }}</span>
        </div>
        <div class="caidetail">
           <i class="iconfont icon-shenpi"></i><h3>食材明细</h3>
        </div>
        <!-- 调料的 -->
        <fieldset v-for="el in foodDetailData.cailiao" :key="el.id">
            <legend v-show="el.clname">{{ el.clname }}</legend>
            <div class="cailiao">
                <span v-for="el1 in el.detai" :key="el1">{{ el1 }}</span>
            </div>
        </fieldset>
        <div class="caidetail">
            <i class="iconfont icon-mingxi"></i><h3>食材明细</h3><h3>做法步骤</h3>
        </div>
        <!-- 做菜的步骤 -->
        <div class="buzhou" v-for="(el,index) in foodDetailData.step" :key="index">
            <img :src="el.img1" alt />
            <div class="content">
                <div class="id1">{{ index+1 }}</div>
                <div class="cont-text">{{ el.describle }}</div>
            </div>
        </div>

        <div class="caidetail">
            <i class="iconfont icon-zhuyishixiang"></i><h3>注意事项</h3>
        </div>
        <!-- 做菜小窍门部分 -->
        <div class="qiaomen">
            <p v-for="(el,index) in foodDetailData.careful" :key="index">{{ el }}</p>
        </div>
        <!-- 图标部分 -->
        <div class="tubiao">
            <router-link to="###" class="singletb" v-for="el in xiaotubiao" :key="el.id">
                <span><img :src="tubiao" alt="" :style="'left:' + el.left1 + 'px'" @mouseenter="fn(el)" @mouseout="fn1(el)"/></span>
                <p>{{ el.text }}</p>
            </router-link>
        </div>
        <div class="pinglun">
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <div class="fabiao">
                <div class="fabiao-left">Ctrl+Enter 也可提交哦</div>
                <div class="fabiao-right">发表评论</div>
            </div>
            <div class="tiaoshu">
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        foodData:{
            type:Object,   //类型是数组
            default:{}    //默认值为空
        }
    },
    methods: {
        fn(arg1) {
            let imgs = document.querySelectorAll(".singletb img");
            imgs[arg1.id - 1].style.left = `${arg1.left2}px`;
        },
        fn1(arg1) {
            let imgs = document.querySelectorAll(".singletb img");
            imgs[arg1.id - 1].style.left = `${arg1.left1}px`;
        },
    },
    data() {
        return {
            data1: 0,
            foodDetailData:[],
            foodData1:{},
            tubiao: "http://static.meishichina.com/v6/img/zhen/ix2.png?v=4",
            // 菜的详细信息
            // 八个小图标部分的数据，转发评论的
            xiaotubiao: [
                {
                    id: 1,
                    left1: -210,
                    left2: -180,
                    text: "人点赞",
                },
                {
                    id: 2,
                    left1: 0,
                    left2: -30,
                    text: "人收藏",
                },
                {
                    id: 3,
                    left1: -240,
                    text: "加入菜单",
                },
                {
                    id: 4,
                    left1: -270,
                    text: "条评论",
                },
                {
                    id: 5,
                    left1: -150,
                    text: "微信",
                },
                {
                    id: 6,
                    left1: -90,
                    text: "QQ好友",
                },
                {
                    id: 7,
                    left1: -120,
                    text: "QQ空间",
                },
                {
                    id: 8,
                    left1: -60,
                    text: "新浪微博",
                },
            ],
            
        };
    },
    async mounted() {
        // 根据菜谱的 id 请求菜谱的详细信息
        let res = await this.$axios.get("/details", { params: { foodId: this.$store.state.myFoodId } });
        this.foodDetailData = res.data;
        this.foodData1 = this.foodData.item;
    },
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
#section {
    position: absolute;
    left: 0;
    top: 0;
    width: 640px;
}
.pinglun textarea {
    overflow: hidden;
    height: 90px;
    line-height: 20px;
    font-size: 14px;
    width: 640px;
    outline: 0;
    padding: 5px;
}
.fabiao {
    width: 640px;
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    height: 30px;
    font-size: 12px;
    background-color: #eeeeee;
}
.fabiao .fabiao-left {
    padding-left: 10px;
    color: #666;
    height: 30px;
    line-height: 30px;
}
.fabiao .fabiao-right {
    color: #fff;
    height: 30px;
    width: 100px;
    line-height: 30px;
    text-align: center;
    background-color: #ff6767;
    border-left: 1px solid #ccc;
}
.tubiao {
    height: 83px;
    color: #666;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
}
.tubiao .singletb {
    margin-top: 15px;
    width: 77px;
    height: 53px;
    text-decoration: none;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.tubiao img {
    width: 300px;
    height: 30px;
    position: relative;
    /* left: -60px; */
}
.tubiao span {
    width: 30px;
    height: 30px;
    display: inline-block;
    overflow: hidden;
}
.caipu-left {
    width: 640px;
    height: 900px;
}
.caipu-right {
    width: 300px;
    height: 900px;
    /* 高度 */
    background-color: rosybrown;
}
.user-avator,
.caiming {
    text-decoration: none;
    color: #111;
}

.user-avator img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
}
.caipu-name {
    height: 70px;
    position: relative;
}
.user-avator {
    font-size: 12px;
    position: absolute;
    right: 0;
    top: 10px;
    text-align: center;
}
.caipu-name h1 {
    height: 70px;
    width: 200px;
    line-height: 70px;
}
.cai-img img {
    width: 640px;
    height: 426px;
    margin-top: 10px;
}
.cai-text {
    margin-top: 20px;
}
.cai-text span::before,
.cai-text span::after {
    content: "“";
    display: inline-block;
    text-indent: -10px;
    height: 24px;
    width: 30px;
    font-size: 40px;
    font-family: "宋体", "Hiragino Sans GB", STHeiti, "微软雅黑", "Microsoft YaHei";
    color: #bfbfbf;
    vertical-align: bottom;
}
.cai-text span::after {
    content: "”";
}
.caidetail {
    height: 60px;
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.caidetail h3 {
    display: inline-block;
    margin-left: 10px;
}
.cailiao {
    width: 638px;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
}
.cailiao span:hover {
    color: #ff6767;
    cursor: pointer;
}
fieldset {
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-bottom: 20px;
}
fieldset legend {
    margin-left: 50px;
    text-align: start;
    padding: 0 10px;
}
.buzhou {
    height: 165px;
    margin-bottom: 40px;
    display: flex;
    margin-left: 20px;
}
.buzhou img {
    width: 220px;
    height: auto;
}

.content {
    margin-left: 20px;
    font-size: 18px;
}
.content .id1 {
    width: 36px;
    height: 36px;
    /* background-color: sandybrown; */
    border-radius: 50%;
    text-align: center;
    line-height: 36px;
    border: 1px solid #ccc;
    margin: 22px 0 10px 0;
}
.qiaomen p:nth-last-of-type(1),
.qiaomen p:nth-last-of-type(2),
.qiaomen p:nth-last-of-type(3) {
    margin: 10px 0;
}
.qiaomen a {
    padding: 0 5px;
    text-decoration: navajowhite;
    color: #000;
}
.qiaomen a:hover {
    color: #ff6767;
}
</style>
