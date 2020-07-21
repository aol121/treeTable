import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/table'
        },
        {
            path: '/table',
            component: () => import(/* webpackChunkName: "table" */ '../components/page/table.vue'),
        },
    ]
});
