<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <MainNavbar />
    <Alert />
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
                  class="sale-tag badge badge-danger position-absolute"
                  v-if="product.origin_price !== product.price"
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
                <h6 class="card-subtitle mb-2 text-muted line-text">
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
                        disabled: product.amount < 1 || false,
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
        <div class="linkBox col-md-8 col-12 mt-4">
          <a
            type="button"
            class="btn btn-outline-success btn-md btn-block"
            :href="`${publicPath}#/shop?tag=cart`"
          >
            結帳去
          </a>
        </div>
        <div class="linkBox col-md-8 col-12 mt-4">
          <div class="d-flex justify-content-between">
            <a
              class="linkToTatalProducts border rounded p-3 text-left"
              :href="`${publicPath}#/shop`"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              返回商品專區
            </a>

            <a
              class="linkToNextProduct border rounded p-3 text-right"
              @click="linkToNextProduct"
              >順手帶走{{ nextProductName }}
              <i class="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
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
import Alert from '@/components/Alert';
export default {
  components: {
    MainNavbar,
    Alert,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      products: [{ imageUrl: '' }],
      productName: '',
    };
  },
  computed: {
    nextProductName() {
      const vm = this;
      let idx = vm.productsInVuex.indexOf(vm.productName) + 1;
      if (idx === vm.productsInVuex.length) {
        idx = 0;
      }
      return vm.productsInVuex[idx];
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    cartsInVuex() {
      return this.$store.state.cartsInVuex;
    },
    productsInVuex() {
      const vm = this;
      let temp = [];
      Object.keys(vm.$store.state.products).forEach((id) => {
        if (!temp.includes(vm.$store.state.products[id].title)) {
          temp.push(vm.$store.state.products[id].title);
        }
      });
      return temp;
    },
  },
  methods: {
    linkToNextProduct() {
      const vm = this;
      document.title = `${vm.nextProductName}｜四分之一蛋糕工作室`;
      vm.$router.push(`/product/${vm.nextProductName}`);
      vm.productName = vm.nextProductName;
      vm.getProducts();
      vm.$store.dispatch('getProducts', { loadingEffect: true });
      window.scrollTo(0, 0);
    },
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
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
      });
    },
    addCart(productId, qty) {
      const vm = this;
      if (typeof qty !== 'number' || parseInt(qty) <= 0) {
        return;
      }
      vm.$store.commit('setCartsInVuexData', { productId, qty });
      vm.products.forEach((product) => {
        if (product.id === productId) {
          vm.$bus.$emit(
            'message:push',
            `將${product.category}${product.title}加入購物車`,
            'success'
          );
        }
      });
    },
  },
  created() {
    const vm = this;
    vm.getProducts();
    vm.productName = vm.$route.path.replace('/product/', '');
    document.title = `${vm.productName}｜四分之一蛋糕工作室`;
    vm.$store.dispatch('getProducts', { loadingEffect: true });
  },
};
</script>

<style scope>
a.linkToTatalProducts,
a.linkToNextProduct {
  text-decoration: none;
  transition-duration: 0.3s;
}
a.linkToTatalProducts:hover,
a.linkToNextProduct:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
.page-footer {
  background-color: #eee;
}
.footer-copyright,
.footer-copyright a {
  background-color: #222;
  color: #eee;
}
.sale-tag {
  left: 10px;
}
.line-text {
  text-decoration-line: line-through;
}
</style>
