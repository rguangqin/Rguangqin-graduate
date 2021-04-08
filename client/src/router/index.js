import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
    {
        // 首页
        path: "/",
        name: "Index",
        component: () => import("../views/Index.vue"),
    },
    {
        // 菜谱细节
        path: "/Details/:id",
        name: "Details",
        component: () => import("../views/Details.vue"),
    },
    {
        // 搜索栏
        path: "/Search",
        name: "Search",
        component: () => import("../views/Search.vue"),
    },
    {
        // 登录注册
        path: "/MyUser",
        name: "MyUser",
        component: () => import("../views/MyUser.vue"),
        redirect: "/MyUser/Login",
        children: [
            {
                path: "Login",
                name: "Login",
                component: () => import("@/components/MyUser/Login.vue"),
            },
            {
                path: "Register",
                name: "Register",
                component: () => import("@/components/MyUser/Register.vue"),
            },
        ],
    },
    {
        // 发表各种、个人中心、收藏，个人中心
        path: "/Publish",
        name: "Publish",
        component: () => import("../views/Publish.vue"),
        redirect:'/Publish/user',
        children: [
            {
                // 修改个人信息
                path: "user",
                name: "user",
                component: () => import("@/components/Publish/user.vue"),
                redirect:'/Publish/user/userinfo',
                children:[
                    {
                        path:'userinfo',
                        name:'userinfo',
                        component:() => import("@/components/Publish/detail/userInfo.vue")
                    },
                    {
                        path:'userpwd',
                        name:'userpwd',
                        component:() => import("@/components/Publish/detail/userpwd.vue")
                    }
                ]
            },
            {
                // 菜谱部分
                path: "MyBook",
                name: "MyBook",
                component: () => import("@/components/Publish/MyBook.vue"),
                redirect:'/Publish/MyBook/caipu',
                children:[
                    {
                        // 查看自己发布的菜谱
                        path:"caipu",
                        component:() => import("@/components/Publish/detail/caipu.vue"),
                    },
                    {
                        // 发布菜谱
                        path:"fabu",
                        component:()=>import("@/components/Publish/detail/fabu.vue")
                       }
                ]
               
            },
            {
                path: "Favorite",
                name: "Favorite",
                component: () => import("@/components/Publish/Favorite.vue"),
                redirect:'/Publish/Favorite/favorite',
                children:[
                    {
                        path:"favorite",
                        component:() => import("@/components/Publish/detail/Favorite.vue")
                    },
                ]
            },
        ],
    },
    {
        path:'/Book/:id',
        name:'Book',
        component:() => import("@/components/Book/BookDetail.vue"),
    },
    {
        // 表示某一个用户发表的菜谱
        path:'/userDetail/:id',
        name:'userDetail',
        component:() => import("../views/userDetail.vue")
    },
    {
        path:'/ClassifyBook',
        name:'ClassifyBook',
        component:()=>import("../views/ClassifyBook.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
// 全局前置守卫 访问拦截
router.beforeEach((to1, from, next) => {
	if (to1.path == "/" || to1.path == "/MyUser/Login" || to1.path == "/MyUser/Register" || to1.path == "/Details/"+to1.params.id || to1.path == "/Book/"+to1.params.id) {
		next()
	}else {
		//判断是否登录过
		// 如果登录过:放行
		//如果没登录过:指定他去登录页面
		var flag = localStorage.getItem("islogin")
		if (flag) {
			next()
		} else {
            alert("未登录，请先登录")
			next("/MyUser/Login")
		}
	}
});
export default router;
