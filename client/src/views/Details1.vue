<template>
  <div id="details">
    <!-- <LogoBar></LogoBar> -->
    <div id="content" class="w">
      <Section :foodData="foodDeatailData"></Section>
      <!-- <Aside></Aside> -->
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
// import LogoBar from "@/components/Details/header/LogoBar";
// import Footer from "@/components/Details/footer/Footer";
import Section from "@/components/Details/section/Section";
import Aside from "@/components/Details/aside/Aside";
console.log('菜品详情页')
export default {
  props: ["foodData"],
  data() {
    return {
      foodDeatailData: {},
    };
  },
  created() {
    this.foodDeatailData = this.$route.params;
  },
  components: {
    // LogoBar,
    // Footer,
    Section,
    Aside,
  },
};
</script>

<style scoped>
#details {
  margin-top: 40px;
}
#content {
  position: relative;
}
</style>
