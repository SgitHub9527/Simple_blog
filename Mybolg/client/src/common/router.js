//引入路由
import { createRouter, createWebHashHistory } from "vue-router";
//首页
const routes = [
        //起始页
        {
            path: '/',
            name: 'Index',
            component: () =>
                import ('../views/home/Index.vue')
        },
        // 首页
        {
            path: '/home',
            name: 'Home',
            component: () =>
                import ('../views/home/Home.vue')
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () =>
                import ('../views/home/Dashboard.vue')
        },
        //登录
        {
            path: '/login',
            name: 'Login',
            component: () =>
                import ('../views/Login.vue')
        },
        //登录成功跳转后台
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () =>
                import ('../views/dashboard/Dashboard.vue'),
            children: [{
                    path: '/dashboard/article',
                    name: 'Article',
                    component: () =>
                        import ('../views/dashboard/Article.vue')
                },
                {
                    path: '/dashboard/classify',
                    name: 'Classify',
                    component: () =>
                        import ('../views/dashboard/Classify.vue')
                }
            ]
        }
    ]
    // 路由器
const router = createRouter({
        //哈希模式
        history: createWebHashHistory(),
        routes
    })
    // 对外暴露
export { router, routes }