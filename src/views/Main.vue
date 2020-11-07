<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <MainNavbar />
    <Alert />
    <div class="container">
      <div class="row mb-3">
        <div class="col-sm-12">
          <div
            id="carouselExampleSlidesOnly"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  class="d-block w-100"
                  :src="`${publicPath}img/carousel.png`"
                  alt="First slide"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <!-- small -->
        <div class="sticky-top col-12 p-0">
          <div class="d-md-none d-flex col-md-6">
            <div
              :class="{
                'hover-red': true,
                'p-2': true,
                'col-4': true,
                'hover-red-active': tag === 'total',
              }"
              @click="tag = 'total'"
            >
              全部商品
            </div>
            <div
              :class="{
                'hover-red': true,
                'p-2': true,
                'col-4': true,
                'hover-red-active': tag === 'popular',
              }"
              @click="tag = 'popular'"
            >
              熱門商品
            </div>
            <div
              :class="{
                'hover-red': true,
                'p-2': true,
                'col-4': true,
                'hover-red-active': tag === 'sale',
              }"
              @click="tag = 'sale'"
            >
              特價商品
            </div>
          </div>
          <div class="d-md-none d-flex col-md-6 mb-3">
            <div
              :class="{
                'hover-red': true,
                'p-2': true,
                'col-4': true,
                'hover-red-active': tag === 'like',
              }"
              @click="tag = 'like'"
            >
              <i class="fas fa-heart"></i>
              已收藏
            </div>
            <div
              :class="{
                'hover-red': true,
                'p-2': true,
                'col-4': true,
                'hover-red-active': tag === 'cart',
              }"
              @click="tag = 'cart'"
            >
              <i class="fas fa-shopping-cart"></i>
              購物車
              <span class="badge badge-secondary ml-1">{{
                cartData.carts.length
              }}</span>
            </div>
            <div
              :class="{
                'hover-red': true,
                'p-2': true,
                'col-4': true,
                'hover-red-active': tag === 'coupon',
              }"
              @click="tag = 'coupon'"
            >
              <i class="fas fa-ticket-alt"></i>
              領取優惠卷
            </div>
          </div>
        </div>
        <!-- big -->
        <div class="d-none d-md-flex col-md-12 text-center sticky-top mb-3">
          <div
            :class="{
              'hover-red': true,
              'p-2': true,
              'col-2': true,
              'hover-red-active': tag === 'total',
            }"
            @click="tag = 'total'"
          >
            全部商品
          </div>
          <div
            :class="{
              'hover-red': true,
              'p-2': true,
              'col-2': true,
              'hover-red-active': tag === 'popular',
            }"
            @click="tag = 'popular'"
          >
            熱門商品
          </div>
          <div
            :class="{
              'hover-red': true,
              'p-2': true,
              'col-2': true,
              'hover-red-active': tag === 'sale',
            }"
            @click="tag = 'sale'"
          >
            特價商品
          </div>
          <div
            :class="{
              'hover-red': true,
              'p-2': true,
              'col-2': true,
              'hover-red-active': tag === 'like',
            }"
            @click="tag = 'like'"
          >
            <i class="fas fa-heart"></i>
            已收藏
          </div>
          <div
            :class="{
              'hover-red': true,
              'p-2': true,
              'col-2': true,
              'hover-red-active': tag === 'cart',
            }"
            @click="tag = 'cart'"
          >
            <i class="fas fa-shopping-cart"></i>
            購物車
            <span class="badge badge-secondary ml-1">{{
              cartData.carts.length
            }}</span>
          </div>
          <div
            :class="{
              'hover-red': true,
              'p-2': true,
              'col-2': true,
              'hover-red-active': tag === 'coupon',
            }"
            @click="tag = 'coupon'"
          >
            <i class="fas fa-ticket-alt"></i>
            領取優惠卷
          </div>
        </div>
        <div class="col-sm-12">
          <div class="row">
            <!-- messageBox -->
            <div
              class="col-12"
              v-if="tag === 'like' && Object.keys(filtersProducts).length === 0"
            >
              <h6 class="border rounded p-3">目前沒有商品被加入收藏</h6>
            </div>
            <!-- productList -->
            <div
              v-for="product in filtersProducts"
              :key="'contain' + product[0].id"
              class="col-12 col-lg-4 mb-4"
            >
              <ProductBox
                @sendProductDataOut="setProductDataHere"
                :key="product[0].id"
                :product="product"
                :likeProducts="likeProducts"
                :productTitle="product[0].title"
              ></ProductBox>
            </div>
          </div>
          <!-- cart -->
          <div class="row justify-content-center" v-if="tag === 'cart'">
            <!-- cart -->
            <div class="col-12 col-md-8">
              <h3 class="text-center mt-3">1. 加入購物車</h3>
              <table class="table mt-4">
                <thead>
                  <th></th>
                  <th>品名</th>
                  <th>數量</th>
                  <th>單價</th>
                </thead>
                <tbody>
                  <tr v-for="item in cartData.carts" :key="item.id">
                    <td class="align-middle">
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm"
                        @click="delCart(item.id)"
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                    <td class="align-middle">
                      {{ item.product.title }}
                      <div class="text-success" v-if="item.coupon">
                        已套用優惠券：{{ item.coupon.code }}
                      </div>
                    </td>
                    <td class="align-middle">
                      {{ item.qty }}/{{ item.product.unit }}
                    </td>
                    <td class="align-middle text-right">
                      {{ item.final_total }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">{{ cartData.total }}</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-right text-success">
                      折扣價
                    </td>
                    <td class="text-right text-success">
                      {{ cartData.final_total }}
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div class="input-group mb-3 input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入優惠碼"
                  v-model="couponCode"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="useCoupon(couponCode)"
                  >
                    套用優惠碼
                  </button>
                </div>
              </div>
            </div>
            <!-- orderInfo -->
            <div class="col-12 col-md-8">
              <ValidationObserver
                v-slot="{ invalid }"
                class="my-4 row justify-content-center"
                ref="observer"
              >
                <form class="col-12" @submit.prevent="createOrder">
                  <h3 class="text-center mb-4">2. 填寫結帳資訊</h3>
                  <div class="form-group">
                    <label for="useremail">Email</label>
                    <ValidationProvider
                      rules="required|email"
                      v-slot="{ errors }"
                    >
                      <input
                        type="text"
                        :class="{
                          'form-control': true,
                          'is-invalid': errors[0],
                        }"
                        name="email"
                        id="useremail"
                        v-model="form.user.email"
                        placeholder="請輸入 Email"
                        required
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <span class="text-danger"></span>
                  </div>
                  <div class="form-group">
                    <label for="username">收件人姓名</label>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <input
                        type="text"
                        :class="{
                          'form-control': true,
                          'is-invalid': errors[0],
                        }"
                        name="name"
                        id="username"
                        v-model="form.user.name"
                        placeholder="輸入姓名"
                        required
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <label for="usertel">收件人電話</label>
                    <ValidationProvider
                      rules="required|numeric"
                      v-slot="{ errors }"
                    >
                      <input
                        type="tel"
                        :class="{
                          'form-control': true,
                          'is-invalid': errors[0],
                        }"
                        name="tel"
                        id="usertel"
                        v-model="form.user.tel"
                        placeholder="請輸入電話"
                        required
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <label for="useraddress">收件人地址</label>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <input
                        type="text"
                        :class="{
                          'form-control': true,
                          'is-invalid': errors[0],
                        }"
                        name="address"
                        id="useraddress"
                        v-model="form.user.address"
                        placeholder="請輸入地址"
                        required
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <label for="comment">留言</label>
                    <textarea
                      name=""
                      id="comment"
                      class="form-control"
                      cols="30"
                      rows="10"
                      v-model="form.message"
                    ></textarea>
                  </div>
                  <div class="text-right">
                    <button
                      type="submit"
                      :disabled="invalid"
                      class="btn btn-danger"
                    >
                      送出訂單
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
            <!-- CustomerCheckout -->
            <div
              class="col-12 col-md-8 mb-4"
              v-if="Object.keys(orderStatusList).length !== 0"
            >
              <h3 class="text-center mt-3 mb-4">3. 確認訂單</h3>
              <div id="accordion">
                <div
                  class="card"
                  v-for="(orderStatus, key) in orderStatusList"
                  :key="key"
                >
                  <div
                    class="card-header"
                    :id="'heading' + key"
                    @click="orderStatus.show = !orderStatus.show"
                    style="cursor: pointer;"
                  >
                    <h5
                      class="mb-0 d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <button
                          class="btn"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          訂單編號：{{ orderStatus.id }}
                        </button>
                      </div>
                      <div>
                        <span
                          class="badge badge-danger"
                          v-if="!orderStatus.payStatus"
                          >尚未付款</span
                        >
                        <span class="badge badge-success" v-else>付款完成</span>
                      </div>
                    </h5>
                  </div>
                  <div
                    :id="'collapse' + key"
                    :class="{ collapse: true, show: orderStatus.show }"
                    :aria-labelledby="'heading' + key"
                    data-parent="#accordion"
                  >
                    <div class="card-body">
                      <!-- orderId -->
                      <MainCustomerCheckout
                        :orderStatus="orderStatus"
                        @payOrNot="checkPayOrNot"
                      ></MainCustomerCheckout>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                :class="{
                  btn: true,
                  'btn-secondary': true,
                  'btn-lg': true,
                  'btn-block': true,
                  disabled: false,
                  'mt-2': true,
                }"
                @click="clearAllUnpaidOrders"
              >
                清除所有未付款的訂單
              </button>
            </div>
          </div>
          <!-- coupon -->
          <div
            class="row justify-content-center mt-5 mb-5"
            v-if="tag === 'coupon'"
          >
            <div class="col-12 col-md-6 text-center">
              <img
                :src="`${publicPath}img/coupon.png`"
                class="img-fluid coupon-img mb-3"
                alt="Responsive image"
                v-clipboard="value"
                @click="copyCouponCode"
              />
              <!-- <img src="/img/coupon.png" alt="" width="auto" /> -->
              <a href="https://www.vecteezy.com/free-vector/gift"
                >Gift Vectors by Vecteezy</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
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
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </div>
</template>

<script>
import Alert from '@/components/Alert';
import MainNavbar from '@/components/MainNavbar';
import ProductBox from '@/components/ProductBox';
import MainCustomerCheckout from '@/components/MainCustomerCheckout';

export default {
  components: {
    MainNavbar,
    Alert,
    ProductBox,
    MainCustomerCheckout,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      value: '1225',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      couponCode: '',
      currentPage: 1,
      pagination: {},
      isLoading: false,
      products: [],
      tempProduct: {
        title: '',
        imageUrl: '',
        description: '',
        content: '',
        items: [],
      },
      cartData: {
        carts: [],
        final_total: 0,
        total: 0,
      },
      cartsLength: 0,
      likeProducts: [],
      tag: 'total',
      orderStatusList: {},
    };
  },
  computed: {
    filtersProducts() {
      const vm = this;
      if (vm.tag == 'total') {
        const result = vm.products;
        return result;
      } else if (vm.tag == 'popular') {
        const popularProductNameList = ['雙層荔枝乳酪', '愛戀馬卡龍'];
        let temp = {};
        popularProductNameList.forEach((productName) => {
          temp[productName] = vm.products[productName];
        });
        const result = temp;
        return result;
      } else if (vm.tag == 'sale') {
        const saleProductList = [];
        Object.keys(vm.products).forEach((productName) => {
          let saleOrNot = 0;
          vm.products[productName].forEach((item) => {
            if (parseInt(item.price) < parseInt(item.origin_price)) {
              saleOrNot += 1;
            }
          });
          if (Boolean(saleOrNot)) {
            saleProductList.push(vm.products[productName]);
          }
        });
        let temp = {};
        saleProductList.forEach((product) => {
          temp[product[0].title] = product;
        });
        const result = temp;
        return result;
      } else if (vm.tag === 'like') {
        const result = { ...vm.likeProducts };
        return result;
      }
    },
  },
  methods: {
    copyCouponCode() {
      const vm = this;
      vm.$bus.$emit('message:push', `已複製優惠代碼：${this.value}`, 'success');
    },
    checkPayOrNot(id, status) {
      this.orderStatusList[id]['payStatus'] = status;
    },
    createOrder() {
      const vm = this;
      const data = {
        data: vm.form,
      };
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      vm.isLoading = true;
      vm.$http.post(api, data).then((response) => {
        const { success, message, orderId } = response.data;
        if (success) {
          let orderIds = localStorage.getItem('orderIds');
          if (orderIds == null || orderIds == '') {
            localStorage.setItem('orderIds', `${orderId}`);
          } else {
            localStorage.setItem('orderIds', `${orderIds}, ${orderId}`);
          }
          vm.$bus.$emit(
            'message:push',
            `${message}，訂單編號為 ${orderId}`,
            'success'
          );
          vm.getCart();
          vm.form = {
            user: {
              name: '',
              email: '',
              tel: '',
              address: '',
            },
            message: '',
          };
          vm.$nextTick(() => vm.$refs.observer.reset());
          let temp = {};
          temp[orderId] = { id: orderId, show: false, payStatus: false };
          vm.orderStatusList = { ...vm.orderStatusList, ...temp };
        } else {
          vm.isLoading = false;
          vm.$bus.$emit('message:push', message, 'danger');
        }
        vm.couponCode = '';
      });
    },
    delCart(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      vm.$http.delete(api).then((response) => {
        const { success } = response.data;
        if (success) {
          vm.getCart();
          vm.isLoading = false;
        }
      });
    },
    useCoupon(code) {
      const data = {
        data: { code },
      };
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      vm.isLoading = true;
      vm.$http.post(api, data).then((response) => {
        const { success, data, message } = response.data;
        if (success) {
          this.$bus.$emit('message:push', message, 'success');
          vm.getCart();
        } else {
          vm.isLoading = false;
          this.$bus.$emit('message:push', message, 'danger');
        }
        vm.couponCode = '';
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
          vm.getCart();
        }
      });
    },
    setProductDataHere(product, btnName) {
      const productName = product[0].title;
      if (btnName === 'moreInfo') {
        this.tempProduct = product;
        this.tempProduct.title = product[0].title;
        this.tempProduct.imageUrl = product[0].imageUrl;
        this.tempProduct.description = product[0].description;
        this.tempProduct.content = product[0].content;
        this.tempProduct.items = product;
        this.tempProduct.items.forEach((item) => {
          this.$set(item, 'amount', '1');
        });
      } else if (btnName === 'like') {
        this.likeProducts[productName] = product;
      } else if (btnName === 'unlike') {
        delete this.likeProducts[productName];
      }
    },
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        const { products, success } = response.data;
        if (success) {
          let newList = {};
          products.forEach((product) => {
            if (product.is_enabled) {
              if (Object.keys(newList).indexOf(product.title) == -1) {
                newList[product.title] = [];
              }
              newList[product.title].push(product);
            }
          });
          vm.products = newList;
        }
        vm.isLoading = false;
      });
    },
    getCart() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.get(api).then((response) => {
        const { success, data } = response.data;
        if (success) {
          vm.cartData = data;
          vm.isLoading = false;
        }
      });
    },
    clearAllUnpaidOrders() {
      let UnpaidOrderIds = Object.keys(this.orderStatusList)
        .map((orderId) => this.orderStatusList[orderId])
        .filter((order) => order.payStatus === false)
        .map((order) => order.id);
      let temp = this.orderStatusList;
      UnpaidOrderIds.forEach((orderId) => {
        delete temp[orderId];
      });
      localStorage.setItem('orderIds', '');
      this.orderStatusList = { ...temp };
    },
  },
  mounted() {
    let orderIds = localStorage.getItem('orderIds');
    if (orderIds != null && orderIds != '') {
      this.$bus.$emit(
        'message:push',
        '尚有訂單未完成付款，請至購物車查看！',
        'warning'
      );
    }
  },
  created() {
    if (this.$route.query.tag) {
      this.tag = this.$route.query.tag;
    }

    window.scrollTo(0, 0);
    const vm = this;
    vm.getProducts();
    vm.getCart();
    let orderIds = localStorage.getItem('orderIds');
    if (orderIds != null && orderIds != '') {
      let orderIdArr = orderIds.split(', ');
      orderIdArr.forEach((orderId) => {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${orderId}`;
        vm.isLoading = true;
        vm.$http.get(api).then((response) => {
          const { order, success } = response.data;
          if (success) {
            if (order.is_paid == false) {
              let temp = {};
              temp[order.id] = {
                id: order.id,
                show: false,
                payStatus: false,
              };
              vm.orderStatusList = { ...vm.orderStatusList, ...temp };
            } else {
              let orderIds = localStorage.getItem('orderIds');
              let orderIdArr = orderIds.split(', ');
              orderIdArr.splice(orderIdArr.indexOf(order.id), 1);
              orderIds = orderIdArr.join(', ');
              localStorage.setItem('orderIds', `${orderIds}`);
            }
            vm.isLoading = false;
          }
        });
      });
    }
    vm.$bus.$on('cart:update', () => {
      vm.getCart();
    });
  },
};
</script>

<style scoped>
.page-footer {
  background-color: #eee;
}
.footer-copyright,
.footer-copyright a {
  background-color: #222;
  color: #eee;
}
.hover-red {
  background-color: white;
  color: #212529;
  font-weight: 700;
  transition-duration: 0.15s;
  border: 1px solid #dee2e6;
  cursor: pointer;
  font-size: 0.6rem;
}
.hover-red:hover {
  background-color: #dc3545;
  color: white;
  border: 1px solid #dc3545;
}
.hover-red-active {
  background-color: #dc3545;
  color: white;
  border: 1px solid #dc3545;
}
.coupon-img {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}
.coupon-img:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
/* Extra small devices (portrait phones, less than 576px) */
/* No media query since this is the default in Bootstrap */

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  /* ...; */
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .hover-red {
    font-size: 0.9rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  /* ...; */
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  /* ...; */
}
</style>
