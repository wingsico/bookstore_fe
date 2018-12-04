import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import VueCookies from 'vue-cookies'
import services from '@/services/index.js';
import { login } from '@/services/user.js';
import { encrypt, decrypt } from '@/utils/utils.js';
import isEmpty from 'lodash/isEmpty';
import './components/index.js';
import 'amfe-flexible';
import 'normalize.css';
import 'vant/lib/index.css';


Vue.use(services);
Vue.use(Vant);
Vue.use(VueCookies)

Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
  if (isEmpty(store.state.user)) {
    const username = decrypt(window.$cookies.get('username') || "");
    const password = decrypt(window.$cookies.get('password') || "");
    if (username && password) {
      await store.dispatch('login', { username, password });
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
