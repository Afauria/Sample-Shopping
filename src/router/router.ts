import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/list',
        meta: {
            title: '商品列表'
        },
        component: () => import("../pages/ProductList.vue")
    },
    {
        path: '/product/:id',
        meta: {
            title: '商品详情'
        },
        component: () => import("../pages/ProductDetail.vue")
    },
    {
        path: '/cart',
        meta: {
            title: '购物车'
        },
        component: () => import("../pages/Cart.vue")
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/list'
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    // const role = localStorage.getItem('ms_username');
    // if (!role && to.path !== '/login') {
    //     next('/login');
    // } else if (to.meta.permission) {
    //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //     role === 'admin'
    //         ? next()
    //         : next('/403');
    // } else {
    //     next();
    // }
    next();
});

export default router;