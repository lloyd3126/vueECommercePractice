<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <MainNavbar />
    <Alert />
    <section id="carousel-section">
      <div class="container mt-2">
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
                    :src="`${publicPath}img/1111.png`"
                    alt="First slide"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="product-section">
      <div class="container">
        <div class="row">
          <div id="product-navbar-smallscreen" class="sticky-top col-12 p-0">
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
                @click="changeToCartPage"
              >
                <i class="fas fa-shopping-cart"></i>
                購物車
                <span
                  :class="{
                    badge: true,
                    'badge-danger': tag !== 'cart',
                    'badge-secondary': tag === 'cart',
                  }"
                  >{{ cartsInVuexLength }}</span
                >
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
          <div
            id="product-navbar-bigscreen"
            class="d-none d-md-flex col-md-12 text-center sticky-top mb-3"
          >
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
              @click="changeToCartPage"
            >
              <i class="fas fa-shopping-cart"></i>
              購物車
              <span
                :class="{
                  badge: true,
                  'badge-danger': tag !== 'cart',
                  'badge-secondary': tag === 'cart',
                }"
                >{{ cartsInVuexLength }}</span
              >
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
          <div id="product-list" class="col-sm-12">
            <div class="row">
              <!-- messageBox -->
              <div
                class="col-12"
                v-if="
                  tag === 'like' && Object.keys(filtersProducts).length === 0
                "
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
              <div
                id="list-group-in-cart"
                class="d-md-block d-none col-12 col-md-4"
              >
                <div class="list-group mb-2">
                  <a
                    href="#"
                    :class="{
                      'list-group-item': true,
                      'list-group-item-action': true,
                      active: tagInCart === 'cart',
                    }"
                    @click.prevent="tagInCart = 'cart'"
                  >
                    目前購物車內的商品
                  </a>
                </div>
                <div
                  class="list-group"
                  v-if="Object.keys(orderStatusList).length !== 0"
                >
                  <a
                    href="#"
                    class="list-group-item list-group-item-action disabled"
                    >--- 待結帳的訂單編號 ---</a
                  >
                  <a
                    href="#"
                    v-for="(orderStatus, key) in orderStatusList"
                    :key="key"
                    @click.prevent="tagInCart = orderStatus.id"
                    :class="{
                      'list-group-item': true,
                      'list-group-item-action': true,
                      active: tagInCart === orderStatus.id,
                    }"
                  >
                    <span
                      class="badge badge-danger mr-1"
                      v-if="!orderStatus.payStatus"
                      >尚未付款</span
                    >
                    <span
                      class="badge badge-success mr-1"
                      v-if="orderStatus.payStatus"
                      >成功付款</span
                    >
                    {{ orderStatus.id }}
                  </a>
                </div>
                <button
                  type="button"
                  :class="{
                    btn: true,
                    'btn-secondary': true,
                    'btn-md': true,
                    'btn-block': true,
                    disabled: false,
                    'mt-2': true,
                  }"
                  @click="clearAllUnpaidOrders"
                  v-if="Object.keys(orderStatusList).length !== 0"
                >
                  清除所有未付款的訂單
                </button>
              </div>

              <div id="order-section" class="col-12 col-md-8">
                <div
                  class="accordion"
                  id="accordionExample"
                  v-if="tagInCart == 'cart'"
                >
                  <div id="cart-in-accordion" class="card">
                    <div class="card-header" id="headingOne">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          步驟１ 確認購物車
                        </button>
                      </h5>
                    </div>

                    <div
                      id="collapseOne"
                      :class="{ collapse: true, show: collapseStatus === 1 }"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <div class="card-body">
                        <table class="table">
                          <thead>
                            <th></th>
                            <th>品名</th>
                            <th>單價</th>
                            <th>數量</th>
                          </thead>
                          <tbody>
                            <tr
                              v-for="item in cartDataFromAjax.carts"
                              :key="item.id"
                            >
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
                                {{ item.product.category
                                }}{{ item.product.title }}
                                <div class="text-success" v-if="item.coupon">
                                  已套用優惠券：{{ item.coupon.code }}
                                </div>
                              </td>
                              <td class="align-middle text-right">
                                {{ item.final_total }}
                              </td>
                              <td class="align-middle">
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="0"
                                  aria-label="Amount"
                                  aria-describedby="button-addon2"
                                  min="1"
                                  max="99"
                                  :value="cartsInVuex[item.product_id]"
                                  :data-id="item.product_id"
                                  @input="updateQty"
                                />
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colspan="3" class="text-right">總計</td>
                              <td class="text-right">
                                {{ cartDataFromAjax.total }}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="3" class="text-right text-success">
                                折扣價
                              </td>
                              <td class="text-right text-success">
                                {{ cartDataFromAjax.final_total }}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                        <div>
                          <ValidationObserver
                            v-slot="{ invalid }"
                            ref="observer"
                          >
                            <form @submit.prevent="useCoupon(couponCode)">
                              <div class="form-group">
                                <ValidationProvider
                                  rules="characters:10"
                                  v-slot="{ errors }"
                                >
                                  <div class="input-group mb-3 input-group-sm">
                                    <input
                                      type="text"
                                      :class="{
                                        'form-control': true,
                                        'is-invalid': errors[0],
                                      }"
                                      name="coupon"
                                      id="coupon-code"
                                      v-model="couponCode"
                                      placeholder="請輸入 10 碼內的優惠碼（不限數字）"
                                    />
                                    <div class="input-group-append">
                                      <button
                                        type="submit"
                                        :disabled="invalid"
                                        class="btn btn-outline-secondary"
                                      >
                                        套用優惠碼
                                      </button>
                                    </div>
                                  </div>
                                  <span class="text-danger">{{
                                    errors[0]
                                  }}</span>
                                </ValidationProvider>
                                <span class="text-danger"></span>
                              </div>
                              <!-- <div class="text-right">
                                <button
                                  type="submit"
                                  :disabled="invalid"
                                  class="btn btn-outline-secondary"
                                >
                                  套用優惠碼
                                </button>
                              </div> -->
                            </form>
                          </ValidationObserver>
                          <!-- <input
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
                          </div> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="order-info-in-accordion" class="card">
                    <div class="card-header" id="headingTwo">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                          @click="setCart"
                        >
                          步驟２ 填寫結帳資訊
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      :class="{ collapse: true, show: collapseStatus !== 1 }"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionExample"
                    >
                      <div class="card-body">
                        <ValidationObserver
                          v-slot="{ invalid }"
                          class="my-4 row justify-content-center"
                          ref="observer"
                        >
                          <form class="col-12" @submit.prevent="createOrder">
                            <h3 class="text-center mb-4">2. 填寫結帳資訊</h3>
                            <div class="form-group">
                              <label for="useremail">Email（必填）</label>
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
                              <label for="username">收件人姓名（必填）</label>
                              <ValidationProvider
                                rules="required"
                                v-slot="{ errors }"
                              >
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
                              <label for="usertel">收件人電話（必填）</label>
                              <ValidationProvider
                                rules="required|numeric|characters:10"
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
                              <label for="useraddress"
                                >收件人地址（必填）</label
                              >
                              <ValidationProvider
                                rules="required"
                                v-slot="{ errors }"
                              >
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
                              <label for="comment">留言（選填）</label>
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
                    </div>
                  </div>
                </div>

                <div
                  v-for="(orderStatus, key) in orderStatusList"
                  :key="key"
                  :id="`wait-for-payment-section${key}`"
                >
                  <div v-if="tagInCart === orderStatus.id">
                    <MainCustomerCheckout
                      :orderStatus="orderStatus"
                      @payOrNot="checkPayOrNot"
                    ></MainCustomerCheckout>
                  </div>
                </div>
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
    </section>

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
  </div>
</template>

<script>
import Alert from '@/components/Alert';
import MainNavbar from '@/components/MainNavbar';
import ProductBox from '@/components/ProductBox';
import MainCustomerCheckout from '@/components/MainCustomerCheckout';
import $ from 'jquery';

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
      products: [],
      tempProduct: {
        title: '',
        imageUrl: '',
        description: '',
        content: '',
        items: [],
      },
      likeProducts: [],
      tag: 'total',
      tagInCart: 'cart',
      orderStatusList: {},
      collapseStatus: 1,
    };
  },
  computed: {
    unpayOrderNum() {
      const vm = this;
      return Object.keys(vm.orderStatusList)
        .map((id) => {
          if (!vm.orderStatusList[id].payStatus) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((acc, val) => {
          return (acc += val);
        });
    },
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
    isLoading() {
      return this.$store.state.isLoading;
    },
    cartDataFromAjax() {
      return this.$store.state.cartDataFromAjax;
    },
    cartsInVuex() {
      return this.$store.state.cartsInVuex;
    },
    cartsInVuexLength() {
      return this.$store.getters.cartsInVuexLength;
    },
  },
  methods: {
    setCart() {
      const vm = this;
      if (vm.cartsInVuexLength === 0) {
        return;
      }
      vm.$store.dispatch('setCart');
    },
    updateQty(e) {
      let qtyData = { id: e.target.dataset.id, val: e.target.value };
      this.$store.commit('updateQty', qtyData);
    },
    changeToCartPage() {
      const vm = this;
      vm.tag = 'cart';
      if (vm.cartsInVuexLength > 0) {
        vm.tagInCart = 'cart';
      }
      vm.setCart();
    },
    copyCouponCode() {
      this.$bus.$emit(
        'message:push',
        `已複製優惠代碼：${this.value}`,
        'success'
      );
    },
    checkPayOrNot(id, status) {
      const vm = this;
      vm.orderStatusList[id]['payStatus'] = status;
      if (vm.unpayOrderNum === 0) {
        vm.tag = 'total';
      }
    },
    createOrder() {
      const vm = this;
      vm.collapseStatus = 2;
      const data = {
        data: vm.form,
      };
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      vm.$store.commit('setIsLoading', true);
      vm.$http.post(api, data).then((response) => {
        const { success, message, orderId } = response.data;
        if (success) {
          vm.collapseStatus = 1;
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
          vm.$store.dispatch('getCart', { loadingEffect: false });
          vm.form = {
            user: {
              name: '',
              email: '',
              tel: '',
              address: '',
            },
            message: '',
          };
          let temp = {};
          temp[orderId] = { id: orderId, show: false, payStatus: false };
          vm.orderStatusList = { ...vm.orderStatusList, ...temp };
          vm.$store.commit('clearCartsInVuexData');
          vm.tagInCart = orderId;
          vm.$store.commit('setIsLoading', false);
        } else {
          vm.collapseStatus = 1;
          vm.$store.commit('setIsLoading', false);
          vm.$bus.$emit('message:push', message, 'danger');
        }
        vm.couponCode = '';
      });
    },
    delCart(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.$store.commit('setIsLoading', true);
      vm.$http.delete(api).then((response) => {
        const { success } = response.data;
        if (success) {
          vm.$store.commit('deleteProductInVuexCarts', { id });
          vm.$store.dispatch('getCart', { loadingEffect: false });
          vm.$store.commit('setIsLoading', false);
        }
      });
    },
    useCoupon(code) {
      const vm = this;
      if (code === '') {
        vm.$bus.$emit('message:push', '請輸入完整優惠碼', 'danger');
        return;
      }
      if (vm.cartsInVuexLength < 1) {
        vm.$bus.$emit('message:push', '購物車內尚無商品', 'danger');
        return;
      }
      const data = {
        data: { code },
      };
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      vm.$store.commit('setIsLoading', true);
      vm.$http.post(api, data).then((response) => {
        const { success, data, message } = response.data;
        if (success) {
          vm.$bus.$emit('message:push', message, 'success');
          vm.$store.dispatch('getCart', { loadingEffect: false });
        } else {
          vm.$store.commit('setIsLoading', false);
          vm.$bus.$emit('message:push', message, 'danger');
        }
        vm.couponCode = '';
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
      vm.$http.get(api).then((response) => {
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
    const vm = this;
    vm.tagInCart = 'cart';
    vm.$store.dispatch('getProducts', { loadingEffect: false });
    if (vm.$route.query.tag) {
      vm.tag = vm.$route.query.tag;
    }
    window.scrollTo(0, 0);
    vm.getProducts();
    let orderIds = localStorage.getItem('orderIds');
    if (orderIds != null && orderIds != '') {
      let orderIdArr = orderIds.split(', ');
      orderIdArr.forEach((orderId) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${orderId}`;
        vm.$store.commit('setIsLoading', true);
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
            vm.$store.commit('setIsLoading', false);
          }
        });
      });
    }
    vm.setCart();
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
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
