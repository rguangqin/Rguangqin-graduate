<template>
  <div class="mySelf-box">
    <div class="revise">
      <div class="avator">
        <p>头像：</p>
        <div>
          <label for="img"><img :src="avator" alt=""></label>
          <input type="file" id="img" @change="dealAvator($event)" v-show="false">
        </div>
      </div>
      <div class="userName">
        <p>昵称：</p>
        <input type="text" v-model="userInfo.userName">
      </div>
      <div class="sex">
        <p>性别：</p>
        <input class="sex1" type="radio" value="男" v-model='userInfo.userSex'/>男
        <input class="sex1" type="radio" value="女" v-model='userInfo.userSex'/>女
        <input class="sex1" type="radio" value="保密" v-model='userInfo.userSex'/>保密
      </div>
      <div class="says">
        <p>个性签名：</p>
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
        // 表示上传文件的变量
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
      if(!this.userInfo.userName||!this.userInfo.says){
        alert('信息不能为空哟！')
      }else{
        formdata.append('userPic',this.avatorFile);
        formdata.append('userName',this.userInfo.userName);
        formdata.append('userSex',this.userInfo.userSex);
        formdata.append('says',this.userInfo.says);
        formdata.append('oldUserPic', this.avator);
        formdata.append('phone',window.localStorage.getItem('phone'));
        const res = await this.$axios.post('/revise',formdata,{
          header: { "Content-Type": "pplication/x-www-form-urlencoded" },
        })
        if(res.data.code === 2002) {
          alert(res.data.info);
          // 将修改后的数据修改到store里面去
          const obj = {userName:this.userInfo.userName,
                       userPic:this.avator,
                       userSex:this.userSex,
                       says:this.userInfo.says};
          this.$store.commit('userInfo',obj)
        }
        else if(res.data.code === 4004) alert(res.data.info)
        }
    }
  },
  async mounted() {
    if(window.localStorage.getItem('userId')){
      const result = await this.$axios.get('/userinfo',{params:{userId:window.localStorage.getItem('userId')}});
      this.userInfo =  result.data[0];
      this.avator = result.data[0].userPic;
    }
  },
};
</script>

<style scoped>
.mySelf-box{
  margin-left: 120px;
}
.revise{
  font-size: 14px;
  color: #918989;
}
.avator img{
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.revise p{
  padding: 12px;
}
.revise input{
  margin-left: 12px;
  line-height: 30px;
  font-size: 16px;
  outline: none;
  padding-left: 10px;
}
.reviseBtn button{
  line-height: 30px;
  background-color: #ffffff;
  font-size: 18px;
  border: 2px solid #FFBE00;
  border-radius: 6px;
  color: #FFBE00;
  margin: 12px;
  outline: none;
}
</style>
