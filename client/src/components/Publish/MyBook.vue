<template>
  <div id="myBook">
    <div class="my">
      <div>
      </div>
    </div>
     <router-view></router-view>
  </div>
</template>

<script>
export default {
 data() {
   return {
     
   }
 },
};
</script>

<style scoped>
#myBook {
  margin-left: 135px;
  padding-top: 15px;
}
.my {
  display: flex;
  margin-right:25px; 
  justify-content: space-between;
}
.my-left a {
  text-decoration: none;
  font-weight: 400;
  display: inline-block;
  font-size: 18px;
  margin-right: 20px;
  color: #656565;
  padding-bottom: 5px;
   border-bottom: 2px  solid transparent;
}
.my-left a:hover {
  color: #FFBE00;
  border-bottom: 2px solid #FFBE00;
}
.my-right{
  text-decoration: none;
  background-color:#FFBE00;
  color: white;
  padding: 3px 5px;
  border-radius: 5px;
  margin-bottom: 5px;
}
</style>
