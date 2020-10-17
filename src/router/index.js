import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Products from '../views/Products.vue';
import Orders from '../views/Orders.vue';
import Coupons from '../views/Coupons.vue';
import CustomerOrder from '../views/CustomerOrder.vue';
import CustomerCheckout from '../views/CustomerCheckout.vue';
import Main from '../views/Main.vue';


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
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { requiresAuth: true },
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: Coupons,
        meta: { requiresAuth: true },
      },
      {
        path: 'simulation',
        name: 'Simulation',
        component: CustomerOrder,
        meta: { requiresAuth: true },
      },
      {
        path: 'customer_checkout/:orderId',
        name: 'CustomerCheckout',
        component: CustomerCheckout,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash', //history
  base: process.env.BASE_URL,
  routes,
});

export default router;
