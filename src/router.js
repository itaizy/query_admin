const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/detail',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/detail/detail.vue'], resolve)
    }
    
];
export default routers;