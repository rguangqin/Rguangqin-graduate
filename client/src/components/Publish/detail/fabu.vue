<template>
  <div class="dish-box">
    <!-- 菜谱名称 -->
    <div class="dish-name">
      <p>菜谱名称</p>
      <input type="text" v-model="dishName"/>
    </div>
    <!-- 上传菜谱成品图片 -->
    <div class="upload-resultImg">
      <div class="usertext">上传成品图</div>
        <label for="food-image"><img :src="resultImgShow" alt="图片加载失败" /></label>
        <input type="file" @change="file1Change($event)" id='food-image' v-show='false'/>
    </div>
    <!-- 菜谱描述 -->
    <div class="dish-descripte">
      <p>菜谱描述(最多输入200个字符)</p>
      <textarea name="txt" clos="100" rows="5" maxlength="200" v-model="dishDes"></textarea>
    </div>
    <!-- 食材明细 -->
    <div class="food-detail">
      <h2>食材明细</h2>
      <div class="detail" v-for="(el,index) in ingredient" :key="index">
        <input type="text" v-model="el.name" readonly="true" />
        <input type="text" v-model="el.content"/>
      </div>
    </div>
    <!-- 菜谱步骤图片批量上传 -->
    <div>
      <div class="usertext">上传所有步骤图片</div>
      <input type="file" multiple="multiple" @change="file2Change($event)" />
    </div>
    <!-- 菜谱的步骤 -->
    <div class="dish-step">
      <div v-if="this.stepImgShow.length">
        <div
          class="stepImg"
          v-for="(el, index) in stepImgShow"
          :key="index"
        >
          <img :src="el" alt="" />
          <textarea v-model="stepText[index]"></textarea>
        </div>
      </div>
    </div>
    <div class="careful">
      <h2>小窍门</h2>
      <textarea v-model="careful"></textarea>
    </div>
    <!-- 确认发布 -->
    <div @click="getSure()" class="getSure">确认发布</div>
  </div>
</template>
<script>
import defaultImg from "@/image/defaultimg.jpg"
export default {
  data() {
    return {
      dishName:'',
      dishDes:'',
      careful:'',
      // 食材
      ingredient:[{name:'主料', content:''},{name:'辅料', content:''},{name:'其他', content:''}],
      resultImgFlag: false,
      resultImgShow: defaultImg,
      resultImg: '',
      stepImgShow: [],
      stepImgs: {},
      stepText: [],
    };
  },
  methods: {
    async getSure() {
      let formData = new FormData();
      const data = {}
      data.ingredient = this.ingredient;
      data.stepText = this.stepText;
      data.name = this.dishName;
      data.careful = this.careful;
      data.description = this.dishDes;
      data.userId = window.localStorage.getItem('userId');
      formData.append("stepImgs", this.resultImg);
      // 查看步骤里面是否有空字符的
      // 表示找到空字符
      // 查看食材里面content里面是否含有空
      for (let key in this.stepImgs) {
        formData.append("stepImgs", this.stepImgs[key]);
      }
      const a = this.ingredient.filter(e =>e.content === '')
      // if(!this.dishName || !this.resultImg || !this.dishDes || a.length || this.stepText.length || this.stepText.indexOf('')===-1 || !this.careful){
      //   alert('不能为空哟')
      // }
      // else{
        formData.append("data", JSON.stringify(data));
        const res = await this.$axios.post("/fabucaipu",formData, {
          header: { "Content-Type": "pplication/x-www-form-urlencoded" },
        });
        if(res.data.code===2002){
          alert(res.data.info);
          this.$router.push({ name: "MyBook"})
        } else if(res.data.code === 4004){
          alert(res.data.info)
        }
        // }
    },
    // 菜谱成品图片展示的处理
    file1Change(even) {
      this.resultImgFlag = true;
      const file = new FileReader();
      this.resultImg = even.target.files[0];
      // 读取为URL格式的Base64字符串以表示所读取文件的内容
      // 读取的方式为下面这个时，会触发onload函数
      file.readAsDataURL(even.target.files[0]);
      file.onload = (event) => {
        this.resultImgShow = event.target.result;
      };
    },
    // 步骤图片的显示处理选择
    file2Change(event) {
      this.stepImgs = [];
      this.stepImgShow = [];
      const files = event.target.files;
      //将获取的文件赋值给变量stepImgs
      this.stepImgs = files;
      for (let key in files) {
        const f = new FileReader();
        f.readAsDataURL(files[key]);
        f.onload = (event) => {
          this.stepImgShow.push(event.target.result);
        };
      }
    },
  },
};
</script>
<style scoped>
textarea{
  /* 去掉文本框下面的小三角 */
  resize: none;
  outline: none;
  padding: 5px;
}
/* 菜谱名称 */
.dish-name input {
  margin-top: 20px;
  font-size: 20px;
  outline: none;
  width: 200px;
  line-height: 30px;
  padding: 5px;
}
.upload-resultImg img{
  height: 200px;
  width: auto;
}
/* 菜谱描述 */
.dish-descripte textarea {
  margin-top: 20px;
  width: 400px;
  height: 180px;
  font-size: 18px;
  line-height: 30px;
}
.usertext {
  color: #474141;
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.dish-step textarea {
  width: 200px;
  height: 170px;
  resize: none;
  font-size: 18px;
}
.dish-step .stepImg img{
  width: 200px;
  height: 200px;
}
.detail {
  display: flex;
  flex-direction: column;
}
.detail input {
  margin-top: 10px;
}
.detail input:first-child {
  font-size: 18px;
  width: 50px;
  border: none;
  outline: none;
}
.detail input:nth-child(2) {
  font-size: 18px;
  width: 200px;
  outline: none;
  font-size: 16px;
  padding: 5px;
}
.getSure {
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #FFBE00;
  color: white;
  border-radius: 5px;
  margin-top: 15px;
}
.careful textarea{
  width: 300px;
  height: 200px;
  font-size: 16px;
  line-height: 20px;
}
</style>