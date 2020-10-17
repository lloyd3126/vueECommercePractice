<template>
  <div class="home">
    <button type="button" class="btn btn-primary m-1" @click.prevent="logout">
      登出
    </button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    // HelloWorld
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
