import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from './views/login/index.vue';
import IndexPage from './views/app/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
  ],
});
