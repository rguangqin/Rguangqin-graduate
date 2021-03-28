<template>
  <div class="mySelf-box">
    <div class="revise">
      <div class="avator">
        <span>头像：</span>
        <div>
          <label for="img"><img :src="avator" alt=""></label>
          <input type="file" id="img" @change="dealAvator($event)" v-show="false">
        </div>
      </div>
      <div class="userName">
        <span>昵称：</span>
        <input type="text" v-model="userInfo.userName">
      </div>
      <div class="sex">
        <span>性别：</span>
        <input class="sex1" type="radio" value="男" v-model='userInfo.userSex'/>男
        <input class="sex1" type="radio" value="女" v-model='userInfo.userSex'/>女
      </div>
      <div class="says">
        <span>个性签名：</span>
        <input type="text" v-model="userInfo.says">
      </div>
      <div class="reviseBtn"><button @click="revise">确认修改</button></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        avator:"",
        sex:'',
        avatorFile:'',
        userInfo:{},
      }
    },
  methods: {
    dealAvator(event){
      const file = new FileReader();
      this.avatorFile = event.target.files[0];
      file.readAsDataURL(event.target.files[0])
      file.onload = (e) => {
        this.avator = e.target.result;
      }
    },
   async revise(){
      const formdata = new FormData();
      formdata.append('userPic',this.avatorFile);
      formdata.append('userName',this.userInfo.userName);
      formdata.append('userSex',this.userInfo.userSex);
      formdata.append('says',this.userInfo.says);
      formdata.append('oldUserPic', this.avator);
      formdata.append('phone',window.localStorage.getItem('phone'));
      const res = await this.$axios.post('/revise',formdata,{
        header: { "Content-Type": "pplication/x-www-form-urlencoded" },
      })
      if(res.data.code === 2002) alert(res.data.info);
      else if(res.data.code === 4004) alert(res.data.info)
    }
  },
  async mounted() {
    const result = await this.$axios.get('/userinfo',{params:{userId:window.localStorage.getItem('userId')}});
    this.userInfo =  result.data[0];
    this.avator = result.data[0].userPic;
  },
};
</script>

<style scoped>
.mySelf-box{
  margin-left: 120px;
}
.avator img{
  widows: 200px;
  height: 200px;
  border: #000000;
  border-radius: 50%;
}
.avator{
  display: flex;
  align-items: center;
}
.revise div{
  padding: 24px 0;
}
.revise span{
  font-size: 20px;
  margin-right: 20px;
}
.revise input:not(.sex1){
  width: 300px;
  line-height: 40px;
  outline: none;
  font-size: 20px;
  padding: 0 10px;
}
.revise .sex{
  font-size: 20px;
}
.sex input{
  margin: 10px;
}
.reviseBtn button{
  padding: 5px;
  font-size: 20px;
  outline: none;
  color: #FF6767;
  border-radius: 10px;
  border: 1px solid #FF6767;
  background-color: #ffffff;
}
</style>
