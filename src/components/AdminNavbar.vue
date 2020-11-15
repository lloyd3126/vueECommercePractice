<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" :href="`${publicPath}#/`"
        >四分之一蛋糕工作室</a
      >
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click="logout">登出</a>
        </li>
      </ul>
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
      const vm = this;
      vm.$store.dispatch('logout');
      vm.$router.push('/');
    },
  },
};
</script>
