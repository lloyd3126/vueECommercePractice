<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column">
          <li class="nav-item" @click="checkRoute('products')">
            <h6>
              <router-link
                to="/admin/products"
                :class="{
                  'nav-link': true,
                  active: status.pageName == 'products',
                }"
              >
                <i class="fas fa-box-open"></i>
                產品列表
              </router-link>
            </h6>
          </li>
          <li class="nav-item" @click="checkRoute('orders')">
            <h6>
              <router-link
                to="/admin/orders"
                :class="{
                  'nav-link': true,
                  active: status.pageName == 'orders',
                }"
              >
                <i class="fa fa-list-alt" aria-hidden="true"></i>
                訂單列表
              </router-link>
            </h6>
          </li>
          <li class="nav-item" @click="checkRoute('coupons')">
            <h6>
              <router-link
                to="/admin/coupons"
                :class="{
                  'nav-link': true,
                  active: status.pageName == 'coupons',
                }"
              >
                <i class="fa fa-ticket" aria-hidden="true"></i>
                優惠卷
              </router-link>
            </h6>
          </li>
        </ul>

        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item" @click="checkRoute('simulation')">
            <h6>
              <router-link
                to="/admin/simulation"
                :class="{
                  'nav-link': true,
                  active: status.pageName == 'simulation',
                }"
              >
                <i class="fas fa-shopping-cart"></i>
                模擬訂單
              </router-link>
            </h6>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      status: {
        pageName: '',
      },
    };
  },
  methods: {
    checkRoute(pageName) {
      if (this.status.pageName !== pageName) {
        this.status.pageName = pageName;
        this.isLoading = true;
        this.$router.afterEach((to, from) => {
          this.isLoading = false;
        });
      }
    },
  },
  created() {
    this.status.pageName = this.$route.path.replace('/admin/', '');
  },
};
</script>
