import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
// element-ui
import ElementUI from "element-ui"; // 引入组件库
import "element-ui/lib/theme-chalk/index.css"; // 全局的css样式
import '@/assets/icon/iconfont.css';
import Vuex from "vuex";
import FoodCard from './components/Global/FoodCard.vue'
//引入vuex-persistedstate
import createPersistedState from 'vuex-persistedstate'
Vue.component('FoodCard', FoodCard)
Vue.use(ElementUI);
Vue.use(Vuex);
// 创建 vue 仓库
const store = new Vuex.Store({
    state: { userInfo:{} },
    mutations: {
        //默认传第一个参数传state
        userInfo(state, obj) {
            // 变更状态
            state.userInfo = obj;
        },
    },
});
// 配置全局的 axios 基础网址
axios.defaults.baseURL = "http://localhost:7001";
// 允许请求时携带 cookie
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
new Vue({
    render: (h) => h(App),
    router,
    // 为了在 Vue 组件中访问 this.$store property，你需要为 Vue 
    // 实例提供创建好的 store。Vuex 提供了一个从根组件向所有子组件，
    // 以 store 选项的方式“注入”该 store 的机制：
    store, // 挂载仓库
}).$mount("#app");
