<template>
  <div class="register-box">
    <div class="input-box">
      <label for="phone">电话号码:</label>
      <input type="text" v-model="phone" id="phone" placeholder="请输入电话号码"/>
    </div>
    <div class="input-box">
      <label for="userPwd">用户密码:</label>
      <input type="text" v-model="userPwd" id="userPwd"  placeholder="请输入密码"/>
    </div>
    <div class="input-box">
      <label for="reUserPwd">确认密码:</label>
      <input type="text" v-model="reUserPwd" id="reUserPwd" placeholder="请输入密码"/>
    </div>
    <div>
      <button class="makeSure" @click="send" v-bind:disabled="this.btnShow">立即注册</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      userPwd: "",
      reUsePwd:'',
      prompt1: "",
      userSex: "",
      btnShow:true,
    };
  },
  mounted() {
    // 发起网络请求
    this.$axios.get("/verification").then((res) => {
      this.svg = res.data.data;
    });
  },
  methods: {
    async send() {
      // 前端判断
      if(!/^1[3-5|7|8]\d{9}^/.test(this.phone)){
        alert('电话号码格式错误，请重新输入')
        this.phone='';
        if(!/^/.test(this.userPwd)){
          alert('密码格式错误，字母加数字哦')
          if(this.userPwd!==this.reUsePwd){
            alert('两次密码不一致，请重新输入');
            this.userPwd='';
            this.reUsePwd='';
        }
        }
      }
      
      let userInfo = new FormData();
      // fileReader.append("userPic", this.userPic);
      userInfo.append("phone", this.phone);
      userInfo.append("userPwd", this.userPwd);
      // fileReader.append("svg", this.userSvg);
      // fileReader.append("userSex", this.userSex);
      // 发送注册的请求，并得到返回结果
      let myres = await this.$axios.post("/register", userInfo, {
        header: { "Content-Type": "pplication/x-www-form-urlencoded" },
      });
      // .then((res) => {res.data里面有404 以及注册等数据 })
      // 根据错误码执行相对应的逻辑
      if (myres.data.code == 4001) {
        this.mysvg = true;
      } else if (myres.data.code == 4002) {
        alert(myres.data.info)
        this.prompt1 = true;
      } else if (myres.data.code == 2001) {
        this.$router.push(
          `/MyUser/Login`
        );
        
      }
    },
  },
  components: {},
};
</script>

<style scoped>
.register-box{
  background-color: rgba(255, 255, 255, 0.5);
    padding-top: 20px;
}
.input-box{
    font-size: 18px;
    height: 40px;
    line-height: 40px;
}
.input-box label{
    padding-right: 10px;
}
.input-box input{
    height: 25px;
}
.makeSure{
    width: 70px;
    height: 30px;
    font-size: 14px;
}
</style>
