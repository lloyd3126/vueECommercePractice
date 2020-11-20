<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light shadow-sm fixed-top">
      <div class="container">
        <a :href="`${publicPath}#/`" class="text-dark d-flex align-items-center"
          ><img
            :src="`${publicPath}img/logo.png`"
            alt=""
            srcset=""
            width="158"
            class="mr-2"
        /></a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#MainNavbarFixedContent"
          aria-controls="MainNavbarFixedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          id="MainNavbarFixedContent"
          class="collapse navbar-collapse justify-content-end order-3 order-md-1"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                :href="`${publicPath}#/`"
                v-if="$route.path !== '/'"
                class="mx-2 link-hover font-weight-bold text-dark nav-link "
                >首頁</a
              >
            </li>
            <li class="nav-item">
              <a
                :href="`${publicPath}#/shop`"
                v-if="$route.path !== '/shop'"
                class="mx-2 link-hover font-weight-bold text-dark nav-link "
                >商品專區</a
              >
            </li>
            <li class="nav-item">
              <a
                :href="`${publicPath}#/shop?tag=cart`"
                v-if="$route.path !== '/shop'"
                class="mx-2 link-hover font-weight-bold text-dark nav-link "
                >購物車
                <span class="badge badge-danger">{{ cartsInVuexLength }}</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                v-if="isLogin"
                :href="`${publicPath}#/admin/products`"
                class="mx-2 link-hover font-weight-bold text-dark nav-link "
                >商品管理</a
              >
            </li>
            <li class="nav-item">
              <a
                v-if="!isLogin"
                :href="`${publicPath}#/login`"
                class="mx-2 link-hover font-weight-bold text-dark nav-link"
                >登入</a
              >
            </li>
            <li class="nav-item">
              <a
                id="logout"
                v-if="isLogin"
                @click="logout"
                class="mx-2 link-hover font-weight-bold text-dark nav-link "
                >登出</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    cartsInVuexLength() {
      return this.$store.getters.cartsInVuexLength;
    },
  },
  methods: {
    logout() {
      const vm = this;
      vm.$store.dispatch('logout');
    },
  },
};
</script>

<style scope>
.navbar-light {
  background-color: #fff;
}
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .navbar-light {
    background: none;
  }
}
</style>
