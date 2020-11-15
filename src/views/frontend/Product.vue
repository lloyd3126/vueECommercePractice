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
                小計
                {{ product.amount * product.price }}
                元
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
            @click="$router.push(`/cart`)"
          >
            前往購物車
          </button>
        </div>
      </div>
    </div>
    <footer class="page-footer font-small cyan darken-3 text-center mt-5">
      <!-- Footer Elements -->
      <div class="container">
        <!-- Grid row-->
        <div class="row">
          <!-- Grid column -->
          <div class="col-md-12 py-5">
            <div class="flex-center">
              <!-- Facebook -->
              <a
                class="facebook-ic"
                target="_blank"
                href="https://www.facebook.com/lloyd3126/"
              >
                <i
                  class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"
                >
                </i>
              </a>
              <!--Linkedin -->
              <a
                class="linkdin-ic"
                target="_blank"
                href="https://www.linkedin.com/in/lloyd3126/"
              >
                <i
                  class="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"
                >
                </i>
              </a>
              <!--google -->
              <a class="google-ic" href="mailto: lloyd3126@gmail.com">
                <i class="fab fa-google fa-lg white-text mr-md-5 mr-3 fa-2x">
                </i>
              </a>
              <!--Github-->
              <a
                class="github-ic"
                target="_blank"
                href="https://github.com/lloyd3126"
              >
                <i class="fab fa-github fa-lg white-text fa-2x"> </i>
              </a>
            </div>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row-->
      </div>
      <!-- Footer Elements -->

      <!-- Copyright -->
      <div class="footer-copyright text-center pt-3 ">
        <a href="https://github.com/lloyd3126/"> 陳重年 Chen Chung Nien</a>
        © 2020 Copyright
      </div>
      <div class="footer-copyright text-center pb-3">
        <a href="https://www.freepik.com/vectors/background">
          Background vector created by freepik - www.freepik.com</a
        >
      </div>
    </footer>
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
      vm.$http.get(api).then((response) => {
        const { products, success } = response.data;
        if (success) {
          let newList = {};
          vm.products = [];
          products.forEach((product) => {
            product.amount = 1;
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
    addCart(product_id, qty) {
      const vm = this;
      if (qty < 1) {
        return;
      }
      const data = {
        data: { product_id, qty },
      };
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.post(api, data).then((response) => {
        const { success } = response.data;
        if (success) {
          vm.products.forEach((product) => {
            product.amount = 1;
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

<style scope>
.page-footer {
  background-color: #eee;
}
.footer-copyright,
.footer-copyright a {
  background-color: #222;
  color: #eee;
}
</style>
