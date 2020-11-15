<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <MainNavbar />
    <div class="container">
      <div class="row mb-3 justify-content-center">
        <div class="col-md-8 col-12 mt-2">
          <div class="row justify-content-center">
            <!-- cart -->
            <div class="col-12">
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
            <div class="col-12">
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
              class="col-12 mb-4"
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
                    class="pointer card-header"
                    :id="'heading' + key"
                    @click="orderStatus.show = !orderStatus.show"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNavbar from '@/components/MainNavbar';
import MainCustomerCheckout from '@/components/MainCustomerCheckout';
export default {
  components: {
    MainNavbar,
    MainCustomerCheckout,
  },
  data() {
    return {
      couponCode: '',
      orderStatusList: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    cartData() {
      return this.$store.state.cartData;
    },
  },
  methods: {
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
    checkPayOrNot(id, status) {
      this.orderStatusList[id]['payStatus'] = status;
    },
    createOrder() {
      const vm = this;
      const data = {
        data: vm.form,
      };
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      vm.$store.commit('setIsLoading', true);
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
          vm.$store.dispatch('getCart');
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
          vm.$store.dispatch('getCart');
          vm.$store.commit('setIsLoading', false);
        }
      });
    },
    useCoupon(code) {
      const data = {
        data: { code },
      };
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      vm.$store.commit('setIsLoading', true);
      vm.$http.post(api, data).then((response) => {
        const { success, data, message } = response.data;
        if (success) {
          vm.$bus.$emit('message:push', message, 'success');
          vm.$store.dispatch('getCart');
        } else {
          vm.$store.commit('setIsLoading', false);
          vm.$bus.$emit('message:push', message, 'danger');
        }
        vm.couponCode = '';
      });
    },
  },
  created() {
    this.$store.dispatch('getCart');
    window.scrollTo(0, 0);
    const vm = this;
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
  },
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>
