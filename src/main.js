import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate';
import { email, required, numeric } from 'vee-validate/dist/rules';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';
import Clipboard from 'v-clipboard'

import App from './App.vue';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Clipboard)
axios.defaults.withCredentials = true;
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
localize('zhTW', zhTW);
extend('email', email);
extend('required', {
  ...required,
  message: '此欄位不得為空'
});
extend('numeric', {
  ...numeric,
  message: '此欄位只能輸入數字'
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  // if (from.matched[0].path == '/admin') {
  //   console.log(to.matched[1].path.replace('/admin/', ''));
  // }
  const { requiresAuth } = to.meta;
  // console.log(requiresAuth);
  if (requiresAuth) {
    // console.log('這裡需要驗證');
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    const vm = this;
    axios.post(api).then((response) => {
      let { success } = response.data;
      if (success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
