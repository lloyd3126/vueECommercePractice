import Vue from 'vue';
import VueRouter from 'vue-router';
import VueConfig from '../../vue.config.js';

// frontend
import Login from '../views/frontend/Login.vue';
import Cart from '../views/frontend/Cart.vue';
import Main from '../views/frontend/Main.vue';
import About from '../views/frontend/About.vue';
import Product from '../views/frontend/Product.vue';
// backend
import Dashboard from '../views/backend/Dashboard.vue';
import Products from '../views/backend/Products.vue';
import Orders from '../views/backend/Orders.vue';
import Coupons from '../views/backend/Coupons.vue';
import CustomerOrder from '../views/backend/CustomerOrder.vue';
import CustomerCheckout from '../views/backend/CustomerCheckout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { 
      requiresAuth: false, 
      title: '登入｜四分之一蛋糕工作室' 
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { 
      requiresAuth: false, 
      title: '購物車｜四分之一蛋糕工作室' 
    },
  },
  {
    path: '/',
    name: 'About',
    component: About,
    meta: { 
      requiresAuth: false, 
      title: '首頁｜四分之一蛋糕工作室' 
    },
  },
  {
    path: '/shop',
    name: 'Main',
    component: Main,
    meta: { 
      requiresAuth: false, 
      title: '商品專區｜四分之一蛋糕工作室' 
    }
  },
  { path: '/product/:productName',
    name: 'Product',
    component: Product,
    meta: { 
      requiresAuth: false, 
      title: '商品名｜四分之一蛋糕工作室'  
    }
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    meta: { 
      requiresAuth: true, 
      title: '主控台｜四分之一蛋糕工作室' 
    },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { 
          requiresAuth: true, 
          title: '主控台｜四分之一蛋糕工作室' 
        }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { 
          requiresAuth: true, 
          title: '主控台｜四分之一蛋糕工作室' 
        }
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: Coupons,
        meta: { 
          requiresAuth: true, 
          title: '主控台｜四分之一蛋糕工作室' 
        }
      },
      {
        path: 'simulation',
        name: 'Simulation',
        component: CustomerOrder,
        meta: { 
          requiresAuth: true, 
          title: '主控台｜四分之一蛋糕工作室' 
        }
      },
      {
        path: 'customer_checkout/:orderId',
        name: 'CustomerCheckout',
        component: CustomerCheckout,
        meta: { 
          requiresAuth: true, 
          title: '主控台｜四分之一蛋糕工作室' 
        }
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash', //history
  // base: process.env.BASE_URL
  base: VueConfig.publicPath,
  routes,
});

export default router;
