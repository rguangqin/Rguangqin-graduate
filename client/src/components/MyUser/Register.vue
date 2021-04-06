<template>
  <div class="register-box">
    <div class="input-box">
      <label for="phone">电话号码:</label>
      <input
        type="text"
        v-model="phone"
        id="phone"
        placeholder="请输入电话号码"
      />
    </div>
    <div :class="this.phone ? 'errTip' : 'tip'">
      <span v-show="!(this.phone && /^1[3-5|7-8]\d{9}$/.test(this.phone))">{{
        this.phone && !/^1[3-5|7-8]\d{9}$/.test(this.phone)
          ? "电话号码格式错误"
          : "请输入11位的电话号码"
      }}</span>
    </div>
    <div class="input-box">
      <label for="userPwd">用户密码:</label>
      <input
        type="text"
        v-model="userPwd"
        id="userPwd"
        placeholder="请输入密码"
      />
    </div>
    <div :class="this.userPwd ? 'errTip' : 'tip'">
      <span v-show="!(this.userPwd && /^[A-z]{3,6}\w{3,9}/.test(this.userPwd))">{{
        this.userPwd && !/^[A-z]{3,6}\w{3,9}/.test(this.userPwd)
          ? "密码号码格式错误"
          : "密码由3位字母和3-6位数字构成"
      }}</span>
    </div>
    <div class="input-box">
      <label for="reUserPwd">确认密码:</label>
      <input
        type="text"
        v-model="reUserPwd"
        id="reUserPwd"
        placeholder="请输入密码"
      />
    </div>
    <div :class="this.reUserPwd ? 'errTip' : 'tip'">
      <span v-show="!(this.reUserPwd && /^[A-z]{3,6}\w{3,9}/.test(this.reUserPwd))">{{
        this.reUserPwd && !/^[A-z]{3,6}\w{3,9}/.test(this.reUserPwd)
          ? "密码号码格式错误"
          : "密码由3位字母和3-6位数字构成"
      }}</span>
    </div>
    <div>
      <button class="makeSure" @click="send">立即注册</button>
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
      reUserPwd: "",
      userSex: "",
      btnShow: true,
    };
  },
  methods: {
    async send() {
      // 前端判断
      if (this.phone && this.userPwd && this.reUserPwd) {
        if (!/^1[3-5|7-8]\d{9}$/.test(this.phone)) {
          alert("电话号码格式错误，请重新输入！");
          this.phone = "";
        }else if(!/^[A-z]{3,6}\w{3,9}/.test(this.userPwd) || !/^[A-z]{3,6}\w{3,9}/.test(this.reUserPwd)){
          alert('密码格式错误，请重新输入！')
          this.userPwd='';
          this.reUserPwd = '';
        }else if(this.userPwd !== this.reUserPwd){
          alert('两次密码不一致，请重新输入！')
          this.userPwd='';
          this.reUserPwd = '';
        }else{
          let userInfo = new FormData();
          userInfo.append("phone", this.phone);
          userInfo.append("userPwd", this.userPwd);
          // 发送注册的请求，并得到返回结果
          let myres = await this.$axios.post("/register", userInfo, {
            header: { "Content-Type": "pplication/x-www-form-urlencoded" },
          });
          if (myres.data.code == 4002) {
              alert(myres.data.info);
              this.phone =  "";
              this.userPwd= "";
              this. reUserPwd= "";
            } else if (myres.data.code == 2001) this.$router.push(`/MyUser/Login`);
        }
      } else alert('不能为空哟！') 
    },
  },
  components: {},
};
</script>

<style scoped>
.register-box {
  background-color: rgba(255, 255, 255, 0.8);
  padding-top: 20px;
}
.input-box {
  font-size: 18px;
  height: 40px;
  line-height: 40px;
}
.input-box label {
  padding-right: 10px;
}
.input-box input {
  height: 25px;
  outline: medium;
}
.errTip {
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  color: #ff0000;
}
.tip {
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  color: #00ff00;
}
.makeSure {
  width: 70px;
  height: 30px;
  font-size: 14px;
}
</style>
