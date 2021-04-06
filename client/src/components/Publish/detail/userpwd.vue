<template>
  <div class="pwd-box">
    <div class="pwd">
      <div>
        <span>当前密码：</span><input type="password" v-model='nowPwd'>
      </div>
      <div>
        <span>新密码：</span><input type="password" v-model='pwd'>
      </div>
      <div>
        <span>再次输入新密码：</span><input type="password" name="" id="" v-model='rePwd'>
      </div>
      <div class="btn" @click='modifyPwd'>确认修改</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nowPwd:'',
      pwd:'',
      rePwd:'',
    }
  },
  methods: {
    // 修改密码
    async modifyPwd(){
      // 三个全部为空
      if(this.nowPwd && this.pwd && this.rePwd){
        // 判断密码是否符合正则表达式
        if(!/^[A-z]{3,6}\w{3,9}/.test(this.nowPwd) || !/^[A-z]{3,6}\w{3,9}/.test(this.pwd) || !/^[A-z]{3,6}\w{3,9}/.test(this.rePwd)){
          alert('密码格式错误')
        }else if(this.pwd !== this.rePwd){
          alert('两次密码不一致')
        }else{
          const params = {
            nowPwd:this.nowPwd,
            rePwd:this.rePwd,
            phone:window.localStorage.getItem('phone')
          }
          const res = await this.$axios.get('/modifyPwd',{params});
          if(res.data.code === 4001) {
            // 表示当前密码错误
            alert(res.data.info);
            this.nowPwd = '';
          }
          else if(res.data.code === 2001){
            // 表示修改成功
            alert(res.data.info)
            window.localStorage.clear();
            this.$router.push({name:'Login'})
          }else if(res.date.code === 4002){
            // 修改失败
            alert(res.data.info)
          }
        }
      }else alert('不能为空哟！')
    }
  },
  
}
</script>
<style scoped>
.pwd-box{
  width: 100%;
}
.pwd{
  margin: 0 0 0 150px;
}
.pwd div{
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.pwd div span{
  font-size: 14px;
  color:#ccc
}
.pwd div input{
  width: 200px;
  outline: none;
  padding: 5px;
}
.btn{
  font-size: 16px;
  border: 1px solid #ccc;
  width: 70px;
  text-align: center;
  line-height: 30px;
}
</style>