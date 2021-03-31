<template>
  <div class="login-box">
    <div class="input-box">
      <label for="phone">电话号码:</label>
      <input
        id="phone"
        type="text"
        v-model="phone"
        placeholder="请输入您的电话号码"
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
      <label for="password">用户密码:</label>
      <input
        id="password"
        type="text"
        v-model="userPwd"
        placeholder="请输入您的密码"
      />
    </div>
    <div :class="this.userPwd ? 'errTip' : 'tip'">
      <span v-show="!(this.userPwd && /^[A-z]{3}\w{3,9}/.test(this.userPwd))">{{
        this.userPwd && !/^[A-z]{3}\w{3,9}/.test(this.userPwd)
          ? "密码号码格式错误"
          : "密码由3位字母和3-6位数字构成"
      }}</span>
    </div>
    <button class="makeSure" @click="login">立即登录</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      userPwd: "",
    };
  },
  mounted() {
    this.phone = this.$route.query.phone;
    this.userPwd = this.$route.query.userPwd;
  },
  methods: {
    toRegister() {
      this.$router.push("/Register");
    },
    async login() {
      const params = {
        phone: this.phone,
        userPwd: this.userPwd,
      };
      let loginRes = await this.$axios.post("/login", params);
      if (loginRes.data.code == 2002) {
        // 登陆成功,先缓存，再跳转
        // 前端缓存
        window.localStorage.setItem("userId", loginRes.data.userId);
        window.localStorage.setItem("islogin", true);
        for(let key in params){
          window.localStorage.setItem(key,params[key])
        }
        this.$router.push("/");
      } else if (loginRes.data.code == 4005) {
        // 账号或密码错误
        this.tip = true;
      }
    },
  },
};
</script>
<style scoped>
.login-box {
  background-color: rgba(255, 255, 255, 0.5);
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
