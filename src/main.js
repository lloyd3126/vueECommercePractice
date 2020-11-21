import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate';
import { email, required, numeric, length } from 'vee-validate/dist/rules';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';
import Clipboard from 'v-clipboard'
import Notify from 'vue2-notify'

import App from './App.vue';
import router from './router';
import store from './store';
import './bus';
import currencyFilter from './filters/currency';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Clipboard)
Vue.use(Notify)
axios.defaults.withCredentials = true;
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
localize('zhTW', zhTW);
extend('email', email);
// extend('length', length);
extend('required', {
  ...required,
  message: '此欄位不得為空'
});
extend('numeric', {
  ...numeric,
  message: '此欄位只能輸入數字'
});
extend('characters', {
  validate(value, { length }) {
    return value.length <= parseInt(length);
  },
  params: ['length'],
  message: '此欄位輸入長度不得超過 {length}'
});


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  const { requiresAuth, title } = to.meta;
  // console.log(requiresAuth);
  if (title) {
    document.title = title;
  }
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
