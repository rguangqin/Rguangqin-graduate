<template>
  <div id="details">
    <LogoBar></LogoBar>
    <Advertising></Advertising>
    <div id="content" class="w">
      <Section :foodData="foodDeatailData"></Section>
      <Aside></Aside>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import LogoBar from "@/components/Details/header/LogoBar";
import Advertising from "@/components/Details/header/Advertising";
// import Content from "@/components/Details/Content";
import Footer from "@/components/Details/footer/Footer";
import Section from "@/components/Details/section/Section";
import Aside from "@/components/Details/aside/Aside";
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
    LogoBar,
    Advertising,
    Footer,
    // Content,
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
