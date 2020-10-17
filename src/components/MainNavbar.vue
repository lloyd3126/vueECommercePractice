<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light shadow-sm">
      <div class="container">
        <a href="/#/" class="text-dark d-flex align-items-center"
          ><img
            :src="`${publicPath}img/logo.png`"
            alt=""
            srcset=""
            width="158"
            class="mr-2"
        /></a>
        <div
          id="navbarSupportedContent"
          class="collapse navbar-collapse justify-content-end order-3 order-md-1"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                href="/#/login"
                class="mx-2 link-hover font-weight-bold text-dark nav-link "
                >商品管理</a
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
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      const vm = this;
      this.$http.post(api, vm.user).then((response) => {
        let { success } = response.data;
        if (success) {
          vm.$router.push('/login');
        }
      });
    },
  },
};
</script>
