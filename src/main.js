import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant, { Lazyload, Toast } from 'vant';
import VueTouch from 'vue-touch';
import VueCookies from 'vue-cookies'
import services from '@/services/index.js';
import { encrypt, decrypt } from '@/utils/utils.js';
import isEmpty from 'lodash/isEmpty';
import './components/index.js';
import './event';
import 'amfe-flexible';
import 'normalize.css';
import 'vant/lib/index.css';

// VueTouch.config.press = {
//   threshold: 1000
// }

Vue.use(services);
Vue.use(Vant);
Vue.use(VueCookies);
Vue.use(Lazyload, {
  lazyComponent: true,
  error: require('@/assets/error.png'),
});
Vue.use(VueTouch);

Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
  if (isEmpty(store.state.user)) {
    const username = decrypt(window.$cookies.get('username') || "");
    const password = decrypt(window.$cookies.get('password') || "");
    if (username && password && to.fullPath !== '/login') {
      try {
        await store.dispatch('login', { username, password });
      } catch (e) {
        next('/login')
      }
    } else {
      if (to.matched.find(r => r.meta.auth)) {
        Toast('请先登录')
        next('/login')
      }
    }
    next();
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
