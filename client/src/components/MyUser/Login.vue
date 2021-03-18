<template>
    <div class="login-box">
        <div class="userPhone input-box">
            <label for="phone">电话号码:</label>
            <input id="phone" type="text" v-model="phone" placeholder="请输入您的电话号码" />
        </div>
        <div class="errTip" v-if="this.phone&&!/^1[3-5|7-8]\d{9}$/.test(this.phone)"><span>电话号码格式错误</span></div>
        <div class="userPassword input-box">
            <label for="password">用户密码:</label>
            <input id="password" type="text" v-model="userPwd" placeholder="请输入您的密码" />
        </div>
        <div class="errTip" v-if="this.userPwd&&!/^[A-z]{3}\w{3,9}/.test(this.userPwd)"><span>{{this.userPwd ? '密码格式错误' : '密码由3位字母和3到6位数字构成'}}</span></div>
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
            let loginRes = await this.$axios.post("/login", {
                phone: this.phone,
                userPwd: this.userPwd,
            });
            if (loginRes.data.code == 2002) {
                // 登陆成功,先缓存，再跳转
                // 前端缓存
                window.localStorage.setItem("islogin", true);
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
.login-box{
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
.errTip{
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    color: #ff0000;
}
.makeSure{
    width: 70px;
    height: 30px;
    font-size: 14px;
}
</style>
