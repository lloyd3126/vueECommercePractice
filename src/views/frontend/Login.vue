<template>
  <div>
    <MainNavbar />
    <form class="form-signin mt-5" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <label for="inputEmail" class="sr-only">電子郵件</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="電子郵件"
        required
        autofocus
        v-model="user.username"
      />
      <label for="inputPassword" class="sr-only">密碼</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="密碼"
        required
        v-model="user.password"
      />
      <div class="checkbox mb-3">
        <label> <input type="checkbox" value="remember-me" /> 記住我 </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        登入
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
    </form>
  </div>
</template>

<script>
import MainNavbar from '@/components/MainNavbar';
export default {
  name: 'Login',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      user: {
        username: '',
        password: '',
      },
    };
  },
  components: {
    MainNavbar,
  },
  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      vm.$store.commit('setIsLoading', true);
      vm.$http.post(api, vm.user).then((response) => {
        let { success } = response.data;
        if (success) {
          vm.$store.commit('setisLogin', true);
          vm.$store.commit('setIsLoading', false);
          vm.$router.push('/');
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
