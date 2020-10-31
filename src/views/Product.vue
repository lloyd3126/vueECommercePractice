<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <MainNavbar />
    <div class="container">
      <div class="row mb-3 justify-content-center">
        <div class="col-md-8 col-12 mt-2">
          <h2 class="mt-3 mb-2">{{ products[0].title }}</h2>
          <p class="mb-1">{{ products[0].description }}</p>
          <p class="mb-1">{{ products[0].content }}</p>
          <hr />
        </div>
        <div class="col-md-8 col-12 mt-2">
          <div
            id="carouselExampleSlidesOnly"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  class="d-block w-100"
                  :src="products[0].imageUrl"
                  alt="First slide"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8 col-12 mt-2">
          <div class="card-group">
            <div
              class="card mt-3 text-center"
              v-for="product in products"
              :key="product.id"
            >
              <h6 class="card-header">
                <span
                  class="badge badge-danger position-absolute"
                  v-if="product.origin_price !== product.price"
                  style="left:10px"
                >
                  特價中</span
                >
                {{ product.category }}
              </h6>
              <div class="card-body">
                <h5
                  class="card-title"
                  v-if="product.origin_price === product.price"
                >
                  售價 {{ product.price }} 元
                </h5>
                <h5 class="card-title" v-else>特價 {{ product.price }} 元</h5>
                <h6
                  class="card-subtitle mb-2 text-muted"
                  style="text-decoration-line: line-through; "
                >
                  定價 {{ product.origin_price }} 元
                </h6>
                <div class="input-group mt-4">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="數量"
                    aria-label="Amount"
                    aria-describedby="button-addon2"
                    min="1"
                    max="99"
                    v-model="product.amount"
                  />
                  <div class="input-group-append">
                    <button
                      :class="{
                        btn: true,
                        'btn-danger': true,
                        disabled: product.amount == 0 || false,
                      }"
                      type="button"
                      id="button-addon2"
                      @click="addCart(product.id, product.amount)"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-footer text-muted">
                小計 {{ product.amount * product.price }} 元
              </div>
            </div>
          </div>
        </div>
        <div class="d-block d-lg-none col-md-8 col-12 mt-4">
          <button
            type="button"
            class="btn btn-primary btn-lg btn-block"
            @click="$router.push(`/`)"
          >
            返回首頁
          </button>
          <button
            type="button"
            class="btn btn-success btn-lg btn-block"
            @click="$router.push(`/`)"
          >
            前往購物車
          </button>
        </div>
      </div>
    </div>
    <!-- <img :src="products[0].imageUrl" class="img-fluid" alt="Responsive image" /> -->
  </div>
</template>

<script>
import MainNavbar from '@/components/MainNavbar';
export default {
  components: {
    MainNavbar,
  },
  data() {
    return {
      isLoading: false,
      products: [{ imageUrl: '' }],
      productName: '',
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        const { products, success } = response.data;
        if (success) {
          let newList = {};
          vm.products = [];
          products.forEach((product) => {
            product.amount = 0;
            if (product.title === vm.productName) {
              if (product.is_enabled) {
                vm.products.push(product);
              }
            }
          });
        }
        vm.isLoading = false;
      });
    },
    addCart(product_id, qty = 1) {
      const data = {
        data: { product_id, qty },
      };
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.post(api, data).then((response) => {
        const { success } = response.data;
        if (success) {
          vm.products.forEach((product) => {
            product.amount = 0;
          });
          vm.isLoading = false;
        }
      });
    },
  },
  created() {
    this.getProducts();
    this.productName = this.$route.path.replace('/product/', '');
    document.title = `${this.productName}｜四分之一蛋糕工作室`;
  },
};
</script>
