import Vue from 'vue';
import Router from 'vue-router';

const BasicLayout = () => import('./layouts/BasicLayout.vue');
const LoginPage =  () => import('./views/login/index.vue');
const RegisterPage = () => import('./views/login/register.vue');
const OrderPage = () => import('./views/user/order/index.vue');

const HomePage = () => import('./views/home/index.vue');
const UserPage = () => import('./views/user/index.vue');
const CartPage = () => import('./views/cart/index.vue');
const OrderList = () => import('./views/user/order/orderList.vue');
const UserSettingsPage = () => import('./views/user/setting.vue');
const ChangePayPwdPage = () => import('./views/user/changes/PayPwd.vue');
const ChangeNicknamePage = () => import('./views/user/changes/Nickname.vue');
const BookDetailPage = () => import('./views/book/index.vue');
const CartOrderPage = () => import('./views/cart/order.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: BasicLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomePage,
        },
        {
          path: 'user',
          name: 'user',
          component: UserPage,
          meta: {
            auth: true
          },
          children: [
            {
              path: '/user/pay_pwd_change',
              component: ChangePayPwdPage,
            },
            {
              path: '/user/nickname_change',
              component: ChangeNicknamePage,
            },
            {
              path: '/user/setting',
              name: 'user-setting',
              component: UserSettingsPage
            },
            {
              path: '/user/order',
              redirect: '/user/order/all_list',
              component: OrderPage,
              children: [
                {
                  path: 'all_list',
                  name: 'all_list',
                  meta: {
                    status: 0
                  },
                  component: OrderList,
                },
                {
                  path: 'pay_list',
                  name: 'pay_list',
                  meta: {
                    status: 1,
                  },
                  component: OrderList,
                },
                {
                  path: 'finish_list',
                  name: 'finish_list',
                  meta: {
                    status: 2,
                  },
                  component: OrderList,
                }
              ]
            }
          ]
        },
        {
          path: 'cart',
          name: 'cart',
          component: CartPage,
        },
        {
          path: 'cart/order',
          meta: {
            auth: true
          },
          component: CartOrderPage,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/book/detail/:id',
      name: 'book-detail',
      component: BookDetailPage
    }
  ],
})
