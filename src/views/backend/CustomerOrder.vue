<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div
        class="col-md-3 mb-4"
        v-for="product in products"
        :key="product[0].id"
      >
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${product[0].imageUrl})` }"
          ></div>
          <div class="card-body">
            <span
              class="badge badge-secondary float-right ml-2"
              v-for="item in product"
              :key="item.id"
              >{{ item.category }}</span
            >
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ product[0].title }}</a>
            </h5>
            <p class="card-text">{{ product[0].content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div v-for="item in product" :key="item.id">
                <span class="badge badge-secondary mb-2">{{
                  item.category
                }}</span>
                <span
                  class="badge badge-danger mb-2 ml-1"
                  v-if="item.origin_price !== item.price"
                  >特價中</span
                >
                <div class="h5">定價 {{ item.origin_price }} 元</div>
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(product[0].title)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.dataLoading"></i>
              查看更多
            </button>
            <button
              class="btn btn-outline-danger dropdown-toggle btn-sm ml-auto"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.orderSending"></i>
              加到購物車
            </button>
            <div class="dropdown-menu">
              <a
                class="dropdown-item "
                href="#"
                v-for="item in product"
                :key="item.id"
                @click.prevent="addCart(item.id)"
              >
                <span class="badge badge-secondary mb-2">{{
                  item.category
                }}</span>
                <span
                  class="badge badge-danger mb-2 ml-1"
                  v-if="item.origin_price !== item.price"
                >
                  現省 {{ item.origin_price - item.price }} 元</span
                >
                <h6 v-if="item.origin_price !== item.price">
                  特價 {{ item.price }} 元
                </h6>

                <h6 v-if="item.origin_price == item.price">
                  原價 {{ item.origin_price }} 元
                </h6>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- productModal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">
              {{ tempProduct.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              :src="tempProduct.imageUrl"
              class="img-fluid"
              alt="Responsive image"
            />
            <h6 class="mt-3">
              {{ tempProduct.content }}
            </h6>
            <h6 class="mt-3">
              {{ tempProduct.description }}
            </h6>
            <div class="card-group">
              <div
                class="card mt-3 text-center"
                v-for="item in tempProduct.items"
                :key="item.id"
              >
                <h6 class="card-header">
                  <span
                    class="badge badge-danger position-absolute"
                    v-if="item.origin_price !== item.price"
                    style="left:10px"
                  >
                    特價中</span
                  >
                  {{ item.category }}
                </h6>
                <div class="card-body">
                  <h5
                    class="card-title"
                    v-if="item.origin_price === item.price"
                  >
                    售價 {{ item.price }} 元
                  </h5>
                  <h5 class="card-title" v-else>特價 {{ item.price }} 元</h5>
                  <h6
                    class="card-subtitle mb-2 text-muted"
                    style="text-decoration-line: line-through; "
                  >
                    定價 {{ item.origin_price }} 元
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
                      v-model="item.amount"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-danger"
                        type="button"
                        id="button-addon2"
                        @click="addCart(item.id, item.amount)"
                      >
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-footer text-muted">
                  小計 {{ item.amount * item.price }} 元
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- cart -->
    <hr />
    <div class="row justify-content-center">
      <div class="col-6">
        <h3 class="text-center mt-3">購物車</h3>
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
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cartData.total }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-right text-success">折扣價</td>
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
    </div>
    <!-- orderInfo -->
    <ValidationObserver
      v-slot="{ invalid }"
      class="my-4 row justify-content-center"
      ref="observer"
    >
      <form class="col-md-6" @submit.prevent="createOrder">
        <h3 class="text-center mb-4">結帳資訊</h3>
        <div class="form-group">
          <label for="useremail">Email</label>
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <input
              type="text"
              :class="{ 'form-control': true, 'is-invalid': errors[0] }"
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
              :class="{ 'form-control': true, 'is-invalid': errors[0] }"
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
          <ValidationProvider rules="required|numeric" v-slot="{ errors }">
            <input
              type="tel"
              :class="{ 'form-control': true, 'is-invalid': errors[0] }"
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
              :class="{ 'form-control': true, 'is-invalid': errors[0] }"
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
          <button type="submit" :disabled="invalid" class="btn btn-danger">
            送出訂單
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  data() {
    return {
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
      cartData: {},
      products: [],
      tempProduct: {
        title: '',
        imageUrl: '',
        description: '',
        content: '',
        items: [],
      },
      isLoading: false,
      pagination: {},
      status: {
        dataLoading: false,
        orderSending: false,
      },
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
    getProduct(productName) {
      this.tempProduct.title = this.products[productName][0].title;
      this.tempProduct.imageUrl = this.products[productName][0].imageUrl;
      this.tempProduct.description = this.products[productName][0].description;
      this.tempProduct.content = this.products[productName][0].content;
      this.tempProduct.items = this.products[productName];
      this.tempProduct.items.forEach((item) => {
        this.$set(item, 'amount', '1');
      });
      $('#productModal').modal('show');
    },
    addCart(product_id, qty = 1) {
      const vm = this;
      const data = {
        data: { product_id, qty },
      };
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.post(api, data).then((response) => {
        const { success } = response.data;
        if (success) {
          vm.isLoading = false;
          vm.getCart();
        }
      });
    },
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.get(api).then((response) => {
        const { success, data } = response.data;
        if (success) {
          vm.cartData = data;
          vm.isLoading = false;
        }
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
      const vm = this;
      const data = {
        data: { code },
      };
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      vm.isLoading = true;
      vm.$http.post(api, data).then((response) => {
        const { success, data, message } = response.data;
        if (success) {
          vm.$bus.$emit('message:push', message, 'success');
          vm.getCart();
        } else {
          vm.isLoading = false;
          vm.$bus.$emit('message:push', message, 'danger');
        }
        vm.couponCode = '';
      });
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
          vm.$bus.$emit('message:push', message, 'success');
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
          vm.$router.push(`/admin/customer_checkout/${orderId}`);
        } else {
          vm.isLoading = false;
          vm.$bus.$emit('message:push', message, 'danger');
        }
        vm.couponCode = '';
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

<style></style>
