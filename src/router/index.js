import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Cart from '../views/Cart.vue';
import About from '../views/About.vue';
import Dashboard from '../views/Dashboard.vue';
import Products from '../views/Products.vue';
import Product from '../views/Product.vue';
import Orders from '../views/Orders.vue';
import Coupons from '../views/Coupons.vue';
import CustomerOrder from '../views/CustomerOrder.vue';
import CustomerCheckout from '../views/CustomerCheckout.vue';
import Main from '../views/Main.vue';
import VueConfig from '../../vue.config.js';

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
